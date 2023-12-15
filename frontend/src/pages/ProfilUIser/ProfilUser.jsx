import React, { useContext, useState } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { RxAvatar } from "react-icons/rx";
import UserContext from "../../contexts/UserContext/UserContext.jsx";
import ModalPassword from "../../components/modals/ModalPassword/ModalPassword.jsx";
import ModalEmail from "../../components/modals/ModalEmail/ModalEmail.jsx";
import {
  toastError,
  toastSuccess,
} from "../../services/Toastify/toastConfig.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";
import "./ProfilUser.scss";
import CustomCalendar from "../../components/Accessories/Calendar/CustomCalendar.jsx";

const ProfilUser = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const initialFormData = {
    firstname: currentUser.firstname || "",
    lastname: currentUser.lastname || "",
    dateOfBirth: currentUser.dateOfBirth || new Date(),
    numberPhone: currentUser.numberPhone || "",
    adress: currentUser.adress || "",
    city: currentUser.city || "",
    postalCode: currentUser.postalCode || "",
    country: currentUser.country || "",
  };

  const [file, setFile] = useState(null);
  const [data, setData] = useState(initialFormData);
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);

  // Vérifier si l'image du profil existe ou sinon afficher un avatar par defaut
  const profilePicture = currentUser.profilePicture
    ? `${import.meta.env.VITE_BACKEND_URL}/${currentUser.profilePicture}`
    : null;

  const handleChange = (place, value) => {
    const newDataUser = { ...data };
    newDataUser[place] = value;
    setData(newDataUser);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageForm = async (e) => {
    e.preventDefault();
    if (!file) {
      toastError("Veuillez sélectionner une image à uploader.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Ajoutez uniquement le fichier image

    let imageRoute;
    if (currentUser.roleId === 1) {
      imageRoute = `/adminfamily/${currentUser.id}/image/profil/admin`;
    } else if (currentUser.roleId === 3) {
      imageRoute = `/user/${currentUser.id}/image/profil/user`;
    }

    try {
      const imageResponse = await apiConnect.put(imageRoute, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (imageResponse.status === 200 && imageResponse.data) {
        toastSuccess("Image de profil mise à jour avec succès");

        // Mettre à jour l'état currentUser avec le nouveau chemin de l'image de profil
        const updatedUser = {
          ...currentUser,
          profilePicture: imageResponse.data.profilePicture,
        };
        setCurrentUser(updatedUser); //  cette fonction est définie pour mettre à jour l'utilisateur courant dans le contexte
      }
    } catch (error) {
      toastError("Erreur lors de la mise à jour de l'image de profil");
      console.error(
        "Erreur lors de la mise à jour de l'image de profil",
        error
      );
    }
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();

    const updateData = {
      ...data,
    };

    let updateRoute;

    if (currentUser.roleId === 1) {
      updateRoute = `/adminfamily/${currentUser.id}`;
    } else if (currentUser.roleId === 3) {
      updateRoute = `/user/${currentUser.id}`;
    }
    try {
      const response = await apiConnect.put(updateRoute, updateData);

      if (response.status === 200 && response.data) {
        toastSuccess("Profil mis à jour avec succès");
      } else {
        toastError("Veuillez vérifier vos champs");
      }
    } catch (error) {
      toastError("Erreur lors de la mise à jour du profil");
      console.error("Erreur lors de la mise à jour du profil", error.response);
    }
  };
  return (
    <Container className="profil-user  ">
      <Row className="rowProfilUser justify-content-center">
        <Col sm={12} md={10} lg={8} className="colProfilUser ms-md-5 mb-5 ">
          <div className="profil p-5 border border rounded-5 mb-5 ">
            <h2 className="image-title mb-5 text-center">Photo de profil</h2>
            <div className="image-container d-flex flex-column flex-md-row  justify-content-around align-items-center ">
              <Button
                type="button"
                className="button d-flex mb-4 mb-md-0 mx-4"
                onClick={handleImageForm}
              >
                Mettre à jour l'image
              </Button>
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profil de l'utilisateur"
                  className="image  rounded-circle w-50 h-50 d-flex justify-content-center align-items-center"
                />
              ) : (
                <RxAvatar className="avatar rounded-circle w-50 h-50 d-flex justify-content-center align-items-center" />
              )}
            </div>

            <Form.Control
              className="input-file mt-3 mb-5"
              id="image"
              type="file"
              onChange={handleFileUpload}
            />
            {/* <div className="form-container-user"> */}
            <Form onSubmit={handleUpdateForm} className="user-form ">
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="lastname">
                  Nom
                </Form.Label>
                <Form.Control
                  className="input"
                  id="lastname"
                  type="text"
                  name="lastname"
                  value={data.lastname}
                  onChange={(e) => handleChange("lastname", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="firstname">
                  Prénom
                </Form.Label>
                <Form.Control
                  className="input"
                  id="firstname"
                  type="text"
                  name="firstname"
                  value={data.firstname}
                  onChange={(e) => handleChange("firstname", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-4" controlId="birthday">
                <Form.Label>Date de naissance</Form.Label>
                <div className="custom-calendar-container">
                  <CustomCalendar
                    value={data.dateOfBirth}
                    onChange={(date) => setData({ ...data, dateOfBirth: date })}
                  />
                </div>
              </Form.Group>
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="phone">
                  Téléphone
                </Form.Label>
                <Form.Control
                  className="input"
                  id="phone"
                  type="text"
                  name="numberPhone"
                  value={data.numberPhone}
                  onChange={(e) => handleChange("numberPhone", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="adress">
                  Adresse
                </Form.Label>
                <Form.Control
                  className="input"
                  id="adress"
                  type="text"
                  name="adress"
                  value={data.adress}
                  onChange={(e) => handleChange("adress", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="city">
                  Ville
                </Form.Label>
                <Form.Control
                  className="input"
                  id="city"
                  type="text"
                  name="city"
                  value={data.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="postalCode">
                  Code postal
                </Form.Label>
                <Form.Control
                  className="input"
                  id="postalCode"
                  type="text"
                  name="postalCode"
                  value={data.postalCode}
                  onChange={(e) => handleChange("postalCode", e.target.value)}
                />
              </Form.Group>
              <Form.Group className="form-group mb-4">
                <Form.Label className="Form.Label" htmlFor="country">
                  Pays
                </Form.Label>
                <Form.Control
                  className="input"
                  id="country"
                  type="text"
                  name="country"
                  value={data.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                />
              </Form.Group>
              {currentUser.userType === "adminFamily" && (
                <Form.Group className="form-group mb-4">
                  <Form.Label className="Form.Label" htmlFor="familyName">
                    Famille
                  </Form.Label>
                  <Form.Control
                    className="input"
                    id="familyName"
                    type="text"
                    name="familyName"
                    value={data.familyName}
                    onChange={(e) => handleChange("familyName", e.target.value)}
                  />
                </Form.Group>
              )}
              <div className="button-container d-flex justify-content-center">
                <Button type="submit" className="update-button w-50 ">
                  Mettre à jour
                </Button>
              </div>
            </Form>
          </div>
          <div className="button-container mt-5 mb-5 d-flex justify-content-around">
            <Button
              type="button"
              className="button w-25"
              onClick={() => setIsModalOpenPassword(true)}
            >
              Modifier mot de passe
            </Button>
            <ModalPassword
              isOpen={isModalOpenPassword}
              onClose={() => setIsModalOpenPassword(false)}
            />
            <Button
              type="button"
              className="button w-25"
              onClick={() => setIsModalOpenEmail(true)}
            >
              Modifier email
            </Button>
            <ModalEmail
              isOpen={isModalOpenEmail}
              onClose={() => setIsModalOpenEmail(false)}
            />
          </div>
          {/* </div> */}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilUser;
