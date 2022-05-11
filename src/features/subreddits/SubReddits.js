import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubReddit } from "./SubReddit";
import {
  fetchSubReddits,
  selectSubReddits,
  isLoadingSubReddits,
  failedToLoadSubReddits,
} from "./subRedditsSlice";
import {
  setSelectedSubReddit,
  setSelectedSubRedditDisplayName,
  selectSubRedditDisplayName,
} from "../posts/postsSlice";
import "./SubReddits.css";

export function SubReddits() {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubReddits);
  const selectedDisplayName = useSelector(selectSubRedditDisplayName);

  useEffect(() => {
    dispatch(fetchSubReddits());
  }, [dispatch]);

  if (isLoadingSubReddits === true) {
    return (
      <section>
        <h2>SubReddits Loading...</h2>
      </section>
    );
  }

  if (failedToLoadSubReddits === true) {
    return (
      <section>
        <h2>SubReddits failed to load!</h2>
      </section>
    );
  }

  function handleButtonClick(subreddit) {
    dispatch(setSelectedSubReddit(subreddit.url));
    dispatch(setSelectedSubRedditDisplayName(subreddit.display_name));
  }

  function getClassNameForSubreddit(subreddit) {
    return selectedDisplayName === subreddit.display_name
      ? "selected-subreddit"
      : "subreddit";
  }

  return (
    <section>
      <h2>SubReddits</h2>
      <ul>
        {subreddits.map((subreddit) => (
          <li key={subreddit.id}>
            <SubReddit
              className={getClassNameForSubreddit(subreddit)}
              displayName={subreddit.display_name}
              handleClick={() => handleButtonClick(subreddit)}
              icon={
                subreddit.icon_img ||
                `https://api.adorable.io/avatars/25/${subreddit.display_name}`
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
