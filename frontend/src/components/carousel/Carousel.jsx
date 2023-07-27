import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./carousel.module.scss";

const CustomCarousel = ({ children, customRightArrow, customLeftArrow }) => {

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      className={styles.carousel}
      customRightArrow={customRightArrow}
      customLeftArrow={customLeftArrow}
    >
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
