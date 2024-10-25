import { db } from '@/drizzle/db'
import {
  OrganizationTable,
  OrgMembershipTable,
  TodoTable,
} from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function createOrg(name: string) {
  const [newOrg] = await db
    .insert(OrganizationTable)
    .values({ name })
    .returning({ id: OrganizationTable.id })
  return newOrg.id
}

export async function createOrgMember(
  orgId: string,
  userId: string,
  role: string
) {
  await db
    .insert(OrgMembershipTable)
    .values({ orgId, clerkUserId: userId, role })
    .execute()
}

// function to deleteOrg
export async function deleteOrgMemberTodos(userId: string) {
  // Delete todos for the user
  await db.delete(TodoTable).where(eq(TodoTable.clerkUserId, userId))

  // Delete org memberships for the user
  await db
    .delete(OrgMembershipTable)
    .where(eq(OrgMembershipTable.clerkUserId, userId))
}
