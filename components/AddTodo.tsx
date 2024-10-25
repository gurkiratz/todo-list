import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { PlusCircle } from 'lucide-react'

type Props = {
  createTodo: () => void
}

const AddTodo: React.FC<Props> = ({ createTodo }) => {
  const [newTodo, setNewTodo] = useState('')

  return (
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
              onKeyUp={(e) => e.key === 'Enter' && createTodo()}
            />
            <Button onClick={createTodo}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AddTodo