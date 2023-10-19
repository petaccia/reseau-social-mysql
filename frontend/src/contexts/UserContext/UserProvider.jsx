import React, { useState, useEffect, useContext } from "react";
import UserContext from "./UserContext.jsx";
import AuthContext from "../AuthContext/AuthContext.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";
import Cookies from "js-cookie";

const UserProvider = ({ children }) => {
  // Récupérer le contexte d'authentification
  const { loginUnified } = useContext(AuthContext);
  // Etat pour tous les utilisateurs
  const [users, setUsers] = useState([]);

  // Etat pour l'utilisateur actuel
  const [currentUser, setCurrentUser] = useState({});

// lire id de l'utilisateur dans le cookie
  
  // useEffect pour récupération de l'utilisateur actuel
  useEffect(() => {
   const userId = Cookies.get("userId");
   console.log("userId in UserProvider : " + userId);
    if (userId) {
      // utiliser Id du login pour récupérer des informations sur l'utilisateur
      getUser({ id: userId });
    }
  }, []);

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
      return;
    }
    console.info("Récupération de l'utilisateur", user);
    try {
      const res = await apiConnect.get(`/user/${user.id}`);
      console.info("Données reçu de l'API", res.data);
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
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

      // Si l'utilisateur mis à jour est l'utilisateur actuel, mettre à jour l'utilisateur actuel
      if (user.id === currentUser.id) {
        setCurrentUser(res.data);
      }
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
    try {
      const user = await loginUnified(credential.email, credential.password);
      if (user && user.id) {
        Cookies.set("userId", user.id, { expires: 1 });
        setCurrentUser(user);
      }
    } catch (error) {
      console.error(error);
    }
  };
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
