import React from "react";
import "react-multi-carousel/lib/styles.css";
import CustomLeftArrowComment from "../../CustomCarousel/CustomCarouselComment/CustomLeftArrowComment.jsx";
import CustomRightArrowComment from "../../CustomCarousel/CustomCarouselComment/CustomRightArrowComment.jsx";
import CardComment from "../../Cards/cardComment/CardComment.jsx";
import CustomCarousel from "../Carousel.jsx";

const CarouselComment = ({ comments }) => {
  // Créer un tableau unique des utilisateurs
  const users = comments.reduce((unique, comment) => {
    return unique.some((user) => user.name === comment.user.name)
      ? unique
      : [...unique, comment.user];
  }, []);

  return (
    <CustomCarousel
      customLeftArrow={<CustomLeftArrowComment />}
      customRightArrow={<CustomRightArrowComment />}
    >
      {users.map((user, index) => {
        const userComments = comments.filter(
          (comment) => comment.user.name === user.name
        );
        return (
          <CardComment
            key={index}
            user={user}
            content={user.content}
            likes={user.likes}
            liked={user.liked}
            commentList={userComments}
          />
        );
      })}
    </CustomCarousel>
  );
};

export default CarouselComment;
