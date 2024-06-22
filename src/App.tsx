import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import MainPage from "./MainPage";
import EmployeeEdit from "./EmployeeEdit";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee/edit/:id" element={<EmployeeEdit />} />
        {/* 其他路由 */}
      </Routes>
    </Router>
  );
};

export default App;
