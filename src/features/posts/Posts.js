import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "./Post";
import {
  fetchPosts,
  selectPosts,
  isLoadingPosts,
  failedToLoadPosts,
  selectedSubReddit,
  selectSubRedditDisplayName,
} from "./postsSlice";
import "./Posts.css";

export function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postLink = useSelector(selectedSubReddit);
  const postsDisplayName = useSelector(selectSubRedditDisplayName);

  useEffect(() => {
    dispatch(fetchPosts(postLink));
  }, [dispatch, postLink]);

  if (isLoadingPosts === true) {
    return (
      <section className="posts">
        <h2>Posts Loading...</h2>
      </section>
    );
  }

  if (failedToLoadPosts === true) {
    return (
      <section>
        <h2>Posts failed to load!</h2>
      </section>
    );
  }

  return (
    <section>
      <h2>{postsDisplayName}</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
