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
    orgId: uuid('orgId')
      .notNull()
      .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
    createdAt,
    updatedAt,
  },
  (table) => ({
    clerkUserIdIndex: index('todos_clerk_user_id_idx').on(table.clerkUserId),
    orgIdIndex: index('todos_org_id_idx').on(table.orgId),
  })
)

export const OrganizationTable = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  createdAt,
  updatedAt,
})

export const OrgMembershipTable = pgTable(
  'org_memberships',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    orgId: uuid('orgId')
      .notNull()
      .references(() => OrganizationTable.id, { onDelete: 'cascade' }),
    clerkUserId: text('clerkUserId').notNull(),
    role: text('role').notNull().default('member'),
    createdAt,
    updatedAt,
  },
  (table) => ({
    orgIdIndex: index('org_memberships_org_id_idx').on(table.orgId),
    clerkUserIdIndex: index('org_memberships_clerk_user_id_idx').on(
      table.clerkUserId
    ),
  })
)

export type SelectTodo = InferSelectModel<typeof TodoTable>
export type InsertTodo = InferInsertModel<typeof TodoTable>

export const todoRelations = relations(TodoTable, ({ one }) => ({
  organization: one(OrganizationTable, {
    fields: [TodoTable.orgId],
    references: [OrganizationTable.id],
  }),
}))
export const organizationRelations = relations(
  OrganizationTable,
  ({ many }) => ({
    todos: many(TodoTable),
    memberships: many(OrgMembershipTable),
  })
)
export const orgMembershipRelations = relations(
  OrgMembershipTable,
  ({ one }) => ({
    organization: one(OrganizationTable, {
      fields: [OrgMembershipTable.orgId],
      references: [OrganizationTable.id],
    }),
  })
)
