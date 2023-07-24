import React, { useState } from "react";
import styles from "./Connexion.module.scss";
import  famille  from "/src/assets/illustration/famili.png";
import family  from "/src/assets/illustration/famille.jpg";
import  apiConnect from "../../services/API/apiConnection";

const Connexion = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const auth = async () => {
    let response ;
    try {
      if (isLogin) {
    response = await apiConnect.post("/login", {
        email: formData.email,
        password: formData.password,
      });
      } else {
        response = await apiConnect.post("/signup", {
          username: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
    if (isLogin) {
      console.log("Logging in with", formData.email, formData.password);
    } else {
      console.log(
        "Sign Up with",
        formData.name,
        formData.email,
        formData.password
      );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          src={isLogin ? famille : family}
          alt="Description de l'image"
          className={styles.image}
        />
        <div className={styles.buttonContainer}>
          <button onClick={switchMode} className={styles.switchButton}>
            {isLogin ? "S'inscrire" : "Se connecter"}
          </button>
          <p className={styles.switchText}>
            {isLogin ? " Pas encore inscrit ? " : " Déja inscrit ?"}
            <a href="#" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Inscrivez-vous" : " Connectez-vous"}
            </a>
          </p>
        </div>
      </div>
      <div className={styles.containerCard}>
        <h1 className={styles.title}>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className={styles.containerContact}>
          <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
              <input
                type="text"
                name="username"
                placeholder="Nom"
                onChange={handleChange}
                value={formData.username}
                className={styles.input}
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className={styles.input}
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              value={formData.password}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              {!isLogin ? "Inscrivez-vous"   : "Connectez-vous"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
