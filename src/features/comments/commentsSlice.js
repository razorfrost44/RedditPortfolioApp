import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../api/redditApi";

const initialState = {
  comments: {},
  isLoadingComments: false,
  failedToLoadComments: false,
};

export const fetchCommentsForPost = createAsyncThunk(
  "comments/fetchCommentsForPost",
  async (permalink, thunkAPI) => {
    const response = await Reddit.getPostComments(permalink);
    return response;
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCommentsForPost.pending]: (state) => {
      state.isLoadingComments = true;
      state.failedToLoadComments = false;
    },
    [fetchCommentsForPost.fulfilled]: (state, action) => {
      state.isLoadingComments = false;
      state.failedToLoadComments = false;
      state.comments = {
        ...state.comments,
        [action.payload[0].parent_id]: action.payload,
      };
    },
    [fetchCommentsForPost.rejected]: (state) => {
      state.isLoadingComments = false;
      state.failedToLoadComments = true;
    },
  },
});

// Selectors Basic
export const selectComments = (state) => state.comments.comments;
export const isLoadingComments = (state) => state.comments.isLoadingComments;
export const failedToLoadComments = (state) => state.failedToLoadComments;
export const selectCommentsById = (state, id) => state.comments.comments[id];

// Selectors createSelector

// works but not as intended
// export const selectFilteredComments = createSelector(
//   [selectComments, selectedPost],
//   (comments, id) => {
//     if (selectedPost) {
//       return comments[id];
//     }
//     return comments["missed"];
//   }
// );

// Exports
// export const { setSelectedPost } = commentsSlice.actions;
export default commentsSlice.reducer;
