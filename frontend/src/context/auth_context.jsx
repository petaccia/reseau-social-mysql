import React, { createContext, useState } from "react";

const defaultValue = {
  token: "",
  user: null,
  userIsLoggedin: false,
  login: () => {},
  logout: () => {},
  // closeModal: () => {},
};

const AuthContext = createContext(defaultValue);
const tokenLocalStorage = localStorage.getItem("token");
const userIdLocalStorage = localStorage.getItem("id");

export function AuthContextProvider({ children }) {
  const [token, setToken] = useState(tokenLocalStorage);
  const [user, setUser] = useState(userIdLocalStorage);

  const loginHandler = (tok, id) => {
    setToken(token);
    setUser(id);
    // mettre le token dans le local Storage
    localStorage.setItem("token", tok);
    localStorage.setItem("id", id);
  };

  const logoutHandler = () => {
    setToken(null);
    setUser(null);
    // supprimer la donnée dans le local storage
    localStorage.removeItem("token");
    localStorage.removeItem("id");
  };

  const userIsLoggedin = !!token;

  const contextValue = {
    token,
    user,
    isLoggedIn: userIsLoggedin,
    login: loginHandler,
    logout: logoutHandler,
    // closeModal: closeModal,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
// };
export default AuthContext;
