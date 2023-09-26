import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";
import {
  toastError,
} from "../../services/Toastify/toastConfig.jsx";

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  // gérer les erreurs
  const handleApiError = (error) => {
    console.error("handleApiError in AuthProvider", error);
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
  };
  const loginUnified = async (email, password) => {
    try {
      const res = await apiConnect.post("/login", { email, password });
      console.info("Api Response", res);
      if (res.status === 200) {
        setUserType(res.data.userType);
        setAuthUser(res.data.user);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", "true");
        return res.data;
      }
      throw res;
    } catch (error) {
      console.error("login error", error);
      handleApiError(error);
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
        navigate("/login");
      }
      throw new Error("Une erreur est survenue");
    } catch (error) {
      handleApiError(error.message());
    }
  };

  const signupAdminFamily = async (familyName, username, email, password) => {
    try {
      const res = await apiConnect.post("/signupAdmin", {
        familyName,
        username,
        email,
        password,
      });
      console.log("response du serveur ", res.data);
      if (res.status >= 200 && res.status < 300) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/login");
      }
      return res.data;
    } catch (error) {
      console.log("error", error);
      handleApiError(error);
      throw error;
    }
  };
  const logout = () => {
    try {
      setIsAuthenticated(false);
      setToken(null);
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      navigate("/login");
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        userType,
        authUser,
        loginUnified,
        signup,
        logout,
        signupAdminFamily,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
