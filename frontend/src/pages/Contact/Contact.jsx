import React from "react";
import { useMediaQuery } from "react-responsive";
import PageContactDesktop from "../../components/Desktop/PageContactDesktop/PageContactDesktop.jsx";
import PageContactMobile from "../../components/Mobile/PageContactMobile/PageContactMobile.jsx";

const Contact = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return isMobile ? <PageContactMobile /> : <PageContactDesktop />;
};

export default Contact;
