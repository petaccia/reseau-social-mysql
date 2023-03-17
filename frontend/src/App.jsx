import React, { useContext } from "react";
import AuthContext from "./context/auth_context";
import Home from "@pages/Home";
import FicheUser from "@pages/FicheUser";
import MainHeader from "@components/layout/MainHeader";
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  const authCtx= useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      <Home />
      <FicheUser />
      <MainHeader />
      {/* {!isLoggedIn && <AuthForm />}
      <Test /> */}
      {/* <Router>
        <Routes>
          <Route path="connexion" element={< />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
