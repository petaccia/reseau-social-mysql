import React, { useContext, useState } from "react";
import styles from "./ProfilUser.module.scss";
import UserContext from "../../contexts/UserContext/UserContext.jsx";
import ModalPassword from "../../components/modals/ModalPassword/ModalPassword.jsx";
import ModalEmail from "../../components/modals/ModalEmail/ModalEmail.jsx";
import {
  toastError,
  toastSuccess,
} from "../../services/Toastify/toastConfig.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";

const ProfilUser = () => {
  const { currentUser } = useContext(UserContext);
  console.info("Données de l'utilisateur actuel dans profilUser", currentUser);

  const [file, setFile] = useState(null);
  const [data, setData] = useState(currentUser);
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);

  const handleChange = (place, value) => {
    const newDataUser = { ...data };
    newDataUser[place] = value;
    setData(newDataUser);
  };

  // Mettre à jour le formulaire
  const handleUpdateForm = async (e) => {
    e.preventDefault();
    try {
      const response = await apiConnect.put("/user/" + currentUser.id, data);
      console.info("Données de l'utilisateur enregistré dans le serveur du fichier ProfilUser", response);
      if (response.status === 200) {
        toastSuccess("Profil mis à jour avec succès");
      } else {
        toastError("Veuillez Vérifier vos champs");
      }
    } catch (error) {
      toastError("Error lors de la mise à jour du profil");
      console.error(" Erreur lors de la mise à jour du profil", error.response);
    }
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div
      className={`${styles.containerPageProfilUser} ${
        isModalOpenPassword || isModalOpenEmail ? styles.blurred : ""
      }`}
    >
      <h1 className={styles.titleProfilUser}>Page de profil</h1>
      <div className={styles.containerProfilUser}>
        <div className={styles.containerImgUser}>
          <h2 className={styles.titleImgProfilUser}>Photo de profil</h2>
          <img
            src={file ? URL.createObjectURL(file) : ""}
            alt="photo de profil"
            className={styles.imgProfilUser}
          />
        </div>
        <div className={styles.containerFormUser}>
          <form
            action=""
            className={styles.formUser}
            onSubmit={handleUpdateForm}
          >
            <input
              id="firstname"
              type="text"
              placeholder="Nom"
              name="firstname"
              value={data.lastname}
              onChange={(e) => handleChange("lastname", e.target.value)}
              className={styles.input}
            />
            <input
              id="lastname"
              type="text"
              placeholder="Prénom"
              name="lastname"
              value={data.firstname}
              onChange={(e) => handleChange("firstname", e.target.value)}
              className={styles.input}
            />
            <input
              id="birthday"
              type="date"
              placeholder="Date de naissance"
              name="dateOfBirth"
              value={data.dateOfBirth}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
              className={styles.input}
            />
            <input
              id="phone"
              type="text"
              placeholder="Téléphone"
              name="numberPhone"
              value={data.numberPhone}
              onChange={(e) => handleChange("numberPhone", e.target.value)}
              className={styles.input}
            />
            <input
              id="adress"
              type="text"
              placeholder="Adresse"
              name="adress"
              value={data.adress}
              onChange={(e) => handleChange("adress", e.target.value)}
              className={styles.input}
            />
            <input
              id="city"
              type="text"
              placeholder="Ville"
              name="city"
              value={data.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className={styles.input}
            />
            <input
              id="postalCode"
              type="text"
              placeholder="Code postal"
              name="postalCode"
              value={data.postalCode}
              onChange={(e) => handleChange("postalCode", e.target.value)}
              className={styles.input}
            />
            <input
              id="country"
              type="text"
              placeholder="pays"
              name="pays"
              value={data.pays}
              onChange={(e) => handleChange("pays", e.target.value)}
              className={styles.input}
            />
            <input
              id="familyName"
              type="text"
              placeholder="Famille"
              name="NameFamily"
              value={data.NameFamily}
              className={styles.input}
            />
            <button type="submit" className={styles.updateButton}>
              Mettre à jour
            </button>
          </form>
        </div>
        <div className={styles.containerButtonUser}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsModalOpenPassword(true)}
          >
            Modifier mot de passe
          </button>
          <ModalPassword
            isOpen={isModalOpenPassword}
            onClose={() => setIsModalOpenPassword(false)}
          />
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsModalOpenEmail(true)}
          >
            Modifier email
          </button>
          <ModalEmail
            isOpen={isModalOpenEmail}
            onClose={() => setIsModalOpenEmail(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilUser;
