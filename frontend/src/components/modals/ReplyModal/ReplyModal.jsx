import React, { useState } from "react";
import { Modal, Form, Button, CloseButton } from "react-bootstrap";
import "./ReplyModal.scss";

const ReplyModal = ({ handleClose, commentId }) => {
  // Etat pour le contenu du commentaire
  const [reply, setReply] = useState("");

  // Fonction pour soumettre la reponse au commentaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(` Reply to comment ${commentId}: ${reply}`);
    setReply("");
    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose} className="modal-reply-comment  ">
      <Modal.Header className="modal-reply-comment-header">
        <Modal.Title className="modal-reply-comment-title">
          Répondre au commentaire
        </Modal.Title>
        <CloseButton variant="white" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body className="modal-reply-comment-body">
        <Form onSubmit={handleSubmit} className="form-reply-comment">
          <Form.Group className="form-group-reply-comment mb-3">
            <Form.Label className="form-label-reply-comment text-primary">
              Contenu du commentaire
            </Form.Label>
            <Form.Control
              className="form-control-reply-comment"
              as="textarea"
              rows={3}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Soumettre
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ReplyModal;
