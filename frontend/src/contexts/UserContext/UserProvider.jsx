import React, { useState, useEffect } from "react";
import UserContext from "./UserContext.jsx";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction pour gérer les mises à jour de l'utilisateur
  const updateUser = (users) => {
    setUser(users);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // Fonction pour récupérer l'utilisateur
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  // Fonction pour supprimer l'utilisateur
  const removeUser = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Définir l'utilisateur après une connexion ou une inscription réussie

  useEffect(() => {
    const users = getUser();
    if (users) {
      setUser(users);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
