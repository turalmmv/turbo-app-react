import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // useNavigate hook-u əlavə edin

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                // Tokeni saxlayın və istifadəçinin daxil olduğunu qeyd edin
                navigate("/"); // Müvafiq səhifəyə yönləndirin
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Error logging in", error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;
