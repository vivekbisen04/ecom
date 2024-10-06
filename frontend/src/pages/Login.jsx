import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(
        "https://ecom-2mt1.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      
      

      if (response.ok) {
        console.log("Login successful", data._id);

        // Store JWT token and user info in localStorage

        localStorage.setItem("token", data.token); // Save the token
        localStorage.setItem("user", JSON.stringify(data)); // Save the user info

        // Navigate to user profile or homepage
        navigate("/");
      } else {
        // If login fails, display an error message
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false); // Stop loading spinner
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleLogin}>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="my-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-info">
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button
                  className="my-2 btn btn-dark"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
