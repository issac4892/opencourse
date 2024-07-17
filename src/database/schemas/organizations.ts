import { sql } from 'drizzle-orm';
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const organizations = pgTable('organizations', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  owner_id: uuid('owner_id')
    .references(() => users.id, { onDelete: 'restrict' })
    .notNull(),
  name: text('name').notNull(),
  description: text('description'),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const orgainzation_users = pgTable(
  'organization_users',
  {
    organization_id: uuid('organization_id')
      .references(() => organizations.id, { onDelete: 'cascade' })
      .notNull(),
    user_id: uuid('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
  },
  ({ organization_id, user_id }) => {
    return {
      pk: primaryKey({ columns: [organization_id, user_id] })
    };
  }
);
