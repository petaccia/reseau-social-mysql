import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profil from "./pages/Profil/Profil";
import Contact from "./pages/Contact/Contact";
import Connexion from "@pages/Connexion/Connexion";
import AdminFamily from "@pages/Backoffice/AdminFamily";
import MainLayout from "@pages/Layout/MainLayout";
import DashBoardLayout from "@pages/Layout/DashBoardLayout";
import ProfilAdmin from "@pages/Backoffice/ProfilAdmin";
import ContactAdmin from "@pages/Backoffice/ContactAdmin";
import Settings from "@pages/Backoffice/Settings";
import HomeAdmin from "@pages/Backoffice/HomeAdmin";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/home"
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            }
          />
          <Route
            path="/profil"
            element={
              <MainLayout>
                <Profil />
              </MainLayout>
            }
          />
          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />
          <Route
            path="/connexion/:mode"
            element={
              <MainLayout>
                <Connexion />
              </MainLayout>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <DashBoardLayout>
                <AdminFamily />
              </DashBoardLayout>
            }
          />
          <Route path="/homeAdmin" element={<DashBoardLayout><HomeAdmin /></DashBoardLayout>} />
          <Route path="/homeAdmin" element={<DashBoardLayout><ProfilAdmin /></DashBoardLayout>} />
          <Route path="/homeAdmin" element={<DashBoardLayout><ContactAdmin /></DashBoardLayout>} />
          <Route path="/homeAdmin" element={<DashBoardLayout><Settings /></DashBoardLayout>} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
