/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs'
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
} from '@/actions/todoActions'
import { InsertTodo } from '@/drizzle/schema'
import AddTodo from '@/components/AddTodo'
import TodoView from '@/components/TodoView'
import { useRecoilState, useRecoilValue } from 'recoil'
import { loadingState, selectedOrgState } from '@/recoil/atoms'

function App() {
  const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const [todos, setTodos] = useState<InsertTodo[]>([])
  const orgId = useRecoilValue(selectedOrgState)
  const { userId } = useAuth()

  useEffect(() => {
    const fetchTodos = async () => {
      if (userId != null && orgId != null) {
        const result = await getTodos(userId, orgId)
        setTodos(result)
      }
    }
    fetchTodos()
  }, [orgId])

  if (userId == null) return RedirectToSignIn({ redirectUrl: '/' })
  if (orgId == null) return <div>OrgId is not defined</div>

  const handleAsyncAction = async (
    actionFunc: (...args: any[]) => Promise<void>,
    ...args: any[]
  ) => {
    if (isLoading) return // Prevent further actions while loading

    try {
      setIsLoading(true) // Set loading state to true
      await actionFunc(...args) // Call the action function with arguments
    } catch (error: Error | any) {
      console.error('Error:', error)
      alert('An error occurred. Please try again. Error: ' + error.message) // Generic error message
    } finally {
      setIsLoading(false) // Reset loading state
    }
  }

  const handleCreateTodo = async (newTodo: string) => {
    // await addTodo(userId, orgId, newTodo)
    await handleAsyncAction(addTodo, userId, orgId, newTodo)
    setTodos((prev) => [
      { clerkUserId: userId, orgId, text: newTodo, isCompleted: false },
      ...prev,
    ])
  }

  const handleToggle = async (id: string) => {
    // await toggleTodo(id, userId, orgId)

    await handleAsyncAction(toggleTodo, id, userId, orgId)
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  const handleDelete = async (id: string) => {
    // await deleteTodo(id, userId, orgId)
    setTodos(todos.filter((todo) => todo.id !== id))
    await handleAsyncAction(deleteTodo, id, userId, orgId)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <TodoView
          todos={todos}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />

        <AddTodo createTodo={handleCreateTodo} />
      </main>
    </div>
  )
}

export default App
