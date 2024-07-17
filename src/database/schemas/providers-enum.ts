import { pgEnum } from 'drizzle-orm/pg-core';

export const providersEnum = pgEnum('Providers', ['github', 'google']);
