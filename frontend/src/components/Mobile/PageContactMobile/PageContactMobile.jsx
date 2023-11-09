import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  toastError,
  toastInfo,
  toastSuccess,
} from "../../../services/Toastify/toastConfig.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./PageContactMobile.scss";

const PageContactMobile = () => {
  const [messageSent, setMessageSent] = useState(false);

  // Etats pour voir si le nom, l'email et le message sont valides
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidMessage, setIsValidMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (messageSent) {
      toastInfo("Votre message a déjà été envoyé !");
    } else if (!data.name || !data.email || !data.message) {
      toastError("Veuillez remplir tous les champs du formulaire");
      setNameError("");
      setEmailError("");
      setMessageError("");
    } else {
      if (!data.name) {
        toastError("Veuillez renseigner votre nom");
        setNameError("");
      }
      if (!data.email) {
        toastError("Veuillez renseigner votre email");
        setEmailError("");
      }
      if (!data.message) {
        toastError("Veuillez renseigner votre message");
        setMessageError("");
      } else {
        toastSuccess("Votre message a été envoyé avec succès");
        setMessageSent(true);
        // Réinitialiser les champs du formulaire
        reset();
      }
    }
  };

  // Fonction pour voir si le nom est valide
  const handleChangeName = (e) => {
    const name = e.target.value;
    if (name.length >= 3) {
      setNameError("Nom valide");
      setIsValidName(true);
    } else {
      setNameError("Nom invalide (au moins 3 caractères requis)");
      setIsValidName(false);
    }
    if (!name) {
      setNameError("");
    }
  };

  // Fonction pour voir si l'email est valide
  const handleChangeEmail = (e) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = e.target.value;
    if (isValid.test(email)) {
      setEmailError("Email valide");
      setIsValidEmail(true);
    } else {
      setEmailError("Email invalide");
      setIsValidEmail(false);
    }
    if (!email) {
      setEmailError("");
    }
  };

  // Fonction pour voir si le message est valide
  const handleChangeMessage = (e) => {
    const message = e.target.value;
    if (message.length >= 10) {
      setMessageError("Message valide");
      setIsValidMessage(true);
    } else {
      setMessageError("Message invalide (au moins 10 caractères requis)");
      setIsValidMessage(false);
    }
    if (!message) {
      setMessageError("");
    }
  };

  return (
    <div className="form-contact-container  d-flex align-items-center justify-content-center flex-column vh-100 w-100">
      <h1 className="title">Contact</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-contact col-12 col-md-8 d-flex w-75 flex-column justify-content-center mt-1 "
      >
        <div className="form-group d-flex flex-column justify-content-center align-items-center">
          <div className="form-input w-100  p-3">
            <input
              id="name"
              className="form-control w-100  bg-transparent text-white border border-secondary-subtle rounded-3"
              type="text"
              {...register("name", { required: false })}
              aria-invalid={errors.name ? "true" : "false"}
              placeholder="Votre nom"
              onChange={handleChangeName}
            />
            <p className={`messageError ${isValidName ? "valid" : "invalid"}`}>
              {nameError}
            </p>
          </div>
        </div>
        <div className="form-group d-flex flex-column justify-content-center align-items-center">
          <div className="form-input w-100  p-3">
            <input
              id="email"
              className="form-control w-100 text-white border border-secondary-subtle rounded-3 bg-transparent"
              {...register("email", { required: false })}
              aria-invalid={errors.email ? "true" : "false"}
              placeholder="Votre email"
              onChange={handleChangeEmail}
            />
            <p className={`messageError ${isValidEmail ? "valid" : "invalid"}`}>
              {emailError}
            </p>
          </div>
        </div>
        <div className="form-group d-flex flex-column justify-content-center align-items-center">
          <div className="form-input w-100 p-3 ">
            <textarea
              className="form-control h-100 w-100 text-white border border-secondary-subtle rounded-3 bg-transparent"
              id="message"
              {...register("message", { required: false })}
              aria-invalid={errors.message ? "true" : "false"}
              placeholder="Votre message"
              onChange={handleChangeMessage}
            />
            <p
              className={`messageError ${isValidMessage ? "valid" : "invalid"}`}
            >
              {messageError}
            </p>
          </div>
        </div>
        <div className="form-group-button d-flex justify-content-end mt-5 mx-5">
          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default PageContactMobile;
