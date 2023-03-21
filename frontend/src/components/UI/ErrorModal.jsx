import React from "react";
import "../../styles/_errorModal.scss";

function ErrorModal({ message, onClose }) {
  return (
    <div className="modal">
      <div className="modal-content-error">
        <h3>Erreur</h3>
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
      <footer className="footer">
        <button type="button" className="footer-button" onClick={onClose}>
          Fermer
        </button>
      </footer>
    </div>
  );
}

export default ErrorModal;
