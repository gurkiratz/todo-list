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
  // const id = await db
  //   .insert(TodoTable)
  //   .values({ clerkUserId: userId, orgId, text, isCompleted: false })
  //   .returning({ id: TodoTable.id })
  // console.log(id)
  const [newTodo] = await db
    .insert(TodoTable)
    .values({ clerkUserId: userId, orgId, text, isCompleted: false })
    .returning()
  revalidatePath('/user')
  return newTodo
}

export async function toggleTodo(id: string, userId: string, orgId: string) {
  // await db
  //   .update(TodoTable)
  //   .set({ isCompleted: not(TodoTable.isCompleted) })
  //   .where(
  //     and(
  //       eq(TodoTable.id, id),
  //       eq(TodoTable.clerkUserId, userId),
  //       eq(TodoTable.orgId, orgId)
  //     )
  //   )
  // revalidatePath('/user')
  const [updatedTodo] = await db
    .update(TodoTable)
    .set({ isCompleted: not(TodoTable.isCompleted) })
    .where(
      and(
        eq(TodoTable.id, id),
        eq(TodoTable.clerkUserId, userId),
        eq(TodoTable.orgId, orgId)
      )
    )
    .returning()
  revalidatePath('/user')
  return updatedTodo
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
  await db
    .delete(TodoTable)
    .where(
      and(
        eq(TodoTable.id, id),
        eq(TodoTable.clerkUserId, userId),
        eq(TodoTable.orgId, orgId)
      )
    )

  revalidatePath('/user')
}

export async function updateTodoDescription(id: string, description: string) {
  const [updatedTodo] = await db
    .update(TodoTable)
    .set({ description })
    .where(eq(TodoTable.id, id))
    .returning()
  revalidatePath('/user')
  return updatedTodo
}
