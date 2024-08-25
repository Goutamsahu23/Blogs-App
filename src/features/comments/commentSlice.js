// src/features/comments/commentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCommentByPost, addComment, addReply } from '../../services/api';

// Async actions
export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
  const comments = await getCommentByPost(postId);
  return comments;
});

export const addNewComment = createAsyncThunk('comments/addNewComment', async ({ postId, content }) => {
  const newComment = await addComment({ postId, content });
  return newComment;
});

export const addNewReply = createAsyncThunk('comments/addNewReply', async ({ commentId, reply }) => {
console.log(reply)
  const newReply = await addReply({ commentId, reply });
  return newReply;
});

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewComment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(addNewReply.fulfilled, (state, action) => {
        const index = state.items.findIndex((comment) => comment._id === action.payload.commentId);
        if (index !== -1) {
          state.items[index].replies.push(action.payload.reply);
        }
      });
  },
});

export default commentsSlice.reducer;
