import React, { useState } from "react";
import Comments from "@components/comments/Comments";
import "./post.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faShareAlt,
  faHeartCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);

  const liked = false;
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilPic} alt="" />
            <div className="details">
              <Link to={`/profil/${post.userId}`}>
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">1 min ago</span>
            </div>
          </div>
          <FontAwesomeIcon icon={faEllipsis} />
        </div>
        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {liked ? (
              <FontAwesomeIcon icon={faHeart} />
            ) : (
              <FontAwesomeIcon icon={faHeartCircleCheck} />
            )}
            <p>12 Likes</p>
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <FontAwesomeIcon icon={faMessage}  className="message"/>
            <p>12 comments</p>
          </div>
          <div className="item">
            <FontAwesomeIcon icon={faShareAlt} />
          </div>
        </div>
        {commentOpen && <Comments />}
      </div>
    </div>
  );
};

export default Post;
