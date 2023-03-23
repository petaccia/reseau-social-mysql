import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Group from "@pages/Group";
import Home from "./pages/Home";
import FicheUser from "./pages/FicheUser";
import AuthForm from "@components/Auth/AuthForm";
import AuthContext from "./context/auth_context";
import Connexion from "@pages/Connexion";
import Sidebar from "@components/layout/Sidebar";

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  return (
    <div className="App">
      {/* {!isLoggedIn && <AuthForm />}  */}
      <Router>
        <Sidebar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="user" element={<FicheUser />} />
          <Route path="login" element={<Connexion />} /> 

          <Route path="group" element={<Group />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
