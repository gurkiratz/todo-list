'use client'

import { useEffect, useState } from 'react'
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
import { useRecoilValue } from 'recoil'
import { selectedOrgState } from '@/recoil/atoms/orgAtom'

function App() {
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

  const handleCreateTodo = (newTodo: string) => {
    addTodo(userId, orgId, newTodo)
    setTodos((prev) => [
      { clerkUserId: userId, orgId, text: newTodo, isCompleted: false },
      ...prev,
    ])
  }

  const handleToggle = (id: string) => {
    toggleTodo(id, userId, orgId)
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  const handleDelete = (id: string) => {
    deleteTodo(id, userId, orgId)
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Org id: {orgId} </h1>
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
