import React from "react";
import "./App.css";
import "./i18n/config";
import Dashboard from "./pages/Dashboard";
import Authentication from "./pages/Authentication";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Authentication />} />
      </Routes>
    </Router>
  );
}

export default App;
