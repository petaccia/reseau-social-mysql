import React from "react";
import { Card, Image } from "react-bootstrap";
import "./CardStory.scss";
import user from "../../../assets/users/aurore.jpg";
import {
  CardContainerStory,
  CardImg,
  CardTitle,
} from "@components/Accessories/styledCardStory/styledCardStory";

// Fonction pour écrire la 1ère lettre d'un nom en majuscule
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const CardStory = ({ image, date, author, title }) => {
  return (
    <CardContainerStory>
      <Card className="card-story">
        {" "}
        {/* Ajoutez la classe card-story */}
        <Card.Header className="card-header">
          <Image className="imgUser" src={user} alt={author} />
          <CardTitle className="date">{date}</CardTitle>
        </Card.Header>
        <CardImg className="card-img-overlay mt-3 w-100 h-50 ">
          <Image
            src={image}
            className="card-img-top w-100 h-100 "
            alt="avatar"
          />
        </CardImg>
        <Card.Body className="card-body w-100 h-50">
          <CardTitle className="author   ">
            {capitalizeFirstLetter(author)}
          </CardTitle>
       
          <CardTitle className="title ">{title}</CardTitle>
        </Card.Body>
      </Card>
    </CardContainerStory>
  );
};

export default CardStory;
