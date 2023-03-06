import React from "react";
import  "../../styles/_errorModal.scss"

const ErrorModal = ({ message, onClose }) => {
  return (
      <div className="modal">
        <div className="modal-content">
          <h3>Error</h3>
        </div>
        <div className="message">
          <p>{ message }</p>
        </div>
          <footer className="button-footer">
          <button className="button" onClick={onClose}>close</button>
          </footer>
      </div>

  )
}

export default ErrorModal;