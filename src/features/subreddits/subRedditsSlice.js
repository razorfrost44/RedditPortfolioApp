import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/redditApi";

const initialState = {
  subreddits: [],
  isLoadingSubReddits: false,
  failedToLoadSubreddits: false,
};

export const fetchSubReddits = createAsyncThunk(
  "subreddits/fetchAllSubReddits",
  async (thunkAPI) => {
    const response = await Reddit.getSubReddits();
    return response;
  }
);

const subRedditsSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSubReddits.pending]: (state) => {
      state.isLoadingSubReddits = true;
      state.failedToLoadSubreddits = false;
    },
    [fetchSubReddits.fulfilled]: (state, action) => {
      state.isLoadingSubReddits = false;
      state.failedToLoadSubreddits = false;
      state.subreddits = action.payload;
    },
    [fetchSubReddits.rejected]: (state) => {
      state.isLoadingSubReddits = false;
      state.failedToLoadSubreddits = true;
    },
  },
});

// Selectors
export const selectSubReddits = (state) => state.subreddits.subreddits;
export const isLoadingSubReddits = (state) =>
  state.subreddits.isLoadingSubReddits;
export const failedToLoadSubReddits = (state) =>
  state.subreddits.failedToLoadSubReddits;

// Exports
// export const {} = subRedditsSlice.actions;
export default subRedditsSlice.reducer;
