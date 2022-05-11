import moment from "moment";
import React, { useState } from "react";
import {
  TiMessage,
  TiArrowUpThick,
  TiArrowUpOutline,
  TiArrowDownThick,
  TiArrowDownOutline,
} from "react-icons/ti";

export function Post({ post }) {
  const [voteValue, setVoteValue] = useState("unvoted");

  function computeVotedValue(vote) {
    if (vote === voteValue) {
      setVoteValue("unvoted");
    } else if (vote === "up") {
      setVoteValue("up");
    } else {
      setVoteValue("down");
    }
  }

  function renderUpVote() {
    if (voteValue === "up") {
      return <TiArrowUpThick className="messageIcon" />;
    }
    return <TiArrowUpOutline className="messageIcon" />;
  }

  function renderDownVote() {
    if (voteValue === "down") {
      return <TiArrowDownThick className="messageIcon" />;
    }
    return <TiArrowDownOutline className="messageIcon" />;
  }

  function convertTime(utc) {
    return moment.unix(utc).fromNow();
  }

  function computeVoteType() {
    return voteValue === "up" ? "green" : voteValue === "down" ? "red" : "";
  }

  return (
    <article className="post">
      <p>{`${post.title}`}</p>
      <img src={post.url} alt="" />
      <div className="postDetails">
        <span className="author">{post.author}</span>
        <span className="createdTime">{convertTime(post.created_utc)}</span>
        <span className="voteDetails">
          <button
            type="button"
            className={`upVote ${voteValue === "up" && "active"}`}
            onClick={() => computeVotedValue("up")}
          >
            {renderUpVote()}
          </button>
          <span className={`numUps ${computeVoteType()}`}>{post.ups}</span>
          <button
            type="button"
            className={`downVote ${voteValue === "down" && "active"}`}
            onClick={() => computeVotedValue("down")}
          >
            {renderDownVote()}
          </button>
        </span>
        <span className="numComments">
          <button type="button" className="commentsButton">
            <TiMessage className="messageIcon" />
          </button>
          {post.num_comments}
        </span>
      </div>
    </article>
  );
}
