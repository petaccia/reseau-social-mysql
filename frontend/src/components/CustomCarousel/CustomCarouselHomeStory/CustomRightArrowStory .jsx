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
        backgroundColor: "rgba(255, 255, 255, 0.5)", // Fond semi-transparent
        padding: "0.5rem",
        borderRadius: "50%", // Bouton rond
        transition: "background-color 0.3s",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Fond plus opaque au survol
        },
      }}
    />
  );
};

export default CustomRightArrowStory;
