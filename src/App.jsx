import "./App.css";
import Login from "./app/pages/login";
import MyProfile from "./app/pages/myProfile";
import Dashboard from "./app/pages/dashboard";
import Register from "./app/pages/register";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myProfile" element={<MyProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
