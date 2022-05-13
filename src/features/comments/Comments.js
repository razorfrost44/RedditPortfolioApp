import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./Comment";
import "./Comments.css";
import { fetchCommentsForPost, selectCommentsById } from "./commentsSlice";
import { v4 as uuidv4 } from "uuid";

export function Comments({ permalink, postId }) {
  const dispatch = useDispatch();
  const link = permalink;
  // const comments = useSelector(selectComments)[postId];
  const comments = useSelector((state) => selectCommentsById(state, postId));

  useEffect(() => {
    dispatch(fetchCommentsForPost(link));
  }, [dispatch, link]);

  return (
    <section>
      <h2>Comments</h2>
      <ul>
        {comments ? (
          comments.map((comment) => (
            <li key={`${comment.id} - ${uuidv4()}`}>
              <Comment comment={comment} />
            </li>
          ))
        ) : (
          <p>No Comments</p>
        )}
      </ul>
    </section>
  );
}
