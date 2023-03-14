import React from "react";
import "../../styles/_succesModal.scss";

const SuccesModal= ({ message, onClose,}) => {
  return (
    <>
   
    <div className="modal">
      <div className="modal-content-succes">
        <h3>Connexion réussi</h3>
      </div>
      <div className="message">
        <p>{message}</p>
      </div>
      <footer className="footer">
        <button className="footer-button" onClick={onClose}>
          Fermer
        </button>
      </footer>
    </div>
    
    </>
  );
};

export default SuccesModal;
