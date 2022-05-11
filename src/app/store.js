import { configureStore } from "@reduxjs/toolkit";
import subRedditsReducer from "../features/subreddits/subRedditsSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    subreddits: subRedditsReducer,
    posts: postsReducer,
  },
});
