import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import FicheUser from "./pages/FicheUser";
import AuthContext from "./context/auth_context";
// import AuthForm from "./components/Auth/AuthForm";

function App() {
  const authCtx = useContext(AuthContext);
  const { isLoggedIn } = authCtx;
  return (
    <div className="App">
  {/* {!isLoggedIn && <AuthForm />} */}
      {/* <Home />
      <FicheUser />
      <Sidebar /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="user" element={<FicheUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
