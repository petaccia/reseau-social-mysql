import React from "react";
import "./comments.scss";
import nicolas from "@assets/comments/nicolas.jpg";
// import aurore from "@assets/comments/aurore.jpg"

const Comments = () => {
  const comments = [
    {
      id: 1,
      desc: "Lorem ipsum dolor sit, amet consectetur  adipisicing             elit. Obcaecati nemo cum tempore error a quod veniam cupiditate quibusdam minus in.",
      name: "Nicolas Doe",
      userId: 1,
      profilePict:
        "https://pixabay.com/get/g2341efde849d403337e168e78848d3084977f3279c14b0b202302716403f0db2507eaacd2a82c682934c5c74a8d60ae03a7361cdbb5b36289940217dfdd6cc265909ac99908bb4953e524aff4742703c_1920.jpg",
    },
    {
      id: 2,
      desc: "Lorem ipsum dolor sit, amet consectetur  adipisicing             elit. Obcaecati nemo cum tempore error a quod veniam cupiditate quibusdam minus in.",
      name: "Aurore Doe",
      userId: 2,
      profilePict:
        "https://pixabay.com/get/g2103e7badf26fb3b2ecbc46c204deaa327cab7cad84d590b657d91a80df95b6a2539c95f7a4a3cb6f6adcd0f8057274805de128eb897ff660cb6fd3dbc957a6274248bdcc36ae0e81543d59aa21a97ee_1920.jpg",
    },
  ];
  return (
    <div className="comments">
      <div className="write">
        <img src={nicolas} />
        <input type="text" placeholder="write a comment" />
        <button>Send</button>
      </div>

      {comments.map((comment) => (
        <div className="comment">
          <div className="infoComment">
            <img src={comment.profilePict} alt="" />
            <span className="name">{comment.name}</span>
          </div>
          <div className="desc">
            <p>{comment.desc}</p>
          <span className="date">1 hour ago</span>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Comments;
