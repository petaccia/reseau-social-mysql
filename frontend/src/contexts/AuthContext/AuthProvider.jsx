import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext.jsx";
import apiConnect from "../../services/API/apiConnection.jsx";
import { toastError } from "../../services/Toastify/toastConfig.jsx";

const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = !!Cookies.get("token");
    setIsAuthenticated(authStatus);
  }, []);

  // gérer les erreurs
  const handleApiError = (error) => {
    console.error("handleApiError in AuthProvider", error);

    if (error.response) {
      if (error.response.status === 401) {
        // Si le token est invalide ou expiré
        Cookies.remove("token");
        setIsAuthenticated(false);
        navigate("/login");
        toastError("Votre session a expiré. Veuillez vous reconnecter.");
        return; // Sortir de la fonction après avoir géré cette erreur spécifique
      }

      console.error("error.response.data", error.response.data);
      console.error("error.response.status", error.response.status);
      console.error("error.response.headers", error.response.headers);
      toastError(error.response.data.message || "Une erreur est survenue 😡");
    } else if (error.request) {
      console.error("error.request", error.request);
      toastError("Aucune réponse de l'API");
    } else {
      console.error("error.message", error.message);
      toastError(error.message || "Une erreur est survenue 😡");
    }
  };
  const loginUnified = async (email, password) => {
    try {
      const res = await apiConnect.post("/login", { email, password });
      console.info("Api Response", res);
      if (res.status === 200) {
        setUserType(res.data.userType);
        setAuthUser(res.data.user);
        Cookies.set("token", res.data.token, { expires: 1 });
        setIsAuthenticated(true);
        navigate("/home");
        return res.data;
      }
      throw res;
    } catch (error) {
      console.error("login error", error);
      handleApiError(error);
    }
  };

  const signupUser = async (familyName, username, email, password) => {
    try {
      const res = await apiConnect.post("/signup", {
        familyName,
        username,
        email,
        password,
      });
      console.log("response du serveur ", res.data);
      if (res.status >= 200 && res.status < 300) {
        Cookies.set("token", res.data.token, { expires: 1 });
        isAuthenticated(true);
        navigate("/login");
      }
      return res.data;
    } catch (error) {
      console.error("signupUser error", error);
      handleApiError(error);
      throw error;
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
        Cookies.set("token", res.data.token, { expires: 1 });
        isAuthenticated(true);
        navigate("/login");
      }
      return res.data;
    } catch (error) {
      console.error("error", error);
      handleApiError(error);
      throw error;
    }
  };
  const logout = () => {
    try {
      setIsAuthenticated(false);
      Cookies.remove("token");
      navigate("/login");
    } catch (error) {
      console.error("logout error", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userType,
        authUser,
        loginUnified,
        signupUser,
        logout,
        signupAdminFamily,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
