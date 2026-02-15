import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { validateEmail } from "../../utils/helper";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    // Clear error if everything is fine
    setError(null);

    // Dummy login logic (replace later with API call)
    console.log("Login submitted:", { email, password });
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border rounded-lg bg-white px-7 py-16 shadow-md">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl font-semibold mb-7 text-center">
              Login
            </h4>

            {/* Email Input */}
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <PasswordInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-xs pb-1 mt-2">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button type="submit" className="btn-primary w-full mt-4">
              Login
            </button>

            {/* Sign up link */}
            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary underline"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
