import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME
});

export const db = drizzle(pool);

export { users } from './schemas/users';
export { organizations, orgainzation_users } from './schemas/organizations';
export {
  courses,
  course_categories,
  course_notice,
  course_question,
  course_question_comment,
  course_progress,
  lectures,
  lecture_comment,
  enrollments
} from './schemas/courses';
