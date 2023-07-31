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
}

const initialState = {
  isAuthenticated: false,
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = () => {
    dispatch({ type: LOGIN });
    navigate("/home"); // Redirige vers la page de home  .
  }

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login"); // Redirige vers la page de connexion après la déconnexion
  }

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    if (storedAuth) {
      dispatch({ type: LOGIN });
    }
    localStorage.setItem("isAuthenticated", state.isAuthenticated);
  }, [state.isAuthenticated]);

  const value = { ...state, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
