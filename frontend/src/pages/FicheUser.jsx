import React, {useContext} from 'react';
import "../styles/_test.scss";
import Button from "../components/UI/Button";
import axios from "axios";
import AuthContext from '../context/auth_context';



const FicheUser = () => {
  const authCtx= useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
 

  const url = `http://localhost:5000/users/fiche/?userId=${authCtx.user}`
  axios.get(url, {headers: {Authorization: `Bearer ${authCtx.token}`}})
  
  return (
    <div className="test">
      {isLoggedIn && <p>Ceci est un test</p>} 
      {!isLoggedIn && <p>vous n'êtes pas connecté</p>}
      { isLoggedIn && <p>Bienvenue, vous êtes connecté</p>}
      { isLoggedIn &&  <p>votre user :{authCtx.user}</p>}
      { isLoggedIn &&  <p className='token'>votre Token :{authCtx.token}</p>}
      { isLoggedIn && <Button onClick={authCtx.logout}>Se déconnecter</Button>}
    </div>
  );
};

export default FicheUser