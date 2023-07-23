import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import apiConnect from "../../services/API/apiConnection";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Envoyer les données du formulaire dans l'API
  const formSubmit = async () => {
    try {
      const response = await apiConnect.post("/contact", formData);
      console.info(response);
    } catch (error) {
      console.info(error);
    }
  };
  const handleSumbit = (e) => {
    e.preventDefault();
    formSubmit();
    console.info(formData);
  };

  return (
    <div className={`${styles.containerCard}`}>
      je vais
      <Card className={`${styles.card} `}>
        <div className={styles.containerContact}>
          <h1 className={styles.title}>Contact</h1>
          <Form onSubmit={handleSumbit} className={styles.form}>
            <Form.Group className={styles.formGroup} controlId="formBasicEmail">
              <Form.Label className={styles.label}>Nom</Form.Label>
              <Form.Control
                className={styles.input}
                type="text"
                placeholder="Entrez votre nom"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="formBasicEmail">
              <Form.Label className={styles.label}>Email</Form.Label>
              <Form.Control
                className={styles.input}
                type="email"
                placeholder="Entrez votre email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className={styles.formGroup} controlId="message">
              <Form.Label className={styles.label}>Message</Form.Label>
              <Form.Control
                className={styles.input}
                type="text"
                placeholder="Entrez votre message"
                as="textarea"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </Form.Group>

            <div className={styles.buttonContainer}>
              <Button type="submit" className={styles.button}>
                Envoyer
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default Contact;
