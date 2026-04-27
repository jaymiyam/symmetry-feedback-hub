import type { Request, Response } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
  getCommentsByPost,
  getCommentById,
} from '../db/queries';
import { getAuth } from '@clerk/express';

export const handleCreatePost = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, description, type } = req.body;

    if (!title.trim() || !description.trim()) {
      return (
        res
          //   400: bad request
          .status(400)
          .json({ error: 'Title and description are required' })
      );
    }

    const newPost = await createPost({
      title,
      description,
      type,
      authorId: userId,
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

export const handleGetAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get posts' });
  }
};

export const handleGetPostById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as { postId: string };
    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get post' });
  }
};

export const handleGetPostsByAuthor = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const posts = await getPostsByAuthor(userId);

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get author posts' });
  }
};

export const handleUpdatePost = async (req: Request, res: Response) => {
  try {
    const { userId, sessionClaims } = getAuth(req);
    const { postId } = req.params as { postId: string };

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Posts not found' });
    }

    // const isUserAdmin = await isAdmin(userId);
    const userRole = sessionClaims?.role;
    if (userRole !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Forbidden: Admin access required' });
    }

    const { status } = req.body;

    const updatedPost = await updatePost(postId, { status });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update post' });
  }
};
export const handleDeletePost = async (req: Request, res: Response) => {
  try {
    const { userId, sessionClaims } = getAuth(req);
    const { postId } = req.params as { postId: string };

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Posts not found' });
    }

    const userRole = sessionClaims?.role;

    if (userId !== post?.authorId && userRole !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Forbidden: You have no access right to this action.' });
    }

    const deletedPost = await deletePost(postId);
    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// comments related
export const handleGetCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params as { postId: string };
    const comments = await getCommentsByPost(postId);
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to get comments' });
  }
};

export const handleCreateComment = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);
    const { postId } = req.params as { postId: string };
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const post = await getPostById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ error: 'Cannot comment on a non-existent post' });
    }

    if (!content.trim()) {
      return (
        res
          //   400: bad request
          .status(400)
          .json({ error: 'Content is required' })
      );
    }

    const newComment = await createComment({
      content,
      authorId: userId,
      postId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

export const handleDeleteComment = async (req: Request, res: Response) => {
  try {
    const { userId, sessionClaims } = getAuth(req);
    const { commentId } = req.params as { commentId: string };

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const comment = await getCommentById(commentId);

    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    const userRole = sessionClaims?.role;

    if (comment.authorId !== userId && userRole !== 'admin') {
      return res
        .status(403)
        .json({ error: 'You can only delete your own comments' });
    }

    const deletedComment = await deleteComment(commentId);

    res.status(200).json(deletedComment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
