import React from "react";
import { Card, Image } from "react-bootstrap";

// Fonction pour écrire la 1ère lettre d'un nom en majuscule
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CardStory = ({ image, date, author }) => {
  return (
    <Card
      style={{
        width: "15rem",
        margin: "2.5rem",
        borderRadius: "10px",
        border: "1px solid #000",
        transition: "all 0.5s",
        cursor: "pointer",
        boxShadow: "0px 10px 10px 3px #666565",
        padding: "0.5rem 0.5rem 0.5rem 0.5rem",
      }}
    >
      <Image
        src={image}
        className="card-img-top"
        alt="avatar"
        style={{ height: "10rem", objectFit: "cover" }} // Ajustez la hauteur en fonction de vos besoins
      />
      <Card.Body>
        <Card.Title>{capitalizeFirstLetter(author)}</Card.Title>
        <Card.Text>{date}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardStory;
