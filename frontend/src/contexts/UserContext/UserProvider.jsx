import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";
import {
  toastSuccess,
  toastError,
} from "../../services/Toastify/toastConfig.jsx";
// import TokenContext from "../TokenContext/TokenContext.jsx";
import { useNavigate } from "react-router-dom";


const UserProvider = ({ children }) => {
  const navigate= useNavigate();
  // Token de l'utilisateur dans le contexte
  // const {setToken} = useContext(TokenContext)


  // Etat pour tous les utilisateurs
  const [users, setUsers] = useState([]);

  // Etat pour l'utilisateur actuel
  const [currentUser, setCurrentUser] = useState(null);

  // Fonction pour récupérer tous les utilisateurs
  const getAllUsers = async () => {
    try {
      const res = await apiConnect.get("/user");
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  // Fonction pour récupérer l'utilisateur actuel
  const getUser = async (user) => {
    if (!user || !user.id) {
    console.log("--------->getUser",user)
    return;
    }
    try {
      const res = await apiConnect.get(`/user/${user.id}`);
      console.log("--------->getUser",res)
      setCurrentUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour ajouter un utilisateur
  const addUser = async (user) => {
    try {
      const res = await apiConnect.post("/user", user);
      setUsers((prevUser) => [...prevUser, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour modifier l'utilisateur
  const updateUser = async (user) => {
    try {
      const res = await apiConnect.put(`/user/${user.id}`, user);
      setUsers((prevUser) => [...prevUser, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour supprimer l'utilisateur
  const deleteUser = async (id) => {
    try {
     await apiConnect.delete(`/user/${id}`);
      setUsers((prevUser) => prevUser.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Fonction pour récupérer l'utilisateur actuel
  const currentUserLogin = async (credential) => {
    console.log("Fonction currentUserLogin est lancé");
    try {
      const res = await apiConnect.post("/login", credential);
      console.log("--------->Login ", res.data);
      if (res && res.data && res.data.token) {
        // Stocker le token dans le contexte
       localStorage.setItem("token", res.data.token);

        // Mettre à jour l'état de l'utilisateur actuel
        setCurrentUser(res.data.user);
        toastSuccess("Vous êtes connecté");
        navigate("/home");
        
      } else {
        toastError("Réponse inattendue du serveur");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toastError(error.response.data.message);
      } else {
        toastError("Erreur lors de la connexion. Veuillez réessayer.");
      }
    }
  };

  // Définir l'utilisateur après une connexion ou une inscription réussie

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{
        users,
        currentUser,
        getUser,
        getAllUsers,
        addUser,
        updateUser,
        deleteUser,
        currentUserLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
