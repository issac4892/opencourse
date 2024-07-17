import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { providersEnum } from './providers-enum';
import { users } from './users';

export const associations = pgTable('associations', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  provider: providersEnum('provider').notNull(),
  user_id: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  access_token: text('access_token').notNull(),
  refresh_token: text('refresh_token'),
  provider_user_id: text('provider_user_id').notNull(),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});
