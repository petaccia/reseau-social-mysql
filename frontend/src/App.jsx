import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import HomeAdmin from "./pages/Backoffice/homeAdmin/HomeAdmin.jsx";
import ProfilAdmin from "./pages/Backoffice/ProfilAdmin.jsx";
import ContactAdmin from "./pages/Backoffice/ContactAdmin.jsx";
import Settings from "./pages/Backoffice/Settings.jsx";
import Connexion from "./pages/Connexion/Connexion.jsx";
import MainLayout from "./pages/Layout/MainLayout.jsx";
import DashBoardLayout from "./pages/Layout/DashBoardLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import Profil from "./pages/Profil/Profil.jsx";

const App = () => {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/connexion/:mode" element={<Connexion />} />
            <Route element={<PrivateRoute />}>
              <Route
                path="/homeAdmin"
                element={
                  <DashBoardLayout>
                    <HomeAdmin />
                  </DashBoardLayout>
                }
              />
              <Route
                path="/profilAdmin"
                element={
                  <DashBoardLayout>
                    <ProfilAdmin />
                  </DashBoardLayout>
                }
              />
              <Route
                path="/contactAdmin"
                element={
                  <DashBoardLayout>
                    <ContactAdmin />
                  </DashBoardLayout>
                }
              />
              <Route
                path="/settings"
                element={
                  <DashBoardLayout>
                    <Settings />
                  </DashBoardLayout>
                }
              />
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
            </Route>
            <Route path="*" element={<Navigate to="/connexion/login" />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
