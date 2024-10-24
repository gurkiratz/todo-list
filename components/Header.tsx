'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from './ui/button'
import { Table2Icon } from 'lucide-react'
import Link from 'next/link'
import { SignInButton, useAuth, UserButton, useUser } from '@clerk/nextjs'

const Header = () => {
  const { userId } = useAuth()
  const { user } = useUser()
  const [selectedOrg, setSelectedOrg] = useState('org1')
  console.log(user?.username)
  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'} className="text-2xl font-bold flex items-center gap-3">
          Todo App <Table2Icon />
        </Link>
        <div className="flex items-center space-x-4">
          <Select value={selectedOrg} onValueChange={setSelectedOrg}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="org1">Team 1</SelectItem>
              <SelectItem value="org2">Team 2</SelectItem>
              <SelectItem value="org3">Team 3</SelectItem>
            </SelectContent>
          </Select>

          {!userId && (
            <Button variant="secondary" asChild>
              {/* <User className="mr-2 h-4 w-4" />
            Sign In */}
              <SignInButton />
            </Button>
          )}
          <UserButton
            appearance={{ elements: { userButtonAvatarBox: 'size-md' } }}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
