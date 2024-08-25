import { configureStore } from '@reduxjs/toolkit';
import postsReducer from '../features/posts/postSlice';
import commentsReducer from '../features/comments/commentSlice';
import authReducer from '../features/auth/authSlice'
import searchReducer from '../features/searchSlice'
export const store= configureStore({
  reducer: {
    posts: postsReducer,
    comments: commentsReducer,
    auth: authReducer,
    search:searchReducer,

  },
});

