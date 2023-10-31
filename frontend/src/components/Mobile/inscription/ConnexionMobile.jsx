import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ConnexionMobile.scss";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import AuthContext from "../../../contexts/AuthContext/AuthContext.jsx";
import {
  toastError,
  toastSuccess,
} from "../../../services/Toastify/toastConfig.jsx";
import Logo from "../../../assets/Logo/logo_noir.png";

const Connexion = () => {
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
            `Bienvenue ${name} ! Votre compte a été créé avec succès et est en attente de validation par un administrateur familial ! 👋`
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
    <Container fluid className="containerMobile">
      <Row>
        <Col className="d-flex justify-content-center align-items-center">
          <img src={Logo} className="logo" alt="logo" />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="title">{isLogin ? "Login" : "Sign Up"}</h1>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group>
                <Form.Control
                  type="text"
                  name="familyName"
                  placeholder="Nom de la famille à rejoindre"
                  onChange={handleChange}
                  value={formData.familyName}
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
              <Form.Group>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  onChange={handleChange}
                  value={formData.username}
                  className="form-control mb-3"
                />
              </Form.Group>
            )}
            <Button type="submit" variant="primary" className="button mt-3 w-100 ">
              {isLogin ? "Connexion" : "Inscription"}
            </Button>
          </Form>
          {!isLogin && (
            <Form.Group>
              <Form.Check
                type="checkbox"
                id="adminCheckbox"
                label="S'inscrire en tant qu'administrateur"
                checked={isFamilyAdmin}
                onChange={() => setIsFamilyAdmin(!isFamilyAdmin)}
                className="checkboxAdmin mt-5"
              />
            </Form.Group>
          )}
          <div className="text-center position-relative ">
            <p className="text mt-5 text-color:#000 ">
              {isLogin ? "Pas encore inscrit ?" : "Déjà inscrit ?"}{" "}
              <a href="#" onClick={switchMode}>
                {isLogin ? "Inscrivez-vous" : "Connectez-vous"}
              </a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Connexion;
