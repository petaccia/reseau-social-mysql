import React, { useEffect, useState } from "react";
import Styles from "./ProgressBar.module.scss";

const ProgressBar = ({ duration, success }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const increment = 100 / (duration / 10);

    const interval = setInterval(() => {
      setWidth((prev) => prev + increment);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [duration]);
  return (
    <div
      Style={{
        width: "100%",
        height: "5px",
        backgroundColor: "lightgray",
      }}
    >
      <div style={{ width: `${width}%`,
    height: "5px",
    backgroundColor: success ? "green" : "red",
    transition: `width 0.1s ease-in-out` }}>

      </div>
    </div>
  );
};

export default ProgressBar;
