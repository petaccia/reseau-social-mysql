import React from "react";
import { useMediaQuery } from "react-responsive";
import PageProfilDesktop from "../../components/Desktop/PageProfilDesktop/PageProfilDesktop.jsx";
import PageProfilMobile from "../../components/Mobile/PageProfilMobile/PageProfilMobile.jsx";

const Profil = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile ? <PageProfilMobile /> : <PageProfilDesktop />;
};
export default Profil;
