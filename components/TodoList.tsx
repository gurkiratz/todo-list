import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { SelectTodo } from '@/drizzle/schema'
import { useRecoilValue } from 'recoil'
import { loadingState } from '@/recoil/atoms'

type TodoProps = {
  todos: SelectTodo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

const TodoList: React.FC<TodoProps> = ({ todos, onToggle, onDelete }) => {
  const isLoading = useRecoilValue(loadingState)

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center space-x-2">
            <Checkbox
              disabled={isLoading}
              checked={todo.isCompleted}
              onCheckedChange={() => onToggle(todo.id)}
            />
            <span
              className={todo.isCompleted ? 'line-through text-gray-500' : ''}
            >
              {todo.text}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(todo.id)}
              disabled={isLoading}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

export default TodoList
