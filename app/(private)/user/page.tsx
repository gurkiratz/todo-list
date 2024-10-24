'use client'

import { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PlusCircle, ListTodo, CheckCircle2 } from 'lucide-react'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs'
import { todoType } from '@/types/todoType'
import { addTodo, getTodos, toggleTodo } from '@/actions/todoActions'
import TodoList from '@/components/TodoList'
import { InsertTodo, SelectTodo } from '@/drizzle/schema'
import { db } from '@/drizzle/db'

type Todo = {
  id: number
  isCompleted: boolean
  text: string
}

function App() {
  // const todos = db.query.TodoTable.findMany({
  //   where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
  //   orderBy: ({ createdAt }, { desc }) => desc(createdAt),
  // })
  const [todos, setTodos] = useState<InsertTodo[]>([])
  const [newTodo, setNewTodo] = useState('')
  // const [selectedOrg, setSelectedOrg] = useState('org1')
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

  const deleteTodo = (id: string | undefined) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const todoLists = [
    {
      title: 'To Do',
      icon: <ListTodo className="h-4 w-4" />,
      todos: todos.filter((t) => !t.isCompleted),
    },
    {
      title: 'Done',
      icon: <CheckCircle2 className="h-4 w-4" />,
      todos: todos.filter((t) => t.isCompleted),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-4">
        {/* Desktop view */}
        <div className="hidden lg:grid grid-cols-2 gap-4">
          {todoLists.map((list, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {list.icon}
                  <span>{list.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TodoList
                  todos={list.todos}
                  onToggle={handleToggle}
                  onDelete={deleteTodo}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile and tablet view */}
        <div className="lg:hidden">
          <Tabs defaultValue="todo">
            <TabsList className="grid w-full grid-cols-2">
              {todoLists.map((list, index) => (
                <TabsTrigger key={index} value={list.title.toLowerCase()}>
                  {list.icon}
                  <span className="ml-2">{list.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {todoLists.map((list, index) => (
              <TabsContent key={index} value={list.title.toLowerCase()}>
                <Card>
                  <CardHeader>
                    <CardTitle>{list.title}</CardTitle>
                    <CardDescription>
                      Manage your {list.title.toLowerCase()} items
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TodoList
                      todos={list.todos}
                      onToggle={handleToggle}
                      onDelete={deleteTodo}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Add New Todo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter a new todo"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyUp={(e) => e.key === 'Enter' && handleCreateTodo()}
                />
                <Button onClick={handleCreateTodo}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default App
