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

function App() {
  const [todos, setTodos] = useState<InsertTodo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const { userId } = useAuth()

  useEffect(() => {
    const fetchTodos = async () => {
      if (userId != null) {
        const todos = await getTodos(userId)
        setTodos(todos)
      }
    }
    fetchTodos()
  }, [])

  if (userId == null) return RedirectToSignIn({ redirectUrl: '/sign-in' })

  const handleCreateTodo = () => {
    if (newTodo.trim()) {
      addTodo(userId, newTodo)
      setTodos((prev) => [
        { clerkUserId: userId, text: newTodo, isCompleted: false },
        ...prev,
      ])
      setNewTodo('')
    }
  }

  const handleToggle = (id: string) => {
    toggleTodo(id, userId)
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    )
  }

  const handleDelete = (id: string) => {
    deleteTodo(id, userId)
    setTodos(todos.filter((todo) => todo.id !== id))
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
