import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { SelectTodo } from '@/drizzle/schema'
import { useRecoilValue } from 'recoil'
import { loadingState } from '@/recoil/atoms'
import { cn } from '@/lib/utils'
import {  Cross2Icon } from '@radix-ui/react-icons'

type TodoProps = {
  todos: SelectTodo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TodoList: React.FC<TodoProps> = ({ todos, onToggle, onDelete }) => {
  const isLoading = useRecoilValue(loadingState)

  return (
    <ScrollArea className="h-[300px]">
      <div className="divide-y">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-4 w-full hover:bg-accent group px-4 py-3"
          >
            <Checkbox
              disabled={isLoading}
              checked={todo.isCompleted}
              onCheckedChange={() => onToggle(todo.id)}
            />
            <span
              className={cn(
                todo.isCompleted ? 'line-through text-gray-500' : '',
                'mr-auto max-w-[80%]'
              )}
            >
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(todo.id)}
              disabled={isLoading}
              className="lg:opacity-0 group-hover:opacity-80  hover:pointer"
            >
              <Cross2Icon className="stroke-gray-400 hover:stroke-red-500 stroke-2" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default TodoList
