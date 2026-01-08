import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../services/tokens";
import "./login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (email.trim() && password.trim()) {
      setTimeout(() => {
        setToken("dummy-token-123");
        navigate("/dashboard");
        setLoading(false);
      }, 800);
    } else {
      setError("Invalid credentials");
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <div className="logo-icon">🚀</div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to access your dashboard</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              <span className="label-icon">📧</span>
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              <span className="label-icon">🔒</span>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="login-button">
            {loading ? (
              <>
                <span className="spinner-small"></span>
                Logging in...
              </>
            ) : (
              <>
                <span className="button-icon">✨</span>
                Sign In
              </>
            )}
          </button>
        </form>
        <div className="login-footer">
          <p className="footer-text">Test credentials: any email/password</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
