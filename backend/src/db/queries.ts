import { db } from './index';
import { users, posts, votes } from './schema';
import { eq, and, sql } from 'drizzle-orm';
import type {
  User,
  NewUser,
  Post,
  NewPost,
  Vote,
  NewVote,
  Status,
} from './schema';

// users
export const createUser = async (data: NewUser) => {
  const [insertedUser]: User[] = await db
    .insert(users)
    .values(data)
    .returning();
  return insertedUser;
};

export const getUserById = async (userId: string) => {
  return await db.query.users.findFirst({ where: eq(users.id, userId) });
};
export const updateUser = async (userId: string, data: Partial<NewUser>) => {
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    throw new Error(`User with id ${userId} does not exist`);
  }

  const [updatedUser]: User[] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, userId))
    .returning();
  return updatedUser;
};

export const upsertUser = async (data: NewUser) => {
  const [upsertedUser]: User[] = await db
    .insert(users)
    .values(data)
    .onConflictDoUpdate({
      target: users.id,
      set: data,
    })
    .returning();
  return upsertedUser;
};

// check admin
export const isAdmin = async (userId: string) => {
  const user = await getUserById(userId);
  return user?.role === 'admin';
};

// posts
export const createPost = async (data: NewPost) => {
  const [insertedPost]: Post[] = await db
    .insert(posts)
    .values(data)
    .returning();
  return insertedPost;
};

export const getAllPosts = async () => {
  return await db.query.posts.findMany({
    with: {
      author: {
        columns: {
          name: true,
          avatar: true,
        },
      },
      votes: {
        columns: {
          userId: true,
        },
      },
    },
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });
};
export const getPostById = async (postId: string) => {
  return await db.query.posts.findFirst({
    where: eq(posts.id, postId),
    with: {
      author: {
        columns: {
          name: true,
          avatar: true,
        },
      },
      votes: {
        columns: {
          userId: true,
        },
      },
    },
  });
};

export const getPostsByAuthor = async (authorId: string) => {
  return await db.query.posts.findMany({
    where: eq(posts.authorId, authorId),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    with: {
      votes: {
        columns: {
          userId: true,
        },
      },
    },
  });
};

// get author stats
export const getAuthorStats = async (authorId: string) => {
  const postResult = await db
    .select({
      count: sql<number>`count(${posts.id})`,
    })
    .from(posts)
    .where(eq(posts.authorId, authorId));

  const voteResult = await db
    .select({
      count: sql<number>`count(${votes.id})`,
    })
    .from(votes)
    .innerJoin(posts, eq(votes.postId, posts.id))
    .where(eq(posts.authorId, authorId));

  return {
    postCount: postResult[0]?.count || 0,
    voteCount: voteResult[0]?.count || 0,
  };
};

export const updatePost = async (postId: string, data: Partial<NewPost>) => {
  const existingPost = await getPostById(postId);
  if (!existingPost) {
    throw new Error(`Post with id ${postId} not found.`);
  }
  const [updatedPost]: Post[] = await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, postId))
    .returning();

  return updatedPost;
};

export const deletePost = async (postId: string) => {
  const existingPost = await getPostById(postId);
  if (!existingPost) {
    throw new Error(`Post with id ${postId} not found.`);
  }
  const [deletedPost]: Post[] = await db
    .delete(posts)
    .where(eq(posts.id, postId))
    .returning();

  return deletedPost;
};

// votes
export const upvote = async (postId: string, userId: string) => {
  const [insertedVote]: Vote[] = await db
    .insert(votes)
    .values({ postId, userId })
    .onConflictDoNothing()
    .returning();

  return insertedVote;
};

export const cancelUpvote = async (postId: string, userId: string) => {
  const [deletedVote]: Vote[] = await db
    .delete(votes)
    .where(and(eq(votes.postId, postId), eq(votes.userId, userId)))
    .returning();

  return deletedVote;
};

export const checkUserVote = async (postId: string, userId: string) => {
  const vote = await db.query.votes.findFirst({
    where: and(eq(votes.postId, postId), eq(votes.userId, userId)),
  });

  return !!vote; //logical NOT operator applied twice = transform value into boolean
};
