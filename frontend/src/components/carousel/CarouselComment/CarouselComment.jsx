import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CardComment from "@components/Cards/cardComment/CardComment";
import CustomCarousel from "../Carousel";

const CarouselComment = ({ comments }) => {
  // Créer un tableau unique des utilisateurs
  const users = comments.reduce((unique, comment) => {
    return unique.some((user) => user.name === comment.user.name)
      ? unique
      : [...unique, comment.user];
  }, []);

  console.log("-------------->users", users);

  return (
    <CustomCarousel>
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
