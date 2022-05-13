import { configureStore } from "@reduxjs/toolkit";
import subRedditsReducer from "../features/subreddits/subRedditsSlice";
import postsReducer from "../features/posts/postsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    subreddits: subRedditsReducer,
    posts: postsReducer,
    comments: commentsReducer,
  },
});
