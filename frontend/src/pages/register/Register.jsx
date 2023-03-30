import ErrorModal from '@components/UI/ErrorModal';
import SuccesModal from '@components/UI/SuccesModal';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Register.scss";


const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    name:"",
    email:"",
    password:"",
  })
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [succesMessage, setSuccesMessage] = useState("");
  const [showSuccesModal, setShowSuccesModal] = useState(false);
  const [register, setRegister] = useState(true);



  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

 
  const validateInputs = () => {
    if (
      (!registerForm.username && register) ||
      (!registerForm.name && register)||
      (!registerForm.email && register)||
      (!registerForm.password && register)
    ) {
      setErrorMessage("Veuillez remplir tous les champs.");
      setShowErrorModal(true);
      return false;
    }

    if (!emailRegex.test(register ?  registerForm.email : "")) {
      setErrorMessage("Email non valide");
      setShowErrorModal(true);
      return false;
    }
    if (
      !passwordRegex.test(register ? registerForm.password : "")
    ) {
      setErrorMessage(
        "Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre"
      );
      setShowErrorModal(true);
      return false;
    }
    return true;
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try{
      const res = await axios.post("http://localhost:5000/register", {
        ...registerForm,
      });
      setRegister(true);
      setRegisterForm({
        username:"",
        name: "",
        email: "",
        password: "",
      });
      setSuccesMessage(` Bienvenue ${res.data.result[0].username} vous êtes bien enregisté`);
      console.log(res.data);
      setShowSuccesModal(true);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 409) {
        setErrorMessage("Un compte avec cette adresse e-mail existe déjà");
      } else {
        setErrorMessage("Une erreur est survenue lors de l'inscription");
      }
      setShowErrorModal(true);
    
    }
  };


const handleInputChange = (e) => {
 if (register) {
  setRegisterForm({
    ...registerForm,
    [e.target.name] : e.target.value,
  });
 }
};

const handleCloseErrorModal = () => {
  setShowErrorModal(false);
  setErrorMessage("");
};

const handelCloseSuccesModal = () => {
  setShowSuccesModal(false);
  setSuccesMessage("");
};

const handleClick = async (e ) => {
e.preventDefault();

}

  return (
    <div className='register'>
      <div className='card'>
        <div className='left'>
          <h1 className='titre'>Nom du site</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum veritatis sit 
            veniam accusantium saepe magni numquam sed necessitatibus unde harum 
            deserunt repellat illum voluptatum quidem atque, illo, minus nulla aliquam 
            quis perferendis earum consequuntur. Distinctio repellat sint in deleniti 
            officiis.
          </p>
          <span>Vous avez un compte?</span>
          <Link to="/login">
            <button className='btnLogin'>Login</button>
          </Link>
        </div>
        <div className='right'>
          <h1>Register</h1>
          <form onSubmit={handleSubmitRegister}>
            <input 
            className='input'
            type="text"
            placeholder='Prénom'
            name='username'
            onChange={handleInputChange}
            />
            <input 
            className='input'
            type="text"
            placeholder='Nom'
            name='name'
            onChange={handleInputChange}
            />
            <input 
            className='input'
            type="email"
            placeholder='Email'
            name='email'
            onChange={handleInputChange}
            />
            <input 
            className='input'
            type="password"
            placeholder='Mot de passe'
            name='password'
            onChange={handleInputChange}
            />
            <button onclick={handleClick} className="btnRegister">Register</button>

          </form>
        </div>

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
  )
}

export default Register