/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState, useTransition, useCallback } from 'react'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs'
import {
  addTodo,
  deleteTodo,
  getTodos,
  toggleTodo,
  updateTodoDescription,
} from '@/actions/todoActions'
import { TodoTable } from '@/drizzle/schema'
import AddTodo from '@/components/AddTodo'
import TodoView from '@/components/TodoView'
import { useRecoilValue } from 'recoil'
import Loader from '@/components/ui/loader'
import { selectedOrgState } from '@/recoil/atoms'

function App() {
  // const [isLoading, setIsLoading] = useRecoilState(loadingState)
  const [todos, setTodos] = useState<(typeof TodoTable.$inferInsert)[]>([])
  const [isPending, startTransition] = useTransition()
  const orgId = useRecoilValue(selectedOrgState)
  const { userId: clerkUserId } = useAuth()

  const fetchTodos = useCallback(async () => {
    if (clerkUserId && orgId) {
      const result = await getTodos(clerkUserId, orgId)
      setTodos(result)
    }
  }, [clerkUserId, orgId])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  if (!clerkUserId) return RedirectToSignIn({ redirectUrl: '/' })
  if (!orgId)
    return (
      <div className="h-screen">
        <Loader text="Loading organization..." />
      </div>
    )

  const handleCreateTodo = async (newTodoText: string) => {
    startTransition(async () => {
      try {
        const newTodo = await addTodo(clerkUserId, orgId, newTodoText)
        setTodos((prev) => [newTodo, ...prev])
      } catch (error) {
        console.error('Error creating todo:', error)
        alert('Failed to create todo. Please try again.')
      }
    })
  }

  const handleToggle = async (id: string) => {
    startTransition(async () => {
      try {
        const updatedTodo = await toggleTodo(id, clerkUserId, orgId)
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        )
      } catch (error) {
        console.error('Error toggling todo:', error)
        alert('Failed to update todo. Please try again.')
      }
    })
  }

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      try {
        await deleteTodo(id, clerkUserId, orgId)
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
      } catch (error) {
        console.error('Error deleting todo:', error)
        alert('Failed to delete todo. Please try again.')
      }
    })
  }

  const handleUpdateDescription = async (id: string, description: string) => {
    startTransition(async () => {
      try {
        const updatedTodo = await updateTodoDescription(id, description)
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        )
      } catch (error) {
        console.error('Error updating todo description:', error)
        alert('Failed to update todo description. Please try again.')
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-blue-900/10">
      <main className="flex-grow container mx-auto p-4 ">
        {isPending && <Loader text="Updating..." />}
        <TodoView
          todos={todos}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
          onUpdateDescription={handleUpdateDescription}
        />

        <AddTodo createTodo={handleCreateTodo} />
      </main>
    </div>
  )
}

export default App
