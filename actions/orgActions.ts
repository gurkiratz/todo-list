'use server'
import { db } from '@/drizzle/db'
import {
  OrganizationTable,
  OrgMembershipTable,
  TodoTable,
} from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

// function to getOrgId based on userId
export async function getOrgId(userId: string) {
  return await db
    .select({ orgId: OrgMembershipTable.orgId })
    .from(OrgMembershipTable)
    .where(eq(OrgMembershipTable.clerkUserId, userId))
}

// function to get org id and org name
export async function getOrg(userId: string) {
  return await db
    .select({ name: OrganizationTable.name, orgId: OrganizationTable.id })
    .from(OrgMembershipTable)
    .innerJoin(
      OrganizationTable,
      eq(OrganizationTable.id, OrgMembershipTable.orgId)
    )
    .where(eq(OrgMembershipTable.clerkUserId, userId))
}

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

  // delete org record from organization table
  const orgs = await db
    .select({ orgId: OrganizationTable.id })
    .from(OrgMembershipTable)
    .innerJoin(
      OrganizationTable,
      eq(OrganizationTable.id, OrgMembershipTable.orgId)
    )
    .where(eq(OrgMembershipTable.clerkUserId, userId))

  for (const orgId in orgs) {
    console.log(orgId)
    await db.delete(OrganizationTable).where(eq(OrganizationTable.id, orgId))
  }
}
