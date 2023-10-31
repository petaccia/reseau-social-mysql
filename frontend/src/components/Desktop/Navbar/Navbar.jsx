import React from "react";
import {
  Navbar,
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { FcSearch } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillEnvelopeFill } from "react-icons/bs";
import userImage from "../../../assets/users/aurore.jpg";
import "./Navbar.scss";

const NavbarOriginal = ({ famille }) => {
  return (
    <Navbar className="navbar d-none d-md-block" expand="lg">
      <Container fluid className="">
        <Row className="navbarContent">
          <Col md={3} xs={12}>
            <div className="leftContainer">
              <Navbar.Brand className="familyName">
                {famille}Petaccia
              </Navbar.Brand>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="centerContainer">
              <InputGroup className="searchContainer">
                <FcSearch className="searchIcon" />
                <FormControl
                  type="text"
                  placeholder="Taper votre recherche"
                  className="searchInput"
                />
                <Button variant="outline-info searchButton">Rechercher</Button>
              </InputGroup>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="rightContainer">
              <div className="navbarIcon">
                <IoMdNotificationsOutline className="icon" />
                <BsFillEnvelopeFill className="icon" />
              </div>
              <div className="userAvatarContainer">
                <img
                  src={userImage}
                  alt="profil de l'utilisateur"
                  className="imgAvatar"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavbarOriginal;
