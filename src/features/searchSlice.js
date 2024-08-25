
import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    term: '',
    filteredPosts: [],
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
    setFilteredPosts: (state, action) => {
      state.filteredPosts = action.payload;
    },
  },
});

export const { setSearchTerm, setFilteredPosts } = searchSlice.actions;
export default searchSlice.reducer;
