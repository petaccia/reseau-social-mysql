import React from "react";
import  "../../styles/_errorModal.scss"

const ErrorModal = ({ message, onClose }) => {
  return (
      <div className="modal">
        <div className="modal-content">
          <h3>Erreur</h3>
        </div>
        <div className="message">
          <p>{ message }</p>
        </div>
          <footer className="footer">
          <button className="footer-button" onClick={onClose}>Fermer</button>
          </footer>
      </div>

  )
}

export default ErrorModal;