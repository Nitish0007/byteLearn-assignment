import React from "react";
import Button from "../Button/Button";
import "./Post.css";

function Post(props) {
  return (
    <div className="post">
      <p>{props?.details?.title}</p>
      <Button
        text={`View Post`}
        onClick={() => props.viewDetails(props.details.id)}
      />
      <div className="buttonContainer">
        <Button
          text={`Edit`}
          onClick={() => props.editPost(props.details.id)}
        />
        <Button
          text={`Delete`}
          onClick={() => props.deletePost(props.details.id)}
        />
      </div>
    </div>
  );
}

export default Post;
