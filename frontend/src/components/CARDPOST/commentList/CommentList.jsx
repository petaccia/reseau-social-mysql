import React from "react";
import CarouselComment from "../carousel/CarouselComment";
import styles from "./CommentList.module.scss";

const CommentList = ({ comments }) => {
  return (
    <div className={styles.commentList}>
      <CarouselComment comments={comments} />
    </div>
  );
};

export default CommentList;
