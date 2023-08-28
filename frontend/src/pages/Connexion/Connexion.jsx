import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import styles from "./Connexion.module.scss";
import famille from "../../assets/illustration/famille.jpg";
import family from "../../assets/illustration/family.jpg";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import { toastError, toastSuccess } from "../../services/Toastify/toastConfig.jsx";

const Connexion = () => {
  // const { mode } = useParams();
  // const location = useLocation();
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });


  const auth = async () => {
    try {
      // Validation des champs
      if (formData.email === "" && formData.password === "" ) {
        toastError("L'adresse mail et le mot de passe sont obligatoire 😡");
        return;
      }
      if (formData.email === "") {
        toastError("L'adresse mail est obligatoire 😡");
        return;
      }
      if (formData.password === "") {
        toastError("Le mot de passe est obligatoire 😡");
        return;
      }
      if (formData.password.length < 8) {
        toastError("Le mot de passe doit contenir au moins 8 caractères 😡");
        return;
      }
  
      let response;
      if (isLogin) {
        response = await login(formData.email, formData.password);
        if (response && response.user.roleId === 3) {
          toastSuccess(`Bienvenue ${response.user.username} ! Vous êtes connecté ! 👋`);
          navigate("/home");
        } else {
          console.log("Réponse de la connexion inaccessible", response);
          toastError("Votre inscription ou votre connexion n'a pas pu être effectuée 😡");
          return;
        }
      } else {
        if (formData.username === "") {
          toastError("Le nom d'utilisateur est obligatoire 😡");
          return;
        }
        response = await signup(formData.username, formData.email, formData.password);
        console.log("response signup",response);
        if (response && response.token) {
          toastSuccess(`Bienvenue ${formData.username} ! Vous êtes inscrit ! 👋`);
          navigate("/login");
        } else {
          console.log("Réponse de l'inscription inaccessible", response);
          toastError("Votre inscription ou votre connexion n'a pas pu être effectuée 😡");
        }
      }
    } catch (error) {
      console.log("chercher l'error du catch", error);
      if (error.status) {
        console.log("error.status", error.status);
        if(error.status === 409) {
          toastError("Votre email existe déjà 😡");
        } else if(error.status === 400) {
          toastError("Votre mot de passe n'est pas correct ou aucun champ n'est rempli 😡");
        } else if(error.status === 401) {
          toastError("Votre email n'est pas correct 😡");
        } else if(error.status === 500) {
          toastError("Une erreur est survenue 😡");
        } else {
          toastError("Votre inscription ou votre connexion n'a pas pu être effectuée 😡");
        }
      } else {
        toastError(error.message);
      }
    }
  };
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
      console.info("Logging in with", formData.email, formData.password);
    } else {
      console.info(
        "Sign Up with",
        formData.username,
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
              {!isLogin ? "Inscrivez-vous" : "Connectez-vous"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
