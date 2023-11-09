import React from "react";

// Composant pour mobile pour la connexion
import ConnexionMobile from "../../components/Mobile/inscription/ConnexionMobile.jsx";

// Composant pour desktop pour la connexion
import ConnexionDesktop from "../../components/Desktop/inscription/ConnexionDesktop.jsx";

const Connexion = () => {
  return (
    <div>
      <div className="d-md-none">
        {" "}
        {/* Affiche ConnexionMobile sur les écrans de petite taille */}
        <ConnexionMobile />
      </div>
      <div className="d-none d-md-block">
        {" "}
        {/* Affiche ConnexionDesktop sur les écrans de grande taille */}
        <ConnexionDesktop />
      </div>
    </div>
  );
};

export default Connexion;
