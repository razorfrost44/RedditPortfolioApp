import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Post } from "./Post";
import {
  fetchPosts,
  selectFilteredPosts,
  isLoadingPosts,
  failedToLoadPosts,
  selectedSubReddit,
  selectSubRedditDisplayName,
  selectSearchTerm,
} from "./postsSlice";
import "./Posts.css";

export function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector(selectFilteredPosts);
  const postLink = useSelector(selectedSubReddit);
  const postsDisplayName = useSelector(selectSubRedditDisplayName);
  const searchTerm = useSelector(selectSearchTerm);

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

  function computeDisplayTitle() {
    let displayTitle = postsDisplayName;
    if (searchTerm) {
      displayTitle += ` - ${searchTerm}`;
    }
    return displayTitle.slice(0, 32);
  }

  return (
    <section>
      <h2>{computeDisplayTitle()}</h2>
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
