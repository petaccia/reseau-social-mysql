import React, { useState } from "react";
import Styles from "./modalToastContact.module.scss";

// Définir les couleurs de fond en fonction du variant
// const SUCCESS_COLOR = "#006400";
// const DANGER_COLOR = "#8B0000";

const duration = 5000;

const ModalToast = ({ show, handleClose, message, variant, timeleft }) => {
  // Déterminer la couleur de fond et de texte en fonction du variant
  // const bgColor = variant === "success" ? SUCCESS_COLOR : DANGER_COLOR;
  const textColor = variant === "success" ? "#006400" : "#8B0000";

  // Rendre le modal avec le style et la classe définis
  return (
    <div style={{color: textColor }} className={Styles.modal_toast}>
      {/* Ajouter un bouton pour fermer le modal en appelant la fonction handleClose passée en props */}
      <button onClick={handleClose} type="button" className={Styles.btn_close}>
        x
      </button>
      {/* Afficher le message passé en props */}
      <p className={Styles.message}>{message}</p>
      {/* Afficher une barre de progression en fonction du temps restant passé en props */}
      <div className={Styles.progress_bar}>
        <div
          className={Styles.progress}
          style={{
            width: `${(timeleft / 5) * 100}%`,
            animation: `progress ${duration}ms linear`,
            backgroundColor: variant === "success" ? "#006400" : "#8B0000",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ModalToast;
