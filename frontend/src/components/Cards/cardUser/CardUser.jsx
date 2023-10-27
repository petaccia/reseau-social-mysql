import React from "react";
import "./cardUser.scss";
import { Card, Image, Badge, Col, Row } from "react-bootstrap";
import oceane from "../../../assets/users/oceane.jpg";

const CardUser = ({ online }) => {
  return (
    <Card className="cardUser">
      <Row>
        <Col xs={12}>
          <div className="cardImg">
            <Image src={oceane} alt="avatar" className="img rounded-circle" />
            <Badge bg={online ? "success" : "danger"} className="status">
              {online ? "Connecté" : "Non Connecté"}
            </Badge>
          </div>
          <div className="userinfo">
            <Card.Body>
              <Card.Title className="name ">Oceane</Card.Title>
              <Card.Text className="textConnected"></Card.Text>
            </Card.Body>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default CardUser;
