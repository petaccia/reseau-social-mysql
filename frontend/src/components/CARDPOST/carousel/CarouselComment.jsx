import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardComment from "../cardComment/CardComment";
import styles from "./carouselComment.module.scss";
import CustomRightArrow from "./customCarousel/arrowRight/CustomRightArrow";
import CustomLeftArrow from "./customCarousel/arrowLeft/CustomLeftArrow";

const CarouselComment = ({ comments }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
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

  // Créer un tableau unique des utilisateurs
  const users = comments.reduce((unique, comment) => {
    return unique.some((user) => user.name === comment.user.name)
      ? unique
      : [...unique, comment.user];
  }, []);

  console.log("-------------->users", users);

  return (
    <Carousel
      responsive={responsive}
      className={styles.carousel}
      customRightArrow={<CustomRightArrow />}
      customLeftArrow={<CustomLeftArrow />}
    >
      {users.map((user, index) => {
        const userComments = comments.filter(
          (comment) => comment.user.name === user.name
        );
        return (
          <CardComment
            key={index}
            user={user}
            // content={user.content}
            likes={user.likes}
            liked={user.liked}
            commentList={userComments}
          />
        );
      })}
    </Carousel>
  );
};

export default CarouselComment;
