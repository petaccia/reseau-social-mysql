import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Group from "@pages/Group";
// import Home from "./pages/Home";
// import FicheUser from "./pages/FicheUser";
// import AuthForm from "@components/Auth/AuthForm";
// import AuthContext from "./context/auth_context";
// import Connexion from "@pages/Connexion";
// import Sidebar from "@components/layout/Sidebar";
import Register from "@pages/register/Register";
import Login from "@pages/login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}

          {/* <Route path="/" element={<Login />} />  */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
