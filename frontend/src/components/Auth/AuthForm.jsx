import { useState } from "react";
import axios from "axios";
import Button from "../UI/Button";
import ErrorModal from "@components/UI/ErrorModal";



const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); 

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  
 const  handleSubmit = async (e) => {
  e.preventDefault();
  if (!emailRegex.test(email)) {
   setErrorMessage('Email non valide');
   setShowErrorModal(true);
    return;
  }
  if (!passwordRegex.test(password)) {
   setErrorMessage('Le mot de passe doit contenir au moins 8 caractères avec au moins une lettre majuscule, une lettre minuscule et un chiffre');
   setShowErrorModal(true);
    return;
  }

  try {
    const res = await axios.post('http://localhost:5000/login', { email, password});
    console.log(res);
  } catch (err) {
    console.error(err);
    setErrorMessage('Une erreur est survenue lors de la connexion');
    setShowErrorModal(true);
  }
 };
    

return (
    <>
      <section className="auth-container">
        <h1 className="titre">Se connecter</h1>

        <form onSubmit={handleSubmit} className="form-container">
          {/* structure Email */}
          <input
            type="email"
            placeholder="Email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* structure Password  */}
          <input
            type="password"
            placeholder="Mot de passe"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* {user && <p>Bienvenue, {user.name} ! </p>} */}

         <Button className='button' type={"submit"}  > Envoyer </Button>
        </form>
        {showErrorModal && <ErrorModal message={errorMessage} onClose={() => setShowErrorModal(false)} />}
       
      </section>
    </>
  );
};

export default AuthForm;
