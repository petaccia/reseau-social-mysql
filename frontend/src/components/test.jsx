// import React, { useContext } from "react";
// import "../styles/_test.scss";
// import Button from "../components/UI/Button";
// import AuthContext from "../context/auth_context";
// const Test = () => {
//   const authCtx= useContext(AuthContext);
//   const isLoggedIn = authCtx.isLoggedIn;
//   // console.log("-----authCtx-----------");
//   // console.log(authCtx);

  
//   return (
//     <div className="test">
//       {isLoggedIn && <p>Ceci est un test</p>}
//       {! isLoggedIn && <p>vous n'êtes pas connecté</p>}
//       { isLoggedIn && <p>Bienvenue, vous êtes connecté</p>}
//       { isLoggedIn &&  <p>votre user :{authCtx.user}</p>}
//       { isLoggedIn &&  <p>votre Token :{authCtx.token}</p>}
//       { isLoggedIn && <Button onClick={authCtx.logout}>Se déconnecter</Button>}
//     </div>
//   );
// };

// export default Test;
