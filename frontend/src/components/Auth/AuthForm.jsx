import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "../UI/Button";
import ErrorModal from "@components/UI/ErrorModal";
import AuthContext from "../../context/auth_context";
import SuccesModal from "@components/UI/SuccesModal";
import "../../styles/_authForm.scss"
const AuthForm = () => {
  const [loginForm, setLoginForm] = useState ({
    email: "",
    password: "",
    
  });
const [signUpForm, setSignUpForm] = useState ({
  firstname: "",
  lastname: "",
  age: "",
  email: "",
  password: ""
});

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");
  const [showSuccesModal, setShowSuccesModal] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  console.log("------------>authCtx");
  console.log(authCtx);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const validateInputs = () => {
if (
  (!loginForm.email && isLoginForm) || (!signUpForm.email && !isLoginForm) || (!loginForm.password && isLoginForm)|| (!signUpForm && isLoginForm) 
){
setErrorMessage("Veuillez remplir tous les champs.");
setShowErrorModal(true);
return false;
}

  if (!emailRegex.test(isLoginForm ? loginForm.email : signUpForm.email)) {
    setErrorMessage("Email non valide");
    setShowErrorModal(true);
    return false;
  }
  if (!passwordRegex.test(
    isLoginForm ? loginForm.password : signUpForm.password
  ) 
  ) {
    setErrorMessage(
      "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
      );
      setShowErrorModal(true);
      return false;
    }
    return true;
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
  }
      setIsLoading(true);
      try {
        const res = await axios.post("http://localhost:5000/login", {
          email: loginForm.email,
          password: loginForm.password,

        });
        authCtx.login( res.data.token,res.data.result[0].id,);
        console.log(res.data);
        setIsConnected(true);
        setUsername(res.data.result[0].lastname);
        setIsLoginForm({
          email: "",
          password: "",
        });
        setSuccesMessage(` Bienvenue ${res.data.result[0].lastname} vous êtes bien connecté`);
        setShowSuccesModal(true);

        
        
      } catch (err) {
        console.error(err);
        setErrorMessage("Une erreur est survenue lors de la connexion");
        setShowErrorModal(true);
      } finally {
        setIsLoading(false);
      }
     
    };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/signUp", {
       ...signUpForm,
      });
      setIsLoginForm(true);
     setSignUpForm({
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      password: "",
     })
      setSuccesMessage(` Bienvenue ${res.data.result[0].lastname} vous êtes bien enregisté`);
      setShowSuccesModal(true);
      
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setErrorMessage("Un compte avec cette adresse e-mail existe déjà")
      }else{
        setErrorMessage("Une erreur est survenue lors de l'inscription");
      }
      setShowErrorModal(true);
    } finally{
      setIsLoading(false);
    }
  };


  const handleInputChange = (e) => {
    if (isLoginForm) {
      setLoginForm({
        ...loginForm,
        [e.target.name]: e.target.value,
      });
    } else {
      setSignUpForm({
        ...signUpForm,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handelCloseSuccesModal = () => {
  setShowSuccesModal(false)
  setSuccesMessage("");
  };

  return (
    <div className="modal-connexion ">
      <section className="auth-container">
        <h1 className="titre">{isLoginForm ? "Se connecter" : "S'inscrire"}</h1>
  
        {isLoginForm ? (
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
  
            {isLoading ? (
              <Button isLoading={true}>Chargement...</Button>
            ) : (
              <Button type="submit">Se connecter</Button>
            )}
          </form>
        ) : (
          <form className="form-container" onSubmit={handleSubmitSignUp}>
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={signUpForm.firstname}
              onChange={handleInputChange}
            />
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={signUpForm.lastname}
              onChange={handleInputChange}
            />
            <label htmlFor="age">Âge</label>
            <input
              type="number"
              id="age"
              name="age"
              min="18"
              max="120"
              value={signUpForm.age}
              onChange={handleInputChange}
            />
            <label  htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={signUpForm.email}
              onChange={handleInputChange}
            />
            <label className="label" htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={signUpForm.password}
              onChange={handleInputChange}
            />
  
            {isLoading ? (
              <Button isLoading={true}>Chargement...</Button>
            ) : (
              <Button type="submit">S'inscrire</Button>
            )}
          </form>
        )}
  
        <p className="text">
          {isLoginForm ? (
            <>
              Vous n'avez pas de compte ?
              <button
                className="button-toggle"
                onClick={() => setIsLoginForm(false)}
              >
                S'inscrire
              </button>
            </>
          ) : (
            <>
              Vous avez déjà un compte ?
              <button
                className="button-toggle"
                onClick={() => setIsLoginForm(true)}
              >
                Se connecter
              </button>
            </>
          )}
        </p>
      </section>
  
      {showErrorModal && (
        <ErrorModal
          title={"Une erreur est survenue lors de la connexion"}
          message={errorMessage}
          onClose={ handleCloseErrorModal }
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
  
  };

  export default AuthForm;
