import React from "react";

// Création du context de l'authentification

const AuthContext = React.createContext(false);
console.info("-------------------->AuthContext", AuthContext);

export default AuthContext;
