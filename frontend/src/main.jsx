// import { AuthContextProvider } from "./context/auth_context";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    
    {/* <AuthContextProvider> */}
    <App />
    {/* </AuthContextProvider> */}
  
  </React.StrictMode>
);
