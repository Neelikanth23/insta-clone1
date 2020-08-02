import React, { useState, useEffect } from "react";
import "./Post.css";
import { db } from "./Firebase";
import Avatar from "@material-ui/core/Avatar";
import firebase from "firebase";

function Post({ postId, user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsub;
    console.log("hello from post use effect", postId);
    if (postId) {
      unsub = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsub();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setComment("");
  };
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Neelikanth"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      <img className="post_image" src={imageUrl} alt=" " />

      <h4 className="post_text">
        <strong>{username}:</strong>
        {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <b>{comment.username}</b>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form className="post_commentbox">
          <input
            className="post_input"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            disabled={!comment}
            className="post_button"
            type="submit"
            onClick={postComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
