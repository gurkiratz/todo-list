import { db } from '@/drizzle/db'
import { OrganizationTable, OrgMembershipTable } from '@/drizzle/schema'

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
