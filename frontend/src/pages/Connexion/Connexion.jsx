import React, { useState } from "react";
import styles from "./Connexion.module.scss";
import  famille  from "/src/assets/illustration/famili.png";
import family  from "/src/assets/illustration/famille.jpg";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // const auth = async () => {
  //   try {
  //     const response = await apiConnect.post("/", {
  //       email,
  //       password,
  //     });
  //     console.log(response);
  // }

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={formData.name}
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
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
              className={styles.input}
            />
            <button type="submit" className={styles.button}>
              {!isLogin ? "Sign Up" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
