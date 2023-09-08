import React, { useState } from "react";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import Styles from "./ModalPassword.module.scss";
import apiConnect from "../../../services/API/apiConnection.jsx";

const ModalPassword = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Etat pour voir si le password est visble ou non pour les 3 champs
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      apiConnect
        .put("/users/password", {
          password,
          newPassword,
        })
        .then((res) => {
          onClose();
        })
        .catch((err) => {});
    } else {
      setError("Les nouveaux mots de passe ne sont pas identiques");
    }
  };

  // Fonction pour afficher ou non le mot de passe dans les 3 champs
  const handleClickShowCurrentPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className={`${Styles.modalContainer} ${isOpen ? "isOpen" : ""}`}>
      {isOpen ? (
        <div className={Styles.modal}>
          <h2>Changer de mot de passe</h2>
          {error && <p className={Styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={Styles.containerInput}>
              <label htmlFor="currentPassword">Mot de passe actuel</label>
              <input
                type={showPassword ? "text" : "password"}
                id="currentPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleClickShowCurrentPassword}
                className={`${Styles.buttonShowPassword} ${
                  showPassword ? "" : Styles.eyeClosed
                }`}
              >
                {showPassword ? <LiaEye /> : <LiaEyeSlash />}
              </button>
            </div>

            <div className={Styles.containerInput}>
              <label htmlFor="newPassword">Nouveau mot de passe</label>
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleClickShowNewPassword}
                className={`${Styles.buttonShowPassword} ${
                  showNewPassword ? "" : Styles.eyeClosed
                }`}
              >
                {showNewPassword ? <LiaEye /> : <LiaEyeSlash />}
              </button>
            </div>

            <div className={Styles.containerInput}>
              <label htmlFor="confirmPassword">Confirmer mot de passe</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handleClickShowConfirmPassword}
                className={`${Styles.buttonShowPassword} ${
                  showConfirmPassword ? "" : Styles.eyeClosed
                }`}
              >
                {showConfirmPassword ? <LiaEye /> : <LiaEyeSlash />}
              </button>
            </div>
          </form>
          <div className={Styles.containerButton}>
            <button type="submit">Changer de mot de passe</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalPassword;
