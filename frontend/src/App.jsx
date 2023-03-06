import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ModalConnect from "./components/modalConnect";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="connexion" element={<ModalConnect />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
