import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "@components/UI/ErrorModal";
import SuccesModal from "@components/UI/SuccesModal";
import "./login.scss";
import AuthContext from "../../context/auth_context";

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);
  console.log("-----------authCtx");
  console.log(authCtx);

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  const validateInputs = () => {
    if (
      (!loginForm.email && login) ||
      (!loginForm.password && login) 
      ) {
        setErrorMessage("Veuillez remplir tous les champs.");
        setShowErrorModal(true);
        return false;
      }


    if (!emailRegex.test(login ? loginForm.email : "")) {
      setErrorMessage("Email non valide");
      setShowErrorModal(true);
      return false;
    }
    if (!passwordRegex.test(login ? loginForm.password : "")) {
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
    navigate("/", { replace: true });
    try {
      const res = await axios.post("http://localhost:5000/login", {
       ...loginForm,
      });
      authCtx.login(res.data.token , res.data.result[0].id)
      console.log(res.data);
      setLogin(true);
      setLoginForm({
        email: "",
        password: "",
      });
      setSuccesMessage(
        ` Bienvenue ${res.data.result[0].username} vous êtes bien connecté`
      );
      setShowSuccesModal(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Une erreur est survenue lors de la connexion");
      setShowErrorModal(true);
    }
  };
  const handleInputChange = (e) => {
   if (login) {
    setLoginForm({
      ...loginForm, 
      [e.target.name] : e.target.value,
    })
   }
  };
  

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };

  const handelCloseSuccesModal = () => {
    setShowSuccesModal(false);
    setSuccesMessage("");
  }

  const handleClick = (e) => {
    e.preventDefault();
  }

    return (
      <div className="login">
        <div className="card">
          <div className="left">
            <h1 className="titre">Nom du site</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui,
              aspernatur expedita veniam nesciunt perspiciatis, deleniti enim
              libero est sint repudiandae, delectus laborum aliquam ab?
              Reprehenderit quos, quia ullam nemo molestias, minus vero
              architecto excepturi dolor iusto odit expedita incidunt tenetur.
            </p>
            <span>Vous n'avez pas de compte?</span>
            <Link to="/register">
            <button>Register</button>
            </Link>
          </div>
          <div className="right">
            <h1>Login</h1>
            <form onSubmit={handleSubmitLogin}>
              <input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                onChange={handleInputChange}
              />
              <input
              placeholder="Mot de passe"
                type="password"
                id="password"
                name="password"
                onChange={handleInputChange}
              />

              <button onSubmit={handleClick}>Se connecter</button>
            </form>
          </div>

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
      </div>
    );
  };

export default Login;
