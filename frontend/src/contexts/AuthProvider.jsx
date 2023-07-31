import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext.jsx";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { isAuthenticated: true };
    case LOGOUT:
      return { isAuthenticated: false };
    default:
      return state;
  }
};

const initialState = {
  isAuthenticated: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = () => {
    dispatch({ type: LOGIN });
    console.info("Logging in");
    navigate("/home"); // Redirige vers la page de home  .
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    console.info("Logging out");
    navigate("/login"); // Redirige vers la page de connexion après la déconnexion
    localStorage.setItem("isAuthenticated", "false");
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      dispatch({ type: LOGIN });
    } else if (storedAuth === "false") {
      dispatch({ type: LOGOUT });
    }
  }, []);

  const value = { ...state, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
