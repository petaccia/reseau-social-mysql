import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "@pages/register/Register";
import Login from "@pages/login/Login";
import Public from "@pages/layout/Public";
import Home from "@pages/home/Home";
import Profil from "@pages/Profil";



  
  

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<Public />} >
            <Route path="/home" element={<Home />} />
            <Route path="/profil/:id" element={<Profil />} />
          </Route >
        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
