import React from "react";
import { Card, Image } from "react-bootstrap";
import "./CardStory.scss";
import user from "../../../assets/users/aurore.jpg";

// Fonction pour écrire la 1ère lettre d'un nom en majuscule
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CardStory = ({ image, date, author, title }) => {
  return (
    <Card className="card-story">
      <Card.Header className="card-header">
        <img className="imgUser" src={user} alt={author} />
        <Card.Text className="date">{date}</Card.Text>
      </Card.Header>
      <Image
        src={image}
        className="card-img-top"
        alt="avatar"
        style={{ height: "10rem", objectFit: "cover" }}
      />
      <Card.Body className="card-body">
        <Card.Title className="author">
          {capitalizeFirstLetter(author)}
        </Card.Title>
        <Card.Title className="title">{title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CardStory;
