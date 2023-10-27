import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcSearch } from "react-icons/fc";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillEnvelopeFill } from "react-icons/bs";
import "./Navbar.scss";
import {
  Navbar,
  Container,
  Nav,
  InputGroup,
  FormControl,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import UserContext from "../../contexts/UserContext/UserContext.jsx";
import MessageContext from "../../contexts/MessageContext/MessageContext.jsx";

const NavbarOriginal = ({ famille }) => {
  const [searchText, setSearchText] = useState("");

  // Context pour récupérer le user connecté
  const { authUser } = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);

  // Context pour récupérer les messages de la BDD
  const { messages, getMessages } = useContext(MessageContext);

  useEffect(() => {
    getMessages();
  }, []);

  // Calculer le nombre de messages non lus
  const unreadMessagesCount = messages.filter(
    (message) =>
      message.receiverId === authUser.id &&
      (message.status === false || message.statusRead === "unread")
  ).length;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const profileTooltip = <Tooltip id="profile-tooltip">Profil</Tooltip>;

  const messageTooltip = <Tooltip id="message-tooltip">Messages</Tooltip>;

  const notificationTooltip = (
    <Tooltip id="notification-tooltip">Notifications</Tooltip>
  );

  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid className=" navContainer ">
        <Navbar.Brand className="familyContainer d-flex justify-content-center align-items-center">
          <span className="familyName ">{famille}Petaccia</span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <InputGroup className="searchContainer ms-auto">
            <FcSearch alt="icon de recherche" className="searchIcon" />
            <FormControl
              type="search"
              value={searchText}
              onChange={handleSearch}
              placeholder="Taper votre recherche"
              className="searchInput"
            />
            <Button className="searchButton">Rechercher</Button>
          </InputGroup>
          <Nav className="ms-auto">
            <OverlayTrigger overlay={notificationTooltip} placement="bottom">
              <Nav.Link to="/notification" as={Link} className="link">
                <IoMdNotificationsOutline
                  className="icon"
                  size={25}
                  alt="icon de notification"
                />
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={messageTooltip} placement="bottom">
              <Nav.Link
                to="/message?sort=unread"
                as={Link}
                className="link"
                onClick={() => console.info("click message")}
              >
                <BsFillEnvelopeFill className="icon" size={25} />
                {unreadMessagesCount > 0 && (
                  <span className="bubble">{unreadMessagesCount}</span>
                )}
              </Nav.Link>
            </OverlayTrigger>
            <OverlayTrigger overlay={profileTooltip} placement="bottom">
              <Nav.Link to="/profilUser" as={Link} className="link">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/${
                    currentUser.profilePicture
                  }`}
                  alt="avatar"
                  className="imgUser rounded-circle me-5"
                />
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarOriginal;
