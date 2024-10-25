'use server'
import { db } from '@/drizzle/db'
import { TodoTable } from '@/drizzle/schema'
import { and, desc, eq, not } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function getTodos(userId: string, orgId: string) {
  return db
    .select()
    .from(TodoTable)
    .where(and(eq(TodoTable.clerkUserId, userId), eq(TodoTable.orgId, orgId)))
    .orderBy(desc(TodoTable.createdAt))
}

export async function addTodo(userId: string, orgId: string, text: string) {
  await db
    .insert(TodoTable)
    .values({ clerkUserId: userId, orgId, text, isCompleted: false })
  revalidatePath('/user')
}

export async function toggleTodo(id: string, userId: string, orgId: string) {
  await db
    .update(TodoTable)
    .set({ isCompleted: not(TodoTable.isCompleted) })
    .where(
      and(
        eq(TodoTable.id, id),
        eq(TodoTable.clerkUserId, userId),
        eq(TodoTable.orgId, orgId)
      )
    )
  revalidatePath('/user')
}

export const editTodo = async (
  id: string,
  userId: string,
  orgId: string,
  text: string
) => {
  await db
    .update(TodoTable)
    .set({
      text,
    })
    .where(
      and(
        eq(TodoTable.id, id),
        eq(TodoTable.clerkUserId, userId),
        eq(TodoTable.orgId, orgId)
      )
    )
  revalidatePath('/user')
}

export async function deleteTodo(id: string, userId: string, orgId: string) {
  const result = await db
    .delete(TodoTable)
    .where(
      and(
        eq(TodoTable.id, id),
        eq(TodoTable.clerkUserId, userId),
        eq(TodoTable.orgId, orgId)
      )
    )

  revalidatePath('/todos')
  return result
}
