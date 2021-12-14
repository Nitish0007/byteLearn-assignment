import React from "react";

import "./Button.css";

function Button(props) {
  return (
    <button className="button" {...props}>
      {props.text}
    </button>
  );
}

export default Button;
