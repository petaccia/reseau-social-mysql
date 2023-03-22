import React, { useContext } from "react";
import "../styles/_test.scss";
import axios from "axios";
import Button from "../components/UI/Button";
import AuthContext from "../context/auth_context";
import Sidebar from "@components/layout/Sidebar";

function FicheUser() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;

  const url = `http://localhost:5000/users/fiche/?userId=${authCtx.user}`;
  axios.get(url, { headers: { Authorization: `Bearer ${authCtx.token}` } });

  return (
    <div className="test">
      <Sidebar />
      {isLoggedIn && <p>Ceci est un test</p>}
      {!isLoggedIn && <p>vous n'êtes pas connecté</p>}
      {isLoggedIn && <p>Bienvenue, vous êtes connecté</p>}
      {isLoggedIn && <p>votre user :{authCtx.user}</p>}
      {isLoggedIn && <p className="token">votre Token :{authCtx.token}</p>}
      {isLoggedIn && <Button onClick={authCtx.logout}>Se déconnecter</Button>}
    </div>
  );
}

export default FicheUser;
