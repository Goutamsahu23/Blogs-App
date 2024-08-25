// src/features/posts/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts, fetchPostById, createPost, deletePost, updatePost } from '../../services/api';

// Async actions
export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
  const posts = await fetchPosts();
  return posts;
});

export const fetchSinglePost = createAsyncThunk('posts/fetchSinglePost', async (postId) => {
  const post = await fetchPostById(postId);
  return post;
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  const newPost = await createPost(post);
  return newPost;
});

export const deletePostById = createAsyncThunk('posts/deletePostById', async (postId) => {
  await deletePost(postId);
  return postId; 
});

export const updatePostById = createAsyncThunk('posts/updatePostById', async ({ id, post }) => {
  const updatedPost = await updatePost(id, post);
  return updatedPost; 
});

// Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    singlePost: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.singlePost = action.payload;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deletePostById.fulfilled, (state, action) => {
        state.items = state.items.filter(post => post._id !== action.payload);
      })
      .addCase(updatePostById.fulfilled, (state, action) => {
        state.singlePost = action.payload;
        const index = state.items.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default postsSlice.reducer;
