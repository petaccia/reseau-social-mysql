import React from "react";
import "../../styles/buttons.scss";

function Button(props) {
  return (
    <button
      className="button"
      type={props.type || "button" }
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
