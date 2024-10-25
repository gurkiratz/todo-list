// import { relations } from 'drizzle-orm'
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm'
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
    organizationId: uuid('organizationId')
      .notNull()
      .references(() => OrganizationTable.id),
    createdAt,
    updatedAt,
  },
  (table) => ({
    clerkUserIdIndex: index('clerkUserIdIndex').on(table.clerkUserId),
    organizationIdIndex: index('organizationIdIndex').on(table.organizationId),
  })
)

export const todoRelations = relations(TodoTable, ({ one }) => ({
  organization: one(OrganizationTable, {
    fields: [TodoTable.organizationId],
    references: [OrganizationTable.id],
  }),
}))
export type SelectTodo = InferSelectModel<typeof TodoTable>
export type InsertTodo = InferInsertModel<typeof TodoTable>

export const OrganizationTable = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt,
  updatedAt,
})

export const organizationRelations = relations(
  OrganizationTable,
  ({ many }) => ({
    todos: many(TodoTable),
    memberships: many(OrgMembershipTable),
  })
)

export const OrgMembershipTable = pgTable(
  'org_memberships',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    organizationId: uuid('organizationId')
      .notNull()
      .references(() => OrganizationTable.id),
    clerkUserId: text('clerkUserId').notNull(),
    role: text('role').notNull().default('member'),
    createdAt,
    updatedAt,
  },
  (table) => ({
    organizationIdIndex: index('organizationIdIndex').on(table.organizationId),
    clerkUserIdIndex: index('clerkUserIdIndex').on(table.clerkUserId),
  })
)

export const orgMembershipRelations = relations(
  OrgMembershipTable,
  ({ one }) => ({
    organization: one(OrganizationTable, {
      fields: [OrgMembershipTable.organizationId],
      references: [OrganizationTable.id],
    }),
  })
)

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
