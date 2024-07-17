import { sql } from 'drizzle-orm';
import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  email: text('email').unique().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});
