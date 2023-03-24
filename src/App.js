import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddTask from "./components/pages/AddTask";
import EditTask from "./components/pages/EditTask";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddTask" element={<AddTask />} />
        <Route path="/EditTask/:id" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
