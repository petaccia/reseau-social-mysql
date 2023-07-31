import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "./Connexion.module.scss";
import famille from "../../assets/illustration/famille.jpg";
import family from "../../assets/illustration/family.jpg";
import apiConnect from "../../services/API/apiConnection.jsx";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../contexts/AuthContext.jsx";

const Connexion = () => {
  const { mode } = useParams();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(mode === "login");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setIsLogin(mode === "login");
  }, [mode, location]);

  const auth = async () => {
    let response;
    try {
      if (isLogin) {
        response = await apiConnect.post("/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          login();
        }
      } else {
        response = await apiConnect.post("/signup", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 201) {
          login();
        }
      }
      if (response && (response.status === 200 || response.status === 201)) {
        toast.success(
          `Bienvenue ${formData.username} ! Vous êtes ${
            isLogin ? "connecté" : "inscrit"
          } ! 👋`,
          {
            className: styles.toastSuccess,
            style: {
              top: "100px",
              right: "100px",
              boxShadow: "5px 5px 10px green",
              backgroundColor: "#10131e",
              color: "green",
            },
          }
        );
      }
    } catch (error) {
      console.log("chercher l'error", error);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Votre email existe déjà 😡", {
            className: styles.toastError,
            style: {
              top: "100px",
              right: "100px",
              boxShadow: "5px 5px 10px red",
              backgroundColor: "#10131e",
              color: "red",
            },
          });
        } else if (error.response.status === 400) {
          toast.error(
            "Votre mot de passe n'est pas correct ou aucun champs n'est remplis 😡",
            {
              className: styles.toastError,
              style: {
                top: "100px",
                right: "100px",
                boxShadow: "5px 5px 10px red",
                backgroundColor: "#10131e",
                color: "red",
              },
            }
          );
        } else if (error.response.status === 401) {
          toast.error("Votre email n'est pas correct 😡", {
            className: styles.toastError,
            style: {
              top: "100px",
              right: "100px",
              boxShadow: "5px 5px 10px red",
              backgroundColor: "#10131e",
              color: "red",
            },
          });
        } else if (error.response.status === 500) {
          toast.error("Une erreur est survenue 😡", {
            className: styles.toastError,
            style: {
              top: "100px",
              right: "100px",
              boxShadow: "5px 5px 10px red",
              backgroundColor: "#10131e",
              color: "red",
            },
          });
        } else {
          toast.error(
            "Votre inscription ou votre connexion n'a pas pu être effectué 😡",
            {
              className: styles.toastError,
              style: {
                top: "100px",
                right: "100px",
                boxShadow: "5px 5px 10px red",
                backgroundColor: "#10131e",
                color: "red",
              },
            }
          );
        }
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
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ backgroundColor: "#10131e" }}
      />
    </div>
  );
};

export default Connexion;
