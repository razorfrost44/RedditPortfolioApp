import moment from "moment";
import React, { useState } from "react";
import {
  TiMessage,
  TiArrowUpThick,
  TiArrowUpOutline,
  TiArrowDownThick,
  TiArrowDownOutline,
} from "react-icons/ti";
// import { useDispatch } from "react-redux";
import { Comments } from "../comments/Comments";
// import { setSelectedPost } from "../comments/commentsSlice";

export function Post({ post }) {
  // const dispatch = useDispatch();
  const [voteValue, setVoteValue] = useState("unvoted");
  const [commentsVisible, setCommentsVisible] = useState(false);

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

  function toggleComments() {
    commentsVisible ? setCommentsVisible(false) : setCommentsVisible(true);
    // dispatch(setSelectedPost(post.id));
  }

  function renderComments() {
    if (commentsVisible) {
      return <Comments permalink={post.permalink} postId={`t3_${post.id}`} />;
    }
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
          <button
            type="button"
            className="commentsButton"
            onClick={() => toggleComments()}
          >
            <TiMessage className="messageIcon" />
          </button>
          {post.num_comments}
        </span>
      </div>
      <div className="comments">{renderComments()}</div>
    </article>
  );
}
