import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTask from "./components/pages/AddTask";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddTask" element={<AddTask />} />
      </Routes>
    </Router>
  );
}

export default App;
