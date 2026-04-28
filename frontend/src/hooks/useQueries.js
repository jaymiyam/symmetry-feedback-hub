import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAuthorStats,
  getAllPosts,
  getPostById,
  getPostsByAuthor,
  createPost,
  updatePost,
  deletePost,
  upvote,
  cancelUpvote,
  getCommentsByPost,
  createComment,
  deleteComment,
} from '../lib/api';

export const QUERY_KEYS = {
  POSTS: ['posts'],
  POST: (postId) => ['post', postId],
  AUTHOR_POSTS: ['posts', 'author'],
  STATS: (authorId) => ['stats', authorId],
  COMMENTS: (postId) => ['comments', postId],
};

export const useGetAuthorStats = (authorId) => {
  return useQuery({
    queryKey: QUERY_KEYS.STATS(authorId),
    queryFn: () => getAuthorStats(authorId),
    enabled: !!authorId,
  });
};

// posting
export const useGetAllPosts = () => {
  return useQuery({ queryKey: QUERY_KEYS.POSTS, queryFn: getAllPosts });
};

export const useGetPostById = (postId) => {
  return useQuery({
    queryKey: QUERY_KEYS.POST(postId),
    queryFn: () => getPostById(postId),
    enabled: !!postId, //do not enable the query if postId is undefined
  });
};

export const useGetPostsByAuthor = () => {
  return useQuery({
    queryKey: QUERY_KEYS.AUTHOR_POSTS,
    queryFn: getPostsByAuthor,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTHOR_POSTS });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST(variables.postId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTHOR_POSTS });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST(postId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.AUTHOR_POSTS });
    },
  });
};

// voting
export const useUpvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: upvote,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST(postId),
      });
    },
  });
};

export const useCancelUpvote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelUpvote,
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.POSTS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.POST(postId),
      });
    },
  });
};

// commenting
export const useGetComments = (postId) => {
  return useQuery({
    queryKey: QUERY_KEYS.COMMENTS(postId),
    queryFn: () => getCommentsByPost(postId),
    enabled: !!postId,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // We pass the content string; the hook handles the postId
    mutationFn: createComment,
    onSuccess: (_, variables) => {
      // Refresh only the comments for THIS post
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENTS(variables.postId),
      });
    },
  });
};

export const useDeleteComment = (postId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      // Refresh the list after the comment is gone
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENTS(postId),
      });
    },
  });
};
