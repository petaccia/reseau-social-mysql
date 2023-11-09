import React, { useContext, useState } from "react";
import styles from "./ModalEmail.module.scss";
import apiConnect from "../../../services/API/apiConnection.jsx";
import {
  toastError,
  toastSuccess,
} from "../../../services/Toastify/toastConfig.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const ModalEmail = ({ isOpen, onClose }) => {
  const { authUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState(false);

  // Fonction pour envoyer le mail
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Veuillez entrer votre adresse mail.");
      return;
    }
    if (!newEmail) {
      setError("Veuillez entrer votre nouvelle adresse mail.");
      return;
    }

    if (newEmail === authUser.email) {
      setError("L'adresse mail est la même que l'actuelle.");
      return;
    }

    try {
      // Vérification du mail
      const res = await apiConnect.post("/verifyEmail", {
        userId: authUser.id,
        email,
        pass: currentPassword,
      });

      if (res.status !== 200) {
        setError("Erreur lors de la vérification de l'adresse mail.");
        return;
      }

      // Mettre à jour l'email
      const updateResponse = await apiConnect.put("/user/email", {
        userId: authUser.id,
        email: newEmail,
        pass: currentPassword,
      });

      if (updateResponse.status === 200) {
        onClose();
        toastSuccess("Adresse mail mise à jour avec succès");
      } else {
        throw new Error("Erreur lors de la mise à jour de l'adresse mail");
      }
    } catch (err) {
      toastError("Une erreur est survenue");
      console.error("Erreur lors de la mise à jour de l'adresse mail", err);
    }
  };

  return (
    <div className={`${styles.containerEmail} ${isOpen ? "isOpen" : ""}`}>
      {isOpen ? (
        <div className={styles.modalEmail}>
          <h2>Changer de mail</h2>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              id="email"
              type="email"
              placeholder="adresse mail actuelle"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
            />
            <input
              id="newEmail"
              type="email"
              placeholder="Nouvelle adresse mail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={styles.input}
            />
            <input
              id="currentPassword"
              type="password"
              placeholder="Mot de passe actuel"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={styles.input}
            />
            <div className={styles.buttonContainer}>
              <button type="submit">Changer l'adresse mail </button>
              <button type="button" onClick={onClose}>
                Annuler
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default ModalEmail;
