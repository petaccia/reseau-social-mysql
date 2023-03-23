import React, { useContext, useState, useEffect } from "react";
import "../styles/_test.scss";
import axios from "axios";
import Button from "../components/UI/Button";
import AuthContext from "../context/auth_context";

function FicheUser() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn, user, token } = authCtx;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn && user && token) {
      const url = `http://localhost:5000/users/fiche/?userId=${user}`;
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => setUserData(response.data))
        .catch((error) => console.log(error));
    }
  }, [isLoggedIn, user, token]);

  return (
    <div className="test">
      {/* <Sidebar /> */}
      {isLoggedIn && userData && (
        <p>Bienvenue {userData.name}, vous êtes connecté</p>
      )}
      {!isLoggedIn && <p>Vous n'êtes pas connecté</p>}
      {isLoggedIn && <p>Votre user : {user}</p>}
      {isLoggedIn && <p className="token">Votre Token : {token}</p>}
      {isLoggedIn && <Button onClick={authCtx.logout}>Se déconnecter</Button>}
    </div>
  );
}
export default FicheUser;
