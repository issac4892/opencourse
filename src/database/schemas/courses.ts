import { sql } from 'drizzle-orm';
import {
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  uniqueIndex,
  varchar,
  boolean
} from 'drizzle-orm/pg-core';
import { organizations } from './organizations';
import { users } from './users';

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

export const course_notice = pgTable('course_notice', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  course_id: uuid('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 70 }).notNull(),
  content: text('content').notNull(),
  author: uuid('author').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const course_question = pgTable('course_question', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  course_id: uuid('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  title: varchar('title', { length: 70 }).notNull(),
  content: text('content').notNull(),
  private: boolean('private').default(false),
  author: uuid('author').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const course_question_comment = pgTable('course_question_comment', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  question_id: uuid('question_id')
    .references(() => course_question.id, { onDelete: 'cascade' })
    .notNull(),
  content: text('content').notNull(),
  author: uuid('author').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const lectures = pgTable('lectures', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  course_id: uuid('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  parent_category_id: uuid('parent_category_id').references(
    () => course_categories.id,
    { onDelete: 'set null' }
  ),
  content: text('content').notNull(),
  description: text('description'),
  image_url: text('image_url'),
  youtube_video: text('youtube_video'),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const lecture_comment = pgTable('lecture_comment', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  lecture_id: uuid('lecture_id')
    .references(() => lectures.id, { onDelete: 'cascade' })
    .notNull(),
  content: text('content').notNull(),
  author: uuid('author').references(() => users.id, { onDelete: 'set null' }),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const enrollments = pgTable('enrollments', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  course_id: uuid('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  user_id: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});

export const course_progress = pgTable('course_progress', {
  id: uuid('id')
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  course_id: uuid('course_id')
    .references(() => courses.id, { onDelete: 'cascade' })
    .notNull(),
  user_id: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  lecture_id: uuid('lecture_id')
    .references(() => lectures.id, { onDelete: 'cascade' })
    .notNull(),
  completed: boolean('completed').default(false),
  created_at: timestamp('created_at').default(sql`NOW() AT TIME ZONE 'UTC'`)
});
