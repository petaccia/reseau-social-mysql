import React, { useContext } from "react";
import AuthForm from "@components/Auth/AuthForm";
import Test from "@components/test";
import AuthContext from "./context/auth_context";
// import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  const authCtx= useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      {!isLoggedIn && <AuthForm />}
      <Test />
      {/* <Router>
        <Routes>
          <Route path="connexion" element={< />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
