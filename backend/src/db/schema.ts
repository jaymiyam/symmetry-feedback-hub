import {
  pgTable,
  text,
  uuid,
  pgEnum,
  timestamp,
  serial,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define Enums for better typing
export const typeEnum = pgEnum('type', ['feature', 'bug']);
export const roleEnum = pgEnum('role', ['user', 'admin']);
export const statusEnum = pgEnum('status', [
  'under-review',
  'planned',
  'in-progress',
  'resolved',
]);

// users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull(),
  name: text('name').notNull(),
  avatar: text('avatar'),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

// posts table
export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: typeEnum('type').default('feature').notNull(),
  status: statusEnum('status').default('under-review').notNull(),
  createAt: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  authorId: text('author_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

// votes table
export const votes = pgTable(
  'votes',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    postId: uuid('post_id')
      .references(() => posts.id, { onDelete: 'cascade' })
      .notNull(),
  },
  (table) => [
    // unique constraint between a user and a post for one vote
    uniqueIndex('unique_vote').on(table.userId, table.postId),
  ],
);

// soft relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  votes: many(votes),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  votes: many(votes),
}));

export const votesRelations = relations(votes, ({ one }) => ({
  voter: one(users, { fields: [votes.userId], references: [users.id] }),
  post: one(posts, { fields: [votes.postId], references: [posts.id] }),
}));

// type inference
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Vote = typeof votes.$inferSelect;
export type NewVote = typeof votes.$inferInsert;
