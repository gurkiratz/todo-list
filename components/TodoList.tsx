import React, { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { SelectTodo } from '@/drizzle/schema'
import { useRecoilValue } from 'recoil'
import { loadingState } from '@/recoil/atoms'
import { cn } from '@/lib/utils'
import { Cross2Icon } from '@radix-ui/react-icons'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Edit3Icon } from 'lucide-react'

type TodoProps = {
  todos: SelectTodo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdateDescription: (id: string, description: string) => void
}

const TodoList: React.FC<TodoProps> = ({
  todos,
  onToggle,
  onDelete,
  onUpdateDescription,
}) => {
  const isLoading = useRecoilValue(loadingState)
  const [openModal, setOpenModal] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState<SelectTodo | null>(null)
  const [description, setDescription] = useState('')

  const handleOpenModal = (todo: SelectTodo) => {
    setSelectedTodo(todo)
    setDescription(todo.description ?? '')
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedTodo(null)
    setDescription('')
  }

  const handleSaveDescription = () => {
    if (selectedTodo) {
      onUpdateDescription(selectedTodo.id, description)
      handleCloseModal()
    }
  }

  return (
    <>
      <ScrollArea className="h-[90%]">
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
              <div className="mr-auto max-w-[80%] flex flex-col gap-1">
                <span
                  className={cn(
                    todo.isCompleted ? 'line-through text-gray-500' : ''
                  )}
                >
                  {todo.text}
                </span>
                <span
                  className={cn(
                    todo.description ? 'inline' : 'hidden',
                    todo.isCompleted ? 'line-through text-gray-500' : '',
                    'text-sm text-muted-foreground'
                  )}
                >
                  {todo.description}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleOpenModal(todo)}
                disabled={isLoading}
                className="lg:opacity-0 group-hover:opacity-80 hover:pointer"
              >
                <Edit3Icon className="stroke-gray-400 hover:stroke-gray-900 stroke-2 h-5" />
              </Button>
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
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Todo Description</DialogTitle>
          </DialogHeader>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
          />
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button onClick={handleSaveDescription}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TodoList
