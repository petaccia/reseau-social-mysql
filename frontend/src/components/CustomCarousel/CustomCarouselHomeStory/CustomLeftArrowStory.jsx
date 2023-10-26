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
        // Fond semi-transparent
        backgroundColor: "rgba(255, 255, 255, 0.5)", 
        padding: "0.5rem",
         // Bouton rond
        borderRadius: "50%",
        transition: "background-color 0.3s",
        "&:hover": {
          // Fond plus opaque au survol
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        },
      }}
    />
  );
};

export default CustomLeftArrowStory;
