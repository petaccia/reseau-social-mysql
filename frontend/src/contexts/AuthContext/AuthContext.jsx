import React from "react";

// Création du context de l'authentification

const AuthContext = React.createContext({
  isAuthenticated: false,
  token: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  currentUser: null,
  
});
console.info("-------------------->AuthContext", AuthContext);

export default AuthContext;
