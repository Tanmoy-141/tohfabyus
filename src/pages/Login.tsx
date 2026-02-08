import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export function Login() {
  const { login, isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/account");
    }
  }, [isLoggedIn, navigate]);

  const [identifier, setIdentifier] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const isPhone = /^\d{10}$/.test(identifier);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or 10-digit mobile number");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      login(identifier);

      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <div className="login-card">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to access your account</p>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError("")}
              className="modern-alert">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <Form.Control
                  type="text"
                  id="identifier"
                  name="identifier"
                  placeholder="Email or mobile number"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  autoComplete="username"
                  className="login-input with-icon"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="login-input with-icon with-toggle"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </Form.Group>

            <div className="forgot-password">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <Button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </Form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="login-link">
            Don't have an account? <Link to="/signup">Create one</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
