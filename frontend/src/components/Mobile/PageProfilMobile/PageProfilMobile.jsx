import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import CarouselHomeStory from "../../carousel/CarouselHomeStory/CarouselHomeStory.jsx";
import ListUser from "../../Lists/listUser/ListUser.jsx";
import oceane from "../../../assets/users/oceane.jpg";
import profil from "../../../assets/illustration/profil_test.jpg";

import CardPost from "../../Cards/cardPost/CardPost.jsx";
import PostAddContext from "../../../contexts/postAddContext/PostAddContext.jsx";

const PageProfilMobile = () => {
  // Récupération des posts
  const { posts } = useContext(PostAddContext);
  // Etat pour ouvrir le formulaire de création de post
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  const toggleAddPost = () => {
    setShowCreatePostForm(!showCreatePostForm);
  };

  const users = [
    {
      id: 1,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 2,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 3,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 4,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 5,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 6,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 7,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 8,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 9,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 10,
      name: "Oceane",
      image: oceane,
    },
    {
      id: 11,
      name: "Oceane",
      image: oceane,
    },
  ];

  // Etat pour savoir si l'utilisateur est connecté ou non
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="page-profil-mobile d-flex w-100 justify-content-center flex-column align-items-center mb-5">
      <div className="w-100 d-flex justify-content-center ">
        <img className=" profil w-100" src={profil} alt="profil" />
      </div>

      <CarouselHomeStory />
      <div className="w-75  mt-5 mb-5 rounded-3 bg-dark border border-white  ">
        {/* boutons pour afficher le formulaire de création d'un post */}
        <Link
          to="/createPost"
          className="button-add-post d-flex justify-content-center align-items-center w-100 bg-dark border-0 text-white rounded-3 mt-3"
          onClick={toggleAddPost}
        >
          Ajouter un post
        </Link>
      </div>
      {/* Liste des utilisateurs */}
      {isLoggedIn && <ListUser key={users.id} users={users} />}
      {/* Card de chaque post */}
      <div className="card-post-container-mobile w-100 d-flex flex-column align-items-center justify-content-center">
        {posts.map((post) => (
          <CardPost key={post.id} post={post} showShareButton={true} />
        ))}
      </div>
    </div>
  );
};

export default PageProfilMobile;
