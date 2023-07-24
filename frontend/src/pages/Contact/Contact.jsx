import React, { useEffect, useState } from "react";
import apiConnect from "../../services/API/apiConnection";
import styles from "./Contact.module.scss";
import ModalToast from "@components/modals/modalsToast/modalToastContact";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });


  // Etat pour stocker les messages envoyés
  const [sentMessage, setSentMessage] = useState("");

  // Fonction pour récupérer les modals
  const [showToast, setShowToast] = useState(true);
  // fonction pour les messages de toast
  const [toastMessage, setToastMessage] = useState("");
  const [variant, setVariant] = useState("");

  const [timeleft, setTimeleft] = useState(5);

  // Envoyer les données du formulaire dans l'API
  const formSubmit = async () => {
    try {
      const response = await apiConnect.post("/contact", formData);
      if (response.status === 201) {
        setToastMessage("Votre message a bien été envoyé");
        setVariant("success");

        setSentMessage(formData.message)

      } else {
        setToastMessage("Votre message n'a pas pu être envoyé");
        setVariant("danger");
      }
    } catch (error) {
      setToastMessage("Votre message n'a pas pu être envoyé");
      setVariant("danger");
    }
  };

  // Fermer le toast automatiquement après 3 secondes et manuellement
  let timer;

  const handleSumbit = (e) => {
    e.preventDefault();
    // Vérifier si le message actuel est le même que celui envoyé
    if (formData.message === sentMessage) {
      setToastMessage("Vous ne pouvez pas envoyer de message même");
      setVariant("danger");
      setShowToast(true);
      setTimeleft(5);

      return;
    }

    formSubmit();
    if (!showToast) {
      setShowToast(true);
      setTimeleft(5);
    }
 };

  const handleCloseToast = () => {
    clearTimeout(timer);
    setShowToast(false);
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setInterval(() => {
        setTimeleft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowToast(false);
            return 5;
          } else {
          return prev - 1;
        }
      })
    }, 1000);
    
    } 
    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);
    

  return (
    <div className={styles.container}>
    <div className={`${styles.containerCard}`}>
      <div className={styles.containerContact}>
        <h1 className={styles.title}>Contact</h1>
        <form onSubmit={handleSumbit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nom</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Entrez votre nom"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="Entrez votre email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea
              className={styles.input}
              type="text"
              placeholder="Entrez votre message"
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.button} disabled={formData.message === sentMessage}>
              Envoyer
            </button>
          </div>
        </form>
      </div>
      {/* Afficher le composant ModalToast si showToast est vrai */}
      {showToast && (
        <ModalToast
          show={showToast}
          handleClose={handleCloseToast}
          message={toastMessage}
          variant={variant}
          timeleft={timeleft}
        />
      )}
    </div>
  </div>
  );
};

export default Contact;
