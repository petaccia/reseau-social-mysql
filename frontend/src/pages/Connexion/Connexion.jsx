import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Connexion.module.scss";
import famille from "../../assets/illustration/famille.jpg";
import family from "../../assets/illustration/family.jpg";
import AuthContext from "../../contexts/AuthContext/AuthContext.jsx";
import {
  toastError,
  toastSuccess,
} from "../../services/Toastify/toastConfig.jsx";

const Connexion = () => {
  const { loginUnified, signup, signupAdminFamily } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isFamilyAdmin, setIsFamilyAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    familyName: "",
    username: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    if (!formData.email || !formData.password) {
      toastError("L'adresse mail et le mot de passe sont obligatoire 😡");
      return false;
    }
    if (formData.password.length < 8) {
      toastError("Le mot de passe doit contenir au moins 8 caractères 😡");
      return false;
    }
    if (!isLogin && !formData.username) {
      toastError("Le nom d'utilisateur est obligatoire 😡");
      return false;
    }
    return true;
  };

  const handleErrors = (error) => {
    if (error && error.status) {
      const errorMessage = {
        409: "Cet utilisateur existe déjà 😡",
        400: "Email ou mot de passe incorrect 😡",
        401: "Email ou mot de passe incorrect 😡",
        500: "Erreur serveur",
      };
      toastError(errorMessage[error.status] || "Erreur serveur");
    } else {
      toastError(error.message);
    }
  };

  const auth = async () => {
    if (!validateFields()) return;

    try {
      let response;
      if (isLogin) {
        response = await loginUnified(formData.email, formData.password);
      } else if (isFamilyAdmin) {
        if (isFamilyAdmin && !isLogin) {
          response = await signupAdminFamily(
            formData.familyName,
            formData.username,
            formData.email,
            formData.password
          );
        }
        console.log("reponse du serveur", response);
      } else {
        response = await signup(
          formData.username,
          formData.email,
          formData.password
        );
      }

      if (response && response.token) {
        console.log("res in auth", response);
        let name;
        if (isLogin) {
          name = response.name;
        } else {
          name = response.newAdminFamily.name;
        }
        toastSuccess(
          `Bienvenue ${name} ! Vous êtes ${
            isLogin ? "connecté" : "inscrit"
          } ! 👋`
        );
        navigate("/home");
      } else {
        toastError("Erreur lors de la connexion ou de l'inscription 😡");
      }
    } catch (error) {
      console.log("Erreur à l'auth", error);
      handleErrors(error);
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
              <>
                <input
                  type="text"
                  name="familyName"
                  placeholder="Nom de famille"
                  onChange={handleChange}
                  value={formData.familyName}
                  className={styles.input}
                  required
                />
                <div className={styles.checkboxAdminContainer}>
                  <input
                    id="adminCheckbox"
                    type="checkbox"
                    checked={isFamilyAdmin}
                    onChange={() => setIsFamilyAdmin(!isFamilyAdmin)}
                    className={styles.checkboxAdmin}
                  />
                  <label htmlFor="adminCheckbox">
                    S'inscrire en tant que administrateur
                  </label>
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Nom"
                  onChange={handleChange}
                  value={formData.username}
                  className={styles.input}
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={formData.email}
              className={styles.input}
              autoComplete="current-email"
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              value={formData.password}
              className={styles.input}
              autoComplete="current-password"
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
