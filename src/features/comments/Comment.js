import React from "react";
import moment from "moment";

export function Comment({ comment }) {
  function convertTime(utc) {
    return moment.unix(utc).fromNow();
  }

  return (
    <article className="comment">
      <div className="details">
        <p>{comment.author}</p>
        <p>{convertTime(comment.created_utc)}</p>
      </div>
      <p>{comment.body}</p>
    </article>
  );
}
