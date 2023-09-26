import { createContext } from "react";

// Création du context de l'authentification

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  userType: null,
  currentUser: null,
  login: () => {},
  signup: () => {},
  logout: () => {},
  signupAdminFamily: () => {},
  loginAdminFamily: () => {},
  
});
console.info("-------------------->AuthContext", AuthContext);

export default AuthContext;
