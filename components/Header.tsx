'use client'

import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from '@/components/ui/select'
import { Button } from './ui/button'
import { Table2Icon, UserPlus } from 'lucide-react'
import Link from 'next/link'
import {
  RedirectToSignIn,
  SignInButton,
  useAuth,
  UserButton,
} from '@clerk/nextjs'
import { useRecoilState } from 'recoil'
import { getOrg } from '@/actions/orgActions'
import { selectedOrgState } from '@/recoil/atoms'
import { useRouter } from 'next/navigation'

type OrgsType = {
  orgId: string
  name: string
}

const Header = () => {
  const [orgs, setOrgs] = useState<OrgsType[]>()
  const [selectedOrg, setSelectedOrg] = useRecoilState(selectedOrgState)
  const { userId } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchOrgs = async () => {
      if (userId != null) {
        const result = await getOrg(userId!)
        setOrgs(result)

        if (result.length > 0) {
          setSelectedOrg(result[0].orgId)
        }
      }
    }
    fetchOrgs()
  }, [])

  const handleInviteMembers = () => {
    router.push(`/invite-members/${selectedOrg}`)
  }

  if (userId == null) return RedirectToSignIn({ redirectUrl: '/' })

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'} className="text-2xl font-bold flex items-center gap-3">
          Todo App <Table2Icon />
        </Link>
        <div className="flex items-center space-x-4">
          {!orgs ? (
            <div>Loading...</div>
          ) : (
            <Select value={selectedOrg!} onValueChange={setSelectedOrg}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent>
                {orgs.map((org) => (
                  <SelectItem key={org.orgId} value={org.orgId}>
                    {org.name}
                  </SelectItem>
                ))}
                <SelectSeparator />
              </SelectContent>
            </Select>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={handleInviteMembers}
            disabled={!selectedOrg}
            title="Invite Members"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
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
