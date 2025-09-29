import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";

// Import all page components
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";

const App = () => {
  return (
    <div className="app">
      {/* Top Navbar */}
      <Navbar />
      <hr />

      {/* Main Content Area */}
      <div className="app-contents" style={{ display: "flex" }}>
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Page Content (right) */}
        <div className="page-content" style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/add" replace />} />
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
