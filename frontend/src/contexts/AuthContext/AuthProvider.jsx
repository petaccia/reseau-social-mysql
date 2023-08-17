import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import apiConnect from "../../services/API/apiConnection.jsx";
import { toastSuccess, toastError } from "../../services/Toastify/toastConfig.jsx";

const AuthProvider = ({ children }) => {
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
      if (res.status === 200) {
        toastSuccess("Connexion réussie");
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/home");
        return res.data;
      }
    } catch (error) {
      console.error("login error", error);
      if (error.response && error.response.data) {
        toastError(error.response.data.message);
      } else {
        toastError(error.message);
      }
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await apiConnect.post("/signup", { username, email, password });
      if (res.status === 201) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/login");
        return res.data;
      }
    } catch (error) {
      console.error("signup error", error);
      if (error.response && error.response.data) {
        toastError(error.response.data.message);
      } else {
        toastError(error.message);
      }
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider ;
