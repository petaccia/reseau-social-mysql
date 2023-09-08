import React, { useContext, useState } from "react";
import styles from "./ProfilUser.module.scss";
import UserContext from "../../contexts/UserContext/UserContext.jsx";
import ModalPassword from "../../components/modals/ModalPassword/ModalPassword.jsx";

const ProfilUser = () => {
  const { currentUser } = useContext(UserContext);
  console.info("Données de l'utilisateur actuel dans profilUser", currentUser);

  const [file, setFile] = useState(null);
  const [data, setData] = useState(currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.info("Ouverture de la modal", isModalOpen);

  const handleChange = (place, value) => {
    const newDataUser = { ...data };
    newDataUser[place] = value;
    setData(newDataUser);
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
  };

  return (
    <div
      className={`${styles.containerPageProfilUser} ${
        isModalOpen ? styles.blurred : ""
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
          <form action="" className={styles.formUser}>
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
          </form>
        </div>
        <div className={styles.containerButtonUser}>
          <button
            type="button"
            className={styles.button}
            onClick={() => setIsModalOpen(true)}
          >
            Modifier mot de passe
          </button>
          <ModalPassword
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
           />
        </div>
      </div>
    </div>
  );
};

export default ProfilUser;
