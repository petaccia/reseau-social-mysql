import styled from "styled-components";
import { Card } from "react-bootstrap";

// Créer un composant titre reactif avec Styled-Components
export const CardTitlePost = styled(Card.Title)`
  font-size: 1rem;

  @media screen and (min-width: 769px) {
    font-size: 2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

// Créer un composant text reactif avec Styled-Components
export const CardTextPost = styled(Card.Text)`
  font-size: 1rem;

  @media screen and (min-width: 769px) {
    font-size: 1.5rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

// Créer un composant card reactif avec Styled-Components
export const CardContainerPost = styled(Card)`
@media screen and (min-width: 768px) and (max-width: 768px) {
     width: 30rem; /* Largeur pour les écrans plus petits */
   margin-top: 3rem;
   margin-left: 15rem;
  }

  @media screen and (min-width: 981px) {
    width: 40rem; /* Largeur pour les écrans plus petits */
    margin-top: 3rem;
  }

  @media screen and (max-width: 767px) {
    height: 100%; /* Hauteur pour les écrans plus petits */
    width: 100%; /* Largeur pour les écrans plus petits */
    margin-top: 3rem;
  }
`;
