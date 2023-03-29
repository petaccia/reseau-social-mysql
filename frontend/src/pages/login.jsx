import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "../components/UI/Button";
import ErrorModal from "@components/UI/ErrorModal";
import AuthContext from "../context/auth_context";
import SuccesModal from "@components/UI/SuccesModal";
import "../styles/_authForm.scss";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
 

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");
  const [showSuccesModal, setShowSuccesModal] = useState(false);
 
  const navigate = useNavigate();
  console.log(navigate);

  const authCtx = useContext(AuthContext);
  console.log("------------>authCtx");
  console.log(authCtx);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validateInputs = () => {
    if (!loginForm.email || !loginForm.password) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setShowErrorModal(true);
      return false;
    }
 
    if (!emailRegex.test(loginForm.email)) {
      setErrorMessage("Email non valide");
      setShowErrorModal(true);
      return false;
    }
    if (!passwordRegex.test(loginForm.password)) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
      );
      setShowErrorModal(true);
      return false;
    }
    return true;
  };

const handleInputChange= (e) => {
  const { name, value} = e.target;
  setLoginForm ((prevState) => ({
    ...prevState,
    [name]: value,
  }))
}


  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
   
    navigate("/register", { replace: true });
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: loginForm.email,
        password: loginForm.password,
      });
      authCtx.login(res.data.token, res.data.result[0].id);
      console.log(res.data);
      setUsername(res.data.result[0].lastname);
      setLoginForm({
        email: "",
        password: "",
      });
      setSuccesMessage(
        ` Bienvenue ${res.data.result[0].lastname} vous êtes bien connecté`
      );
      setShowSuccesModal(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Une erreur est survenue lors de la connexion");
      setShowErrorModal(true);
    
  };

  return (
    <div className="modal-connexion ">
      <section className="auth-container">
        <h1 className="titre">Se connecter</h1>

        
          <form className="form-container" onSubmit={handleSubmitLogin}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginForm.password}
              onChange={handleInputChange}
            />

            <Button type="submit">Se connecter</Button>
          </form>
       
      </section>

      {showErrorModal && (
        <ErrorModal
          title="Une erreur est survenue lors de la connexion"
          message={errorMessage}
          onClose={handleCloseErrorModal}
        />
      )}

      {showSuccesModal && (
        <SuccesModal
          message={succesMessage}
          onClose={() => setShowSuccesModal(false)}
          closeModal={handelCloseSuccesModal}
        />
      )}
    </div>

    );
  }
}
  export default Login;