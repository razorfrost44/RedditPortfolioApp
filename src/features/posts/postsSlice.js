import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/redditApi";

export const fetchPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (subRedditName, thunkAPI) => {
    const response = await Reddit.getSubRedditPosts(subRedditName);
    return response;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    selectedSubReddit: "/r/Home",
    selectedSubRedditDisplayName: "Home",
    searchTerm: "",
    isLoadingPosts: false,
    failedToLoadPosts: false,
  },
  reducers: {
    setSelectedSubReddit: (state, action) => {
      state.selectedSubReddit = action.payload;
      state.searchTerm = "";
    },
    setSelectedSubRedditDisplayName: (state, action) => {
      state.selectedSubRedditDisplayName = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.isLoadingPosts = true;
      state.failedToLoadPosts = false;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = false;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.isLoadingPosts = false;
      state.failedToLoadPosts = true;
    },
  },
});

// Selectors
export const selectPosts = (state) => state.posts.posts;
export const isLoadingPosts = (state) => state.posts.isLoadingPosts;
export const failedToLoadPosts = (state) => state.posts.failedToLoadPosts;
export const selectedSubReddit = (state) => state.posts.selectedSubReddit;
export const selectSubRedditDisplayName = (state) =>
  state.posts.selectedSubRedditDisplayName;
export const selectSearchTerm = (state) => state.posts.searchTerm;

// Exports
export const { setSelectedSubReddit, setSelectedSubRedditDisplayName } =
  postsSlice.actions;
export default postsSlice.reducer;
