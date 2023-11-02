import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import HomeDesktop from "../../components/Desktop/HomeDesktop/HomeDesktop.jsx";
import HomeMobile from "../../components/Mobile/HomeMobile/HomeMobile.jsx";

const Home = () => {
const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile ? <HomeMobile /> : <HomeDesktop />;
};

export default Home;
