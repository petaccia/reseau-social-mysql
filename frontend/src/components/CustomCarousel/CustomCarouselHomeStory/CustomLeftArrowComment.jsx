import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const CustomLeftArrowStory = ({ onClick, ...rest }) => {
  return (
    <FaChevronLeft
      {...rest}
      onClick={() => onClick()}
      style={{
        position: "absolute",
        top: "50%",
        left: "0",
        transform: "translateY(-50%)",
        fontSize: "2rem",
        color: "#ff2afb",
        cursor: "pointer",
        zIndex: "1",
      }}
    />
  );
};

export default CustomLeftArrowStory;
