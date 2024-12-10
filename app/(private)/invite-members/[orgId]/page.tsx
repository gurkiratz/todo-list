'use client'

import { useState } from 'react'
// import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function InviteMembersPage() {
  const [email, setEmail] = useState('')
  // const { orgId } = useParams()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send an API request to invite the member
    // For now, we'll just show a toast notification
    toast({
      title: 'Invitation Sent',
      description: `An invitation has been sent to ${email}`,
    })
    setEmail('')
  }

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-5">Invite Members</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            required
          />
        </div>
        <Button type="submit">Send Invitation</Button>
      </form>
    </div>
  )
}
