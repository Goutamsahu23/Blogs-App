import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfileDetails, login } from '../../services/api'; 


// Thunk to handle user login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await login(email, password); 
    if (response.success) {
      localStorage.setItem('token', response.token); 
      const profileDetails = await getProfileDetails();
      localStorage.setItem('user', JSON.stringify(profileDetails)); 
      return profileDetails; // Return user data
    } else {
      return rejectWithValue(response.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Slice to manage authentication state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Load user data from localStorage
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'),
  },
  reducers: {
    logout: (state, action) => {
      const { navigate } = action.payload; 
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user'); // Remove user data from localStorage
      navigate('/'); // Redirect to the homepage    
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload)); 
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
