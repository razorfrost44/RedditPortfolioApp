import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import subRedditsReducer from "../features/subreddits/subRedditsSlice";
import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    subreddits: subRedditsReducer,
    posts: postsReducer,
  },
});
