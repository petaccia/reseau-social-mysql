import React, { useState } from "react";
import styles from "./ProfilUser.module.scss";

const ProfilUser = () => {
  // Télécharger une photo de profil
  const [file, setFile] = useState(null);

  const { dataUser, setDataUser } = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dateOfBirth: "",
    numberPhone: "",
    adress: "",
    city: "",
    postalCode: "",
    pays: "",
    NameFamily: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataUser({ ...dataUser, [name]: value });
  };

  return (
    <div className={styles.containerPageProfilUser}>
      <h1 className={styles.titleProfilUser}>Page de profil</h1>
      <div className={styles.containerProfilUser}>
        <div className={styles.containerImgUser}>
          <h2 className={styles.titleImgProfilUser}>Photo de profil</h2>
          <img src="" alt="photo de profil" className={styles.imgProfilUser} />
        </div>
        <div className={styles.containerFormUser}>
          <form action="" className={styles.formUser}>
            <input
              type="text"
              placeholder="Nom"
              name="firstname"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Prénom"
              name="lastname"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="email"
              placeholder="Adresse mail"
              name="email"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="date" 
              placeholder="Date de naissance"
              name="dateOfBirth"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="number"
              placeholder="Téléphone"
              name="numberPhone"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Adresse"
              name="adress"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Ville"
              name="city"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="number"
              placeholder="Code postal"
              name="postalCode"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Pays"
              name="pays"
              onChange={handleChange}
              className={styles.input}
            />

            <input
              type="text"
              placeholder="Famille"
              name="NameFamily"
              className={styles.input}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilUser;
