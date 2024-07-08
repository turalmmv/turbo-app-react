import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passConfirm, setPassConfirm] = useState("");
    const [emailExists, setEmailExists] = useState(false);
    const [emailExistsMessage, setEmailExistsMessage] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const checkEmailExists = async () => {
        if (!email) return;
        try {
            const response = await fetch(`http://localhost:8080/auth/check-email?email=${email}`);
            const exists = await response.json();
            setEmailExists(exists);
            if (exists) {
                setEmailExistsMessage("Email already exists.");
            } else {
                setEmailExistsMessage("");
            }
        } catch (error) {
            console.error("Error checking email", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailExists) return;

        try {
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, passConfirm }),
            });
            if (response.ok) {
                const data = await response.json();
                setOtpSent(true);
            } else {
                console.error("Registration failed");
            }
        } catch (error) {
            console.error("Error registering user", error);
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/auth/confirm-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ confirm: otp }),
            });
            if (response.ok) {
                alert("Email confirmed successfully! You can now log in.");
                navigate("/login");
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error("Error confirming OTP", error);
        }
    };

    const handleSignIn = () => {
        navigate("/login");
    };

    return (
        <div>
            {!otpSent ? (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={checkEmailExists} // Check email on blur
                            required
                        />
                        <div style={{ color: "red" }}>{emailExistsMessage}</div>
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
                    <div>
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            value={passConfirm}
                            onChange={(e) => setPassConfirm(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                    <button type="button" onClick={handleSignIn}>Sign In</button>
                </form>
            ) : (
                <form onSubmit={handleOtpSubmit}>
                    <div>
                        <label>OTP Code:</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Confirm OTP</button>
                </form>
            )}
        </div>
    );
}

export default RegisterForm;
