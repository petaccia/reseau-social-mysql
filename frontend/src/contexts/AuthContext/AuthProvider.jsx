import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import apiConnect from "../../services/API/apiConnection.jsx";
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiConnect.post("/login", { email, password });
      console.log("Api Response", res);
      if (res.status === 200 && res.data.user.roleId === 3) {
        setCurrentUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", "true");
        return res.data;
      } else {
        throw res;
      }
    } catch (error) {
      console.error("login error", error);
      if (error.response) {
        console.error("error.response.data", error.response.data);
        console.error("error.response.status", error.response.status);
        console.error("error.response.headers", error.response.headers);
        throw error.response;
      } else if (error.request) {
        console.error("error.request", error.request);
        throw new Error("Aucune réponse de l'API");
      } else {
        console.error("error.message", error.message);
        throw new Error(
          "Une erreur est survenue lors de la création de la requête"
        );
      }
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await apiConnect.post("/signup", {
        username,
        email,
        password,
      });
      if (res.status === 201) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", "true");
        return res.data;
      } else {
        throw new Error("Une erreur est survenue");
      }
    } catch (error) {
      console.error("signup error", error);
      if (error.response) {
        console.error("error.response.data", error.response.data);
        console.error("error.response.status", error.response.status);
        console.error("error.response.headers", error.response.headers);
        throw error.response;
      } else if (error.request) {
        console.error("error.request", error.request);
        throw new Error("Aucune réponse de l'API");
      } else {
        console.error("error.message", error.message);
        throw new Error(
          "Une erreur est survenue lors de la création de la requête"
        );
      }
    }
  };

  const logout = () => {
    try {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, login, signup, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
