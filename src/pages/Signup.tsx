import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./login.css";

export function Signup() {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/account");
    }
  }, [isLoggedIn, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [identifierType, setIdentifierType] = useState<"email" | "phone" | "">(
    "",
  );

  // Detect identifier type as user types
  useEffect(() => {
    const identifier = formData.identifier.trim();
    if (!identifier) {
      setIdentifierType("");
      return;
    }

    const isEmail = /\S+@\S+\.\S+/.test(identifier);
    const isPhone = /^\d+$/.test(identifier);

    if (isEmail) {
      setIdentifierType("email");
    } else if (isPhone) {
      setIdentifierType("phone");
    } else {
      setIdentifierType("");
    }
  }, [formData.identifier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    // Name validation
    if (formData.name.trim().length < 2) {
      setError("Please enter your full name");
      return false;
    }

    // Identifier validation
    const isEmail = /\S+@\S+\.\S+/.test(formData.identifier);
    const isPhone = /^\d{10}$/.test(formData.identifier);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or 10-digit mobile number");
      return false;
    }

    // Password validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Create account using the login function with name
      login(formData.identifier, formData.name);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <div className="login-card">
          <h2 className="login-title">Create Account</h2>
          <p className="login-subtitle">Join us today and start shopping</p>

          {error && (
            <Alert
              variant="danger"
              dismissible
              onClose={() => setError("")}
              className="modern-alert">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSignup}>
            {/* Full Name */}
            <Form.Group className="mb-3">
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  className="login-input with-icon"
                />
              </div>
            </Form.Group>

            {/* Email or Phone */}
            <Form.Group className="mb-3">
              <div className="input-wrapper">
                {identifierType === "phone" ? (
                  <Phone size={18} className="input-icon" />
                ) : (
                  <Mail size={18} className="input-icon" />
                )}
                <Form.Control
                  type="text"
                  id="identifier"
                  name="identifier"
                  placeholder="Email or mobile number"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                  autoComplete={identifierType === "phone" ? "tel" : "email"}
                  className="login-input with-icon"
                />
              </div>
              {identifierType === "phone" && formData.identifier.length > 0 && (
                <small
                  style={{
                    color:
                      formData.identifier.length === 10 ? "#28a745" : "#999",
                    fontSize: "0.75rem",
                    marginTop: "0.25rem",
                    display: "block",
                  }}>
                  {formData.identifier.length}/10 digits
                </small>
              )}
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3">
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password (min. 6 characters)"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <Form.Group className="mb-4">
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <Form.Control
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                  className="login-input with-icon with-toggle"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="password-toggle"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }>
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </Form.Group>

            {/* Terms and Conditions */}
            <p
              style={{
                fontSize: "0.75rem",
                color: "#666",
                marginBottom: "1rem",
                lineHeight: "1.4",
              }}>
              By creating an account, you agree to our{" "}
              <Link
                to="/terms"
                style={{ color: "#d41616", textDecoration: "none" }}>
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                style={{ color: "#d41616", textDecoration: "none" }}>
                Privacy Policy
              </Link>
            </p>

            <Button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </Form>

          <div className="login-divider">
            <span>or</span>
          </div>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
