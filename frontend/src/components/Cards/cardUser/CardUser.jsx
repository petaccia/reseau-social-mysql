import React from "react";
import "./cardUser.scss";
import { Card, Image, Badge, Col, Row } from "react-bootstrap";
import oceane from "../../../assets/users/oceane.jpg";

const CardUser = ({ online }) => {
  return (
    <Card className="cardUser border w-100  d-flex flex-column justify-content-center align-items-center border rounded-4 m-5">
      <Card.Body>
        <Row className="g-0 ">
          <Col
            xs={12}
            sm={6}
            className="d-flex flex-column justify-content-center align-items-center  w-100 "
          >
            <Image
              src={oceane}
              alt="avatar"
              className="img rounded-circle w-25 mx-2 "
            />
            <Badge bg={online ? "success" : "danger"} className="status">
              {online ? "Connecté" : "Non Connecté"}
            </Badge>
          </Col>
          <Col xs={12} sm={6} className="userInfo w-100 ">
            <Card.Title className="name text-center">Oceane</Card.Title>
            <Card.Text className="textConnected "></Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CardUser;
