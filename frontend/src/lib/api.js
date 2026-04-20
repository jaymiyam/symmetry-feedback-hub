import api from './axios';

// creating frontend methods calling axios to make http requests to our backend endpoints

// users
export const syncUser = async (userData) => {
  const { data } = await api.post('/users/sync', userData);
  return data;
};

// posts
export const getAllPosts = async () => {
  const { data } = await api.get('/posts');
  return data;
};

export const getPostById = async (postId) => {
  const { data } = await api.get(`/posts/${postId}`);
  return data;
};

export const getPostsByAuthor = async () => {
  const { data } = await api.get('/posts/myposts');
  return data;
};

export const createPost = async (postData) => {
  const { data } = await api.post('/posts', postData);
  return data;
};

export const updatePost = async ({ postId, ...postData }) => {
  const { data } = await api.patch(`/posts/${postId}`, postData);
  return data;
};

export const deletePost = async (postId) => {
  const { data } = await api.delete(`/posts/${postId}`);
  return data;
};

// votes
export const upvote = async (postId) => {
  const { data } = await api.post(`/votes/${postId}`);
  return data;
};

export const cancelUpvote = async (postId) => {
  const { data } = await api.delete(`/votes/${postId}`);
  return data;
};
