import { InsertTodo, SelectTodo } from '@/drizzle/schema'
import { CheckCircle2, ListTodo } from 'lucide-react'
import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import TodoList from './TodoList'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

type Props = {
  todos: InsertTodo[]
  handleToggle: (id: string) => void
  handleDelete: (id: string) => void
}

const TodoView: React.FC<Props> = ({ todos, handleDelete, handleToggle }) => {
  const todoLists = [
    {
      title: 'To Do',
      icon: <ListTodo className="h-4 w-4" />,
      todos: todos.filter((t) => !t.isCompleted) as SelectTodo[],
    },
    {
      title: 'Done',
      icon: <CheckCircle2 className="h-4 w-4" />,
      todos: todos.filter((t) => t.isCompleted) as SelectTodo[],
    },
  ]

  return (
    <div>
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
                onDelete={handleDelete}
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
                    onDelete={handleDelete}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default TodoView
