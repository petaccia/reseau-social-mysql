import React from "react";
import ListUser from "../../Lists/listUser/ListUser.jsx";
import "./PageProfilDesktop.scss";
import CardPost from "../../Cards/cardPost/CardPost.jsx";

import cheval from "../../../assets/post/cheval.jpg";
import requin from "../../../assets/post/requin.jpg";
import maldive from "../../../assets/post/maldives.jpg";
import noel from "../../../assets/post/noel.jpg";
import profil from "../../../assets/profil/profil_test.jpg";

const PageProfilDesktop = () => {
  const posts = [
    { id: 1, title: "balade en cheval", content: "Content 1", image: cheval },
    { id: 2, title: "Post 2", content: "Content 2", image: requin },
    { id: 3, title: "Post 3", content: "Content 3", image: maldive },
    { id: 4, title: "Post 4", content: "Content 4", image: noel },
  ];

  const users = [
    {
      id: 1,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 2,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 3,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 4,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 5,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 6,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 7,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 8,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 9,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 10,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
    {
      id: 11,
      name: "Oceane",
      image: "https://picsum.photos/200/300",
    },
  ];

  return (
    <div className="pageProfilDesktop">
      <div className="posts">
        <div className="profil">
          <img src={profil} alt="avatar" className="img" />
          <h1 className="profileName">Oceane</h1>
        </div>
        {posts.map((post) => (
          <CardPost key={post.id} post={post} showShareButton={true} />
        ))}
      </div>
      <div className="users">
        <ListUser users={users} />
      </div>
    </div>
  );
};

export default PageProfilDesktop;
