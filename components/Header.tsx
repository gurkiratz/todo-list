'use client'

import React, { useEffect, useState } from 'react'
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
import {
  RedirectToSignIn,
  SignInButton,
  useAuth,
  UserButton,
} from '@clerk/nextjs'
import { useRecoilState } from 'recoil'
import { getOrg } from '@/actions/orgActions'
import { selectedOrgState } from '@/recoil/atoms/orgAtom'

type OrgsType = {
  orgId: string
  name: string
}

const Header = () => {
  const [orgs, setOrgs] = useState<OrgsType[]>()
  const [selectedOrg, setSelectedOrg] = useRecoilState(selectedOrgState)
  const { userId } = useAuth()

  useEffect(() => {
    const fetchOrgs = async () => {
      if (userId != null) {
        const result = await getOrg(userId!)
        console.log(result)
        setOrgs(result)

        if (result.length > 0) {
          setSelectedOrg(result[0].orgId)
        }
      }
    }
    fetchOrgs()
  }, [])

  if (userId == null) return RedirectToSignIn({ redirectUrl: '/' })
  if (!orgs) return <header>No orgs</header>

  return (
    <header className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'} className="text-2xl font-bold flex items-center gap-3">
          Todo App <Table2Icon />
        </Link>
        <div className="flex items-center space-x-4">
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
