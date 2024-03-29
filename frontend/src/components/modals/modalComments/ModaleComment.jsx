import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaRegCommentDots, FaThumbsUp } from "react-icons/fa";
import oceane from "../../../assets/users/oceane.jpg";
import nicolas from "../../../assets/users/nicolas.jpg";
import laure from "../../../assets/users/laure.jpg";

import "./ModaleComment.scss";
import ReplyModal from "../ReplyModal/ReplyModal.jsx";
import UserContext from "../../../contexts/UserContext/UserContext.jsx";

const CommentsModal = ({ handleClose }) => {
  // récupérer dans le context user de l'utilisateur
  const { currentUser } = useContext(UserContext);
  console.log("currentUser in CommentsModal", currentUser);

  // Suivre les likes pour chaque commentaire
  const [commentLikes, setCommentLikes] = useState({});

  // Etat pour ouvir la modale de reponse au commentaire
  const [isReplyOpen, setIsReplyOpen] = useState(false);

  const commentUsers = [
    {
      id: 1,
      image: oceane,
      name: "Oceane",
      content: "la balade en cheval au pays des chevaux",
      date: "12/12/2022",
    },
    {
      id: 2,
      image: nicolas,
      name: "Oceane",
      content: "la balade en cheval au pays des chevaux",
      date: "12/12/2022",
    },
    {
      id: 3,
      image: laure,
      name: "Oceane",
      content: "la balade en cheval au pays des chevaux",
      date: "12/12/2022",
    },
    {
      id: 4,
      image: oceane,
      name: "Oceane",
      content: "la balade en cheval au pays des chevaux",
      date: "12/12/2022",
    },
    {
      id: 5,
      image: oceane,
      name: "Oceane",
      content: "la balade en cheval au pays des chevaux",
      date: "12/12/2022",
    },
    {
      id: 6,
      image: oceane,
      name: "Oceane",
      content: "la balade en cheval au pays des chevaux",
      date: "12/12/2022",
    },
  ];

  // fonction pour incrementer le nombre de like à chaque commentaire
  const handleLike = (id) => {
    setCommentLikes((prevCommentLikes) => ({
      // copie des likes existants
      ...prevCommentLikes,
      // ajout du like à l'id correspondant
      [id]: (prevCommentLikes[id] || 0) + 1,
    }));
  };
  // gestionnaire pour click sur lr bouton répondre
  const handleReply = (id) => {
    setIsReplyOpen(true);
    // Add your reply logic here
  };

  return (
    <Modal
      show={true}
      onHide={handleClose}
      className=" modal-commentUsers w-100 h-75 top-50 start-50 translate-middle mt-5 overflow-auto"
    >
      <Modal.Header
        closeButton
        className="modal-header  bg-primary-subtle d-flex align-items-center border border-primary "
      >
        <Modal.Title className="modal-title fs-5">Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        {commentUsers.map((comment, id) => (
          <div
            key={comment.id}
            className="comment-modal d-flex flex-column border border-primary rounded-4 p-2 mb-4 mt-2"
            // style={{ boxShadow: "0px 10px 20px 0px #2aa6ff" }}
          >
            <div className=" containerInfoUser d-flex align-items-center justify-content-between bg-primary-subtle border border-primary mt-3 mb-3">
              <div className=" container-imageUser-comment border rounded w-25 d-flex align-items-center justify-content-center">
                <div
                  className="image-modal-commentUser rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundImage: `url(${comment.image})`,
                  }}
                ></div>
                <div />
                <h5 className="name-modal-commentUser text-primary fs-6 ms-2">
                  {comment.name}
                </h5>
              </div>
              <small className="date-modal-commentUserb fw-bold">
                {comment.date}
              </small>
            </div>
            <p className="content-modal-commentUser text-secondary fw-bold">
              {comment.content}
            </p>
            <div className="container-like-commentUser d-flex align-items-center justify-content-around">
              <FaRegCommentDots
                className="icon-modal"
                onClick={() => handleReply(id)}
              />
              <FaThumbsUp
                className="icon-modal"
                onClick={() => handleLike(id)}
              />
              <span>{commentLikes[id] || 0}</span>
            </div>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer className="modal-footer-commentUser  bg-primary-subtle">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {isReplyOpen && (
        <ReplyModal
          commentId={currentUser}
          handleClose={() => setIsReplyOpen(false)}
        />
      )}
    </Modal>
  );
};

export default CommentsModal;
