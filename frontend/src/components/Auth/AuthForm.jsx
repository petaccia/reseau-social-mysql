import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "../UI/Button";
import ErrorModal from "@components/UI/ErrorModal";
import AuthContext from "../../context/auth_context";


const AuthForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const authCtx = useContext(AuthContext);
    console.log("---------authCtx.token------------");
    console.log(authCtx)

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setErrorMessage("Email non valide");
      setShowErrorModal(true);
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
        );
        setShowErrorModal(true);
        return;
      }
      
      try {
        const res = await axios.post("http://localhost:5000/login", {
          email,
          password,

        });
        authCtx.login( res.data.token,res.data.result[0].id,);
        // closeModal();
        console.log(res.data.token)
        console.log(res.data.result[0].id);
        
        
      } catch (err) {
        console.error(err);
        setErrorMessage("Une erreur est survenue lors de la connexion");
        setShowErrorModal(true);
      }
      console.log("Login button clicked"); // Ajout d'un console.log()
    };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setErrorMessage("Email non valide");
      setShowErrorModal(true);
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
      );
      setShowErrorModal(true);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/signUp", {
        firstname,
        lastname,
        age,
        email,
        password,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
      setErrorMessage("Une erreur est survenue lors de la connexion");
      setShowErrorModal(true);
    }
  };

  const HandleModalClose = () => {
    setEmail("");
    setPassword("");
    setShowErrorModal(false);
  };

  return (
    <div className="modal-connexion">
      <section className="auth-container">
        <h1 className="titre">{isLoginForm ? "Se connecter" : "S'inscrire"}</h1>

        {isLoginForm ? (
          <form className="form-container" onSubmit={handleSubmitLogin}>
            {/* formulaire de connexion */}

            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* structure Password  */}
            <input
              type="password"
              placeholder="Mot de passe"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <Button type={"submit"}>
            {" "}
            Envoyer{" "}
          </Button>
          </form>
        ) : (
          <form className="form-container" onSubmit={handleSubmitSignUp}>
            {/* formulaire d'inscription */}

            {/* structure Email */}
            <input
              type="text"
              placeholder="Nom"
              id="name"
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder="Prénom"
              id="lastname"
              required
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              id="age"
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* structure Password  */}
            <input
              type="password"
              placeholder="Mot de passe"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             <Button type={"submit"}>
            {" "}
            Envoyer{" "}
          </Button>
          </form>
        )}

        <div className="button-container">
          {/* bouton pour changer le formulaire */}
          <button className="btn-login" onClick={() => setIsLoginForm(!isLoginForm)}>
            {isLoginForm ? "Pas encore inscrit?" : "Déjà inscrit?"}
          </button>
     
       </div>
        {showErrorModal && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setShowErrorModal(false)}
            closeModal={HandleModalClose}
          />
        )}
      </section>
    </div>
  );
};

export default AuthForm;
