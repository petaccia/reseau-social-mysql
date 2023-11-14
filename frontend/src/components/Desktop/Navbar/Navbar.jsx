import React, { useContext } from "react";
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
import { Link } from "react-router-dom";
import "./Navbar.scss";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const NavbarOriginal = ({ famille }) => {
  const { currentUser } = useContext(UserContext);
  console.log("currentUser in NavbarOriginal", currentUser.profilePicture);

  return (
    <Navbar className="navbar d-none d-md-block position-fixed z-3" expand="lg">
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
              <Link to="/profilUser" className="userAvatarContainer">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    currentUser.profilePicture
                  }`}
                  alt="profil de l'utilisateur"
                  className="imgAvatar"
                />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default NavbarOriginal;
