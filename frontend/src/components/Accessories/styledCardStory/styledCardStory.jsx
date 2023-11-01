import styled from "styled-components";
import { Card } from "react-bootstrap";

// Créer un composant text reactif avec Styled-Components
export const CardTitle = styled(Card.Title)`
  font-size: 1rem;

  @media screen and (min-width: 769px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

// Créer un composant card reactif avec Styled-Components
export const CardContainerStory = styled(Card)`
@
  @media screen and (max-width: 868px) {
    height: 100%; /* Hauteur pour les écrans plus petits */
    width: 100%; /* Largeur pour les écrans plus petits */
  }

  @media screen and (max-width: 768px) {
    height: 100%; /* Hauteur pour les écrans plus petits */
    width: 100%; /* Largeur pour les écrans plus petits */
  }

  @media screen and (max-width: 576px) {
    height: 100%; /* Hauteur pour les écrans encore plus petits */
    width: 100%; /* Largeur pour les écrans encore plus petits */
  }
`;

// Définir la hauteur et la largeur pour l'image de card story:
export const CardImg = styled(Card.ImgOverlay)`
  @media screen and (max-width: 868px) {
    height: 100%; /* Hauteur pour les écrans plus petits */
    width: 100%; /* Largeur pour les écrans plus petits */
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    object-fit: cover;
  }
`;

