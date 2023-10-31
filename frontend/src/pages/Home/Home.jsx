import React from "react";
import HomeDesktop from "../../components/Desktop/HomeDesktop/HomeDesktop.jsx";
import HomeMobile from "../../components/Mobile/HomeMobile/HomeMobile.jsx";

const Home = () => {
  // Créer une condition si la page est à afficher en mobile ou desktop
  const isMobile = window.innerWidth < 768;
  return <div>{isMobile ? <HomeMobile /> : <HomeDesktop />}</div>;
};

export default Home;
