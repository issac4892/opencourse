CREATE TYPE "Providers" AS ENUM (
  'GITHUB',
  'GOOGLE'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY,
  "email" text,
  "name" varchar(50)
);

CREATE TABLE "associations" (
  "id" uuid PRIMARY KEY,
  "provider" Providers,
  "user_id" uuid,
  "access_token" text,
  "refresh_token" text,
  "provider_user_id" text
);

CREATE TABLE "organizations" (
  "id" uuid,
  "owner" uuid,
  "name" text,
  "description" text
);

CREATE TABLE "organization_users" (
  "organization_id" uuid,
  "user_id" uuid
);

CREATE TABLE "courses" (
  "id" uuid,
  "title" text,
  "description" text,
  "image_url" text,
  "organization_id" uuid
);

CREATE TABLE "categories" (
  "id" uuid,
  "course_id" uuid,
  "order" number,
  "content" text
);

CREATE TABLE "lectures" (
  "id" uuid,
  "course_id" uuid,
  "parent_category" uuid,
  "content" text,
  "description" text,
  "image_url" text,
  "youtube_video" text
);

CREATE TABLE "course_notice" (
  "id" uuid,
  "course_id" uuid,
  "created_at" timestamp,
  "title" varchar(70),
  "content" text,
  "author" uuid
);

CREATE TABLE "course_question" (
  "id" uuid,
  "course_id" uuid,
  "title" varchar(70),
  "content" text,
  "private" bool DEFAULT false,
  "author" uuid
);

CREATE TABLE "course_question_comment" (
  "id" uuid,
  "question_id" uuid,
  "content" text,
  "author" uuid
);

CREATE TABLE "lecture_comment" (
  "id" uuid,
  "lecture_id" uuid,
  "content" text,
  "author" uuid
);

CREATE TABLE "enrollments" (
  "id" uuid,
  "user_id" uuid,
  "course_id" uuid,
  "enrolled_at" timestamp
);

CREATE TABLE "course_progress" (
  "id" uuid,
  "enrollment_id" uuid,
  "lecture_id" uuid,
  "complete" bool DEFAULT false,
  "last_opened_at" timestamp
);

ALTER TABLE "associations" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "organizations" ADD FOREIGN KEY ("owner") REFERENCES "users" ("id") ON DELETE RESTRICT;

ALTER TABLE "organization_users" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE CASCADE;

ALTER TABLE "organization_users" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "courses" ADD FOREIGN KEY ("organization_id") REFERENCES "organizations" ("id") ON DELETE RESTRICT;

ALTER TABLE "categories" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "lectures" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "lectures" ADD FOREIGN KEY ("parent_category") REFERENCES "categories" ("id") ON DELETE SET NULL;

ALTER TABLE "course_notice" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "course_notice" ADD FOREIGN KEY ("author") REFERENCES "users" ("id") ON DELETE SET SET NULL;

ALTER TABLE "course_question" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "course_question" ADD FOREIGN KEY ("author") REFERENCES "users" ("id") ON DELETE SET NULL;

ALTER TABLE "course_question_comment" ADD FOREIGN KEY ("question_id") REFERENCES "course_question" ("id") ON DELETE CASCADE;

ALTER TABLE "lecture_comment" ADD FOREIGN KEY ("lecture_id") REFERENCES "lectures" ("id") ON DELETE CASCADE;

ALTER TABLE "lecture_comment" ADD FOREIGN KEY ("author") REFERENCES "users" ("id") ON DELETE SET NULL;

ALTER TABLE "enrollments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE;

ALTER TABLE "enrollments" ADD FOREIGN KEY ("course_id") REFERENCES "courses" ("id") ON DELETE CASCADE;

ALTER TABLE "course_progress" ADD FOREIGN KEY ("enrollment_id") REFERENCES "enrollments" ("id") ON DELETE CASCADE;

ALTER TABLE "course_progress" ADD FOREIGN KEY ("lecture_id") REFERENCES "lectures" ("id") ON DELETE CASCADE;