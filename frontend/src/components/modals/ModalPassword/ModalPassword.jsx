import React, { useContext, useState } from "react";
import { LiaEyeSlash, LiaEye } from "react-icons/lia";
import Styles from "./ModalPassword.module.scss";
import apiConnect from "../../../services/API/apiConnection.jsx";
import {
  toastError,
  toastSuccess,
} from "../../../services/Toastify/toastConfig.jsx";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";

const ModalPassword = ({ isOpen, onClose }) => {
  const { authUser } = useContext(AuthContext);
  console.log("authUser in ModalPassword",authUser);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Etat pour voir si le password est visble ou non pour les 3 champs
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Vérifiez le mot de passe actuel
      const response = await apiConnect.post("/verifyPassword", {
        userId: authUser.id,
        password,
      });

      console.log("response", response);

      if (response) {
        console.log("response.data", response);
        // Si le mot de passe actuel est correct
        if (newPassword === confirmPassword) {

          // Faire une requête à votre API pour mettre à jour le mot de passe
          const updateResponse = await apiConnect.put("/user/password", {
            userId: authUser.id,
            password: newPassword,
          });
            console.log("updateResponse", updateResponse);
          if (updateResponse.status === 200) {
            onClose();
            toastSuccess("Mot de passe mis à jour avec succès");
          } else {
            throw new Error("Erreur lors de la mise à jour du mot de passe");
          }
        } else {
          setError("Les nouveaux mots de passe ne sont pas identiques");
        }
      } else {
        setError("Mot de passe actuel incorrect");
      }
    } catch (err) {
      toastError("Une erreur est survenue");
      console.error("Erreur lors de la mise à jour du mot de passe", err);
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
            <div className={Styles.containerButton}>
              <button type="submit">Changer de mot de passe</button>
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

export default ModalPassword;
