import React, { useContext, useState } from "react";
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
  const { currentUser } = useContext(UserContext);

  const initialFormData = {
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    email: currentUser.email,
    numberPhone: currentUser.numberPhone,
    adress: currentUser.adress,
    city: currentUser.city,
    postalCode: currentUser.postalCode,
    country: currentUser.country,
  };

  const [file, setFile] = useState(null);
  const [data, setData] = useState(initialFormData);
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [dateOfBirthInput, setDateOfBirthInput] = useState(
    currentUser.dateOfBirth
  );

  const handleChange = (place, value) => {
    const newDataUser = { ...data };
    newDataUser[place] = value;
    setData(newDataUser);
  };

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key) && key !== "image") {
        formData.append(key, data[key]);
      }
    }

    try {
      let updateRoute;

      if (currentUser.userType === "adminFamily") {
        updateRoute = `/adminfamily/${currentUser.id}`;
      } else {
        updateRoute = `/user/${currentUser.id}`;
      }
      const response = await apiConnect.put(updateRoute, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toastSuccess("Profil mis à jour avec succès");
        // Réinitialise les données du formulaire après la mise à jour réussie
        setData(initialFormData);
      } else {
        toastError("Veuillez vérifier vos champs");
      }
    } catch (error) {
      toastError("Erreur lors de la mise à jour du profil");
      console.error("Erreur lors de la mise à jour du profil", error.response);
    }
  };

  return (
    <div className="containerPageProfilUser">
      <h1 className="titleProfilUser">Page de profil</h1>
      <div className="profil-container">
        <div className="image-container">
          <h2 className="image-title">Photo de profil</h2>
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : `${import.meta.env.VITE_BACKEND_URL}/${
                    currentUser.profilePicture
                  }`
            }
            alt="Profil de l'utilisateur"
            className="image"
          />
          <input
            className="input"
            id="image"
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <div className="form-container-user">
          <form action="" className="user-form" onSubmit={handleUpdateForm}>
            <div className="form-group">
              <label className="label" htmlFor="lastname">
                Nom
              </label>
              <input
                className="input"
                id="lastname"
                type="text"
                name="lastname"
                value={data.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="firstname">
                Prénom
              </label>
              <input
                className="input"
                id="firstname"
                type="text"
                name="firstname"
                value={data.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="birthday">
                Date de naissance
              </label>
              <div className="input">
                <CustomCalendar
                  value={dateOfBirthInput}
                  onChange={(date) => setDateOfBirthInput(date)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="phone">
                Téléphone
              </label>
              <input
                className="input"
                id="phone"
                type="text"
                name="numberPhone"
                value={data.numberPhone}
                onChange={(e) => handleChange("numberPhone", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="adress">
                Adresse
              </label>
              <input
                className="input"
                id="adress"
                type="text"
                name="adress"
                value={data.adress}
                onChange={(e) => handleChange("adress", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="city">
                Ville
              </label>
              <input
                className="input"
                id="city"
                type="text"
                name="city"
                value={data.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="postalCode">
                Code postal
              </label>
              <input
                className="input"
                id="postalCode"
                type="text"
                name="postalCode"
                value={data.postalCode}
                onChange={(e) => handleChange("postalCode", e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="country">
                Pays
              </label>
              <input
                className="input"
                id="country"
                type="text"
                name="country"
                value={data.country}
                onChange={(e) => handleChange("country", e.target.value)}
              />
            </div>
            {currentUser.userType === "adminFamily" && (
              <div className="form-group">
                <label className="label" htmlFor="familyName">
                  Famille
                </label>
                <input
                  className="input"
                  id="familyName"
                  type="text"
                  name="familyName"
                  value={data.familyName}
                  onChange={(e) => handleChange("familyName", e.target.value)}
                />
              </div>
            )}
            <button type="submit" className="update-button">
              Mettre à jour
            </button>
          </form>
        </div>
        <div className="button-container">
          <button
            type="button"
            className="button"
            onClick={() => setIsModalOpenPassword(true)}
          >
            Modifier mot de passe
          </button>
          <ModalPassword
            isOpen={isModalOpenPassword}
            onClose={() => setIsModalOpenPassword(false)}
          />
          <button
            type="button"
            className="button"
            onClick={() => setIsModalOpenEmail(true)}
          >
            Modifier email
          </button>
          <ModalEmail
            isOpen={isModalOpenEmail}
            onClose={() => setIsModalOpenEmail(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilUser;
