import React, { useState } from "react";
import Login from "./login";
import SignUp from "./SignUp";





const AuthForm = () => {
  const [activeForm, setActiveForm] = useState("login");

  const handleSwitchForm = (form) => {
    setActiveForm(form);
  };


  return(
  <>
      <div className="auth-switch-buttons">
        <button onClick={() => handleSwitchForm("login")}>
          Se connecter
        </button>
        <button onClick={() => handleSwitchForm("signup")}>
          S'inscrire
        </button>
        </div>

      {activeForm === "login" && <Login />}
      {activeForm === "signup" && <SignUp />}
    </>

  );
};

export default AuthForm;
