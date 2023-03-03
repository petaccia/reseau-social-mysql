const AuthForm = () => {
  return(
    <div className="auth-container">
      <h1>Se connecter</h1>
      <form onSubmit={() => {}} className="form-container">

        {/* structure Email */}
        <input type="email" placeholder="Email" id="email" required />

        {/* structure Password  */}
        <input type="password"  placeholder="Mot de passe" id="password" required />

        <button onClick={() => {}} className="btn">
          Envoyer
        </button>

      </form>
    </div>
  )
};

export default AuthForm;