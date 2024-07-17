import { sql } from 'drizzle-orm';
import {
  numeric,
  pgTable,
  text,
  primaryKey,
  timestamp,
  uuid,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { organizations } from './organizations';

export const courses = pgTable('courses', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  title: text('title').notNull(),
  description: text('description'),
  image_url: text('image_url'),
  organization_id: uuid('organization_id')
    .references(() => organizations.id, { onDelete: 'restrict' })
    .notNull(),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const course_categories = pgTable(
  'course_categories',
  {
    id: uuid('id')
      .primaryKey()
      .default(sql`uuid_generate_v4()`),
    course_id: uuid('course_id')
      .references(() => courses.id, { onDelete: 'cascade' })
      .notNull(),
    order: numeric('order').notNull(),
    content: text('content').notNull()
  },
  ({ course_id, order }) => {
    return {
      course_order_unique: uniqueIndex('course_order_unique').on(
        course_id,
        order
      )
    };
  }
);
