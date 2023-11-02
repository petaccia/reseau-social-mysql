import React, { useState } from "react";
import Logo from "../../Accessories/Logo/Logo.jsx";
import CarouselHomeStory from "../../carousel/CarouselHomeStory/CarouselHomeStory.jsx";
import ListUser from "../../Lists/listUser/ListUser.jsx";
import oceane from "../../../assets/users/oceane.jpg";

const HomeMobile = () => {

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
    <div className="home-mobile d-flex w-100 justify-content-center flex-column align-items-center ">
      <div className="logo-container d-flex ">
        <Logo className="img" />
      </div>
      <CarouselHomeStory />
      {isLoggedIn && <ListUser users={users} />}
    </div>
  );
};

export default HomeMobile;
