import React from "react";
import Logo from "../../Accessories/Logo/Logo.jsx";
import CarouselHomeStory from "../../carousel/CarouselHomeStory/CarouselHomeStory.jsx";

const HomeMobile = () => {
  return (
    <div className="home-mobile d-flex w-100 justify-content-center flex-column align-items-center ">
      <div className="logo-container d-flex ">
        <Logo className="img" />
      </div>
      <CarouselHomeStory />
    </div>
  );
};

export default HomeMobile;
