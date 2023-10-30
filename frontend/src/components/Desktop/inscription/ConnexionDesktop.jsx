import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import famille from "../../../assets/illustration/famille.jpg";
import family from "../../../assets/illustration/family.jpg";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import {
  toastError,
  toastSuccess,
} from "../../../services/Toastify/toastConfig.jsx";
import "./ConnexionDesktop.scss";

const ConnexionDesktop = () => {
  const { loginUnified, signupUser, signupAdminFamily } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [isFamilyAdmin, setIsFamilyAdmin] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    familyName: "",
    username: "",
    email: "",
    password: "",
  });

  const validateFields = () => {
    if (!formData.email || !formData.password) {
      toastError("L'adresse mail et le mot de passe sont obligatoires 😡");
      return false;
    }
    if (formData.password.length < 8) {
      toastError("Le mot de passe doit contenir au moins 8 caractères 😡");
      return false;
    }
    if (!isLogin && !formData.username) {
      toastError("Le nom d'utilisateur est obligatoire 😡");
      return false;
    }
    return true;
  };

  const handleErrors = (error) => {
    if (error && error.status) {
      const errorMessage = {
        409: "Cet utilisateur existe déjà 😡",
        400: "Email ou mot de passe incorrect 😡",
        401: "Email ou mot de passe incorrect 😡",
        500: "Erreur serveur",
      };
      toastError(errorMessage[error.status] || "Erreur serveur");
    } else {
      toastError(error.message);
    }
  };

  const auth = async () => {
    if (!validateFields()) return;

    try {
      let response;
      if (isLogin) {
        response = await loginUnified(formData.email, formData.password);
      } else if (isFamilyAdmin) {
        response = await signupAdminFamily(
          formData.familyName,
          formData.username,
          formData.email,
          formData.password
        );
      } else {
        response = await signupUser(
          formData.familyName,
          formData.username,
          formData.email,
          formData.password
        );
      }

      if (response && response.token) {
        console.log("response du serveur ", response);
        let name;
        if (isLogin) {
          name = response.user.firstname;
        } else if (isFamilyAdmin) {
          name = response.newAdminFamily.firstname;
        } else if (response.newUser) {
          name = response.newUser.firstname;
          toastSuccess(
            `Bienvenue ${name} ! Votre compte a été créé avec succès et en attente de validation par un administrateur familial ! 👋`
          );
          navigate("/login");
          return;
        }

        toastSuccess(
          `Bienvenue ${name} ! Vous êtes ${
            isLogin ? "connecté" : "inscrit"
          } ! 👋`
        );
        navigate("/home");
      } else {
        toastError("Erreur lors de la connexion ou de l'inscription 😡");
      }
    } catch (error) {
      console.log("Erreur à l'auth", error);
      handleErrors(error);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth();
  };

  return (
    <Container className="containerDesktop">
      <Row>
        <Col md={6} sm={6} className="imageContainer">
          <img
            src={isLogin ? famille : family}
            alt="Description de l'image"
            className="image img-fluid"
          />
          <div className="buttonContainer">
            <Button
              onClick={switchMode}
              className="switchButton"
              variant="light"
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </Button>
            <p className="switchText">
              {isLogin ? "Pas encore inscrit ?" : "Déjà inscrit ?"}{" "}
              <a href="#" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
              </a>
            </p>
          </div>
        </Col>
        <Col md={6} sm={6} className="containerCard">
          <h1 className="title">{isLogin ? "Login" : "Sign Up"}</h1>
          <Form
            onSubmit={handleSubmit}
            className="containerContact d-flex  align-items-center"
          >
            {!isLogin && (
              <Form.Group>
                <Form.Control
                  type="text"
                  name="familyName"
                  placeholder="Nom de famille"
                  onChange={handleChange}
                  value={formData.familyName}
                  required
                  className="form-control mb-3"
                />
              </Form.Group>
            )}
            {!isLogin && (
              <Form.Group>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  onChange={handleChange}
                  value={formData.username}
                  required
                  className="form-control mb-3"
                />
              </Form.Group>
            )}
            <Form.Group>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
                autoComplete="current-email"
                required
                className="form-control mb-3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                value={formData.password}
                autoComplete="current-password"
                minLength="8"
                required
                className="form-control mb-3"
              />
            </Form.Group>
            {!isLogin && (
              <Form.Group className="checkboxAdminContainer">
                <Form.Check
                  type="checkbox"
                  id="adminCheckbox"
                  label="S'inscrire en tant qu'administrateur"
                  checked={isFamilyAdmin}
                  onChange={() => setIsFamilyAdmin(!isFamilyAdmin)}
                  className="checkboxAdmin"
                  style={{ color: "black" }}
                  required
                />
              </Form.Group>
            )}
            <Button type="submit" variant="light" className="button">
              {isLogin ? "Connexion" : "Inscription"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ConnexionDesktop;
