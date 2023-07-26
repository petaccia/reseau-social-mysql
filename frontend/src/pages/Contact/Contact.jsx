import React, { useEffect, useState } from "react";
import apiConnect from "../../services/API/apiConnection";
import styles from "./Contact.module.scss";

import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Contact = () => {
const [sentMessage, setSentMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Envoyer les données du formulaire dans l'API
  const formSubmit = async () => {
    try {
      const response = await apiConnect.post("/contact", formData);
      if (response.status === 201) {
        toast.success("Votre message a bien été envoyé",  { className: styles.toastSuccess, 
          style:{ top: "100px", right: "100px", 
        boxShadow: "5px 5px 10px green",
        backgroundColor:"#10131e", color: "green"}});
        setSentMessage(formData.message);
       

      } else {
        toast.error("Votre message n'a pas pu être envoyé",  { className: styles.toastSuccess, 
          style:{ top: "100px", right: "100px", 
        boxShadow: "5px 5px 10px red",
        backgroundColor:"#10131e", color: "red"}});
       
      }
    } catch (error) {
      toast.error("Votre message n'a pas pu être envoyé",  { className: styles.toastSuccess, 
        style:{ top: "100px", right: "100px", 
      boxShadow: "5px 5px 10px red",
      backgroundColor:"#10131e", color: "red"}} );
     
    }
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    // Vérifier si le message actuel est le même que celui envoyé
    if (formData.message === sentMessage) {
      toast.error("Vous ne pouvez pas envoyer le même message" , { className: styles.toastSuccess, 
        style:{ top: "100px", right: "100px", 
      boxShadow: "5px 5px 10px red",
      backgroundColor:"#10131e", color: "red"} });
    } else {
      formSubmit();
    }
  };



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
                autoComplete="nope" 
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
              <button type="submit" className={styles.button}>
                Envoyer
              </button>
            </div>
          </form>
        </div>
        
      </div> <ToastContainer
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

export default Contact;
