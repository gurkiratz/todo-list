// import { relations } from 'drizzle-orm'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

const createdAt = timestamp('createdAt').notNull().defaultNow()
const updatedAt = timestamp('updatedAt')
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date())

export const TodoTable = pgTable(
  'todos',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    text: text('text').notNull(),
    description: text('description'),
    isCompleted: boolean('isCompleted').notNull().default(false),
    clerkUserId: text('clerkUserId').notNull(),
    createdAt,
    updatedAt,
  },
  (table) => ({
    clerkUserIdIndex: index('clerkUserIdIndex').on(table.clerkUserId),
  })
)

export type SelectTodo = InferSelectModel<typeof TodoTable>
export type InsertTodo = InferInsertModel<typeof TodoTable>

// export const users = pgTable('users', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   name: varchar('name', { length: 255 }).notNull(),
//   email: varchar('email', { length: 255 }).notNull().unique(),
//   username: varchar('username', { length: 255 }).notNull(),
//   createdAt,
//   updatedAt,
// })

// export const usersRelations = relations(users, ({ many }) => ({
//   todos: many(TodoTable),
// }))

// export const todoRelations = relations(TodoTable, ({ one }) => ({
//   user: one(users, {
//     fields: [TodoTable.userId],
//     references: [users.id],
//   }),
// }))
