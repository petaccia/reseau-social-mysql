import { useState } from "react";
import Button from "../UI/Button/Button";


const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const validateLength = (value) => {
    console.log(validateLength)
    return value.trim().length > 0;
  };
  
  const validateEmail = (value) => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(validateEmail);
    return regexEmail.test(value);
  };
  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("onSubmit called");
  if (!validateLength(email) || !validateLength(password)) {
        return;
      }
      if (!validateEmail(email)) {
        console.log('Email invalide :', email);
        return;
      }
      console.log(email, password);
      setEmail('');
      setPassword('');
  };

return (
    <>
      <section className="auth-container">
        <h1 className="titre">Se connecter</h1>

        <form onSubmit={onSubmit} className="form-container">
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

         <Button className='button-authForm' onClick={onSubmit} > Envoyer </Button>
        </form>
      </section>
    </>
  );
};

export default AuthForm;
