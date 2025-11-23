import { useState } from "react";
import { login, signUp } from "../Api";

const AuthModal = ({ closeModal, onLogin }) => {
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleAuth = async () => {
        setError("")
        try {
            let data;
            if (isSignup) {
                // Call signup API
                data = await signUp(email, password); 
                data = await login(email, password);
            } else {
                // Call login API
                data = await login(email, password);
            }
            // Save token
            localStorage.setItem("token", data.token);
            // Notify parent
            onLogin(data);
            // Close modal
            closeModal();
        } catch (err) {
            setError(err.response?.data?.message || "Invalid email or password");
        }
    };
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/20 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/30 w-80 animate-fadeIn">

                <h2 className="text-white text-2xl font-bold mb-4 text-center">
                    {isSignup ? "Create Account" : "Welcome Back"}
                </h2>

                <div className="flex gap-2 justify-center mb-4">
                    <button
                        onClick={() => setIsSignup(false)}
                        className={`px-4 py-1 rounded-full ${
                            !isSignup ? "bg-white/40 text-white" : "bg-white/20"
                        }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setIsSignup(true)}
                        className={`px-4 py-1 rounded-full ${
                            isSignup ? "bg-white/40 text-white" : "bg-white/20"
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/70 mb-3 outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 rounded-lg bg-white/70 mb-3 outline-none"
                />
                {/* Error Message */}
                {error && (
                <p className="text-red-400 text-sm mb-2 text-center">{error}</p>
                )}

                <button
                    onClick={handleAuth}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold shadow-md hover:scale-105 transition"
                >
                    {isSignup ? "Sign Up" : "Login"}
                </button>

                <button
                    onClick={closeModal}
                    className="mt-4 text-white underline text-sm block text-center"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AuthModal;