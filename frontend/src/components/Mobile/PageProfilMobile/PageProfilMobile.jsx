import React, { useState } from "react";
import CarouselHomeStory from "../../carousel/CarouselHomeStory/CarouselHomeStory.jsx";
import ListUser from "../../Lists/listUser/ListUser.jsx";
import oceane from "../../../assets/users/oceane.jpg";
import profil from "../../../assets/illustration/profil_test.jpg";

import cheval from "../../../assets/post/cheval.jpg";
import requin from "../../../assets/post/requin.jpg";
import maldive from "../../../assets/post/maldives.jpg";
import noel from "../../../assets/post/noel.jpg";
import CardPost from "../../Cards/cardPost/CardPost.jsx";
import CreatePostForm from "../../Post/CreatePostForm.jsx";

const PageProfilMobile = () => {
  const [posts, setPosts] = useState([]);
  const [showCreatePostForm, setShowCreatePostForm] = useState(false);

  const addNewPost = (newPost) => {
    setPosts([...posts, newPost]);
    setShowCreatePostForm(false);
  };

  const toggleAddPost = () => {
    setShowCreatePostForm(!showCreatePostForm);
  };

  const postes = [
    {
      id: 1,
      title: "balade en cheval",
      content: "la balade en cheval au pays des chevaux",
      image: cheval,
      user: "Oceane",
      date: "12/12/2022",
    },
    {
      id: 2,
      title: "balade en mer",
      content: "la balade en mer au pays des requins",
      image: requin,
      user: "Oceane",
      date: "12/12/2022",
    },
    {
      id: 3,
      title: "Les vacances aux Maldives",
      content: "Super vacances aux Maldives",
      image: maldive,
      user: "Oceane",
      date: "12/12/2022",
    },
    {
      id: 4,
      title: "Joyeux Noël à tous!",
      content: "C'est bon c'est parfait le Noël en famille",
      image: noel,
      user: "Oceane",
      date: "12/12/2022",
    },
  ];

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
        <button
          className="button-add-post d-flex justify-content-center align-items-center w-100 bg-dark border-0 text-white rounded-3 mt-3"
          onClick={toggleAddPost}
        >
          {showCreatePostForm ? (
            <p className="text-white">Annuler</p>
          ) : (
            <p className="text-white  ">Ajouter un post</p>
          )}
        </button>

        {showCreatePostForm && <CreatePostForm onAddpost={addNewPost} />}
      </div>
      {isLoggedIn && <ListUser users={users} />}
      <div className="card-post-container-mobile w-100 d-flex flex-column align-items-center justify-content-center">
        {postes.map((post) => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PageProfilMobile;
