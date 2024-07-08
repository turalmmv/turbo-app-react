import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Navigate to="/register" />} />
            </Routes>
        </Router>
    );
}

export default App;
