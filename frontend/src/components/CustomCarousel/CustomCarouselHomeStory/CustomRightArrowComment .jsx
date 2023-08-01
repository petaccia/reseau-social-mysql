import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CustomRightArrowStory = ({ onClick, ...rest }) => {
  return (
    <FaChevronRight
      {...rest}
      onClick={() => onClick()}
      style={{
        position: "absolute",
        top: "50%",
        right: "0",
        transform: "translateY(-50%)",
        fontSize: "2rem",
        color: "#ff2afb",
        cursor: "pointer",
        zIndex: "1",
      }}
    />
  );
};

export default CustomRightArrowStory;
