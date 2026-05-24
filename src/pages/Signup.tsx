import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import "./Login.css";
import { Helmet } from "react-helmet-async";

export function Signup() {
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/account");
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    identifier: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ derived state (no useEffect needed)
  const identifier = formData.identifier.trim();
  const identifierType: "email" | "phone" | "" = /\S+@\S+\.\S+/.test(identifier)
    ? "email"
    : /^\d+$/.test(identifier)
      ? "phone"
      : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    if (formData.name.trim().length < 2) {
      setError("Please enter your full name");
      return false;
    }

    const isEmail = /\S+@\S+\.\S+/.test(formData.identifier);
    const isPhone = /^\d{10}$/.test(formData.identifier);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or 10-digit mobile number");
      return false;
    }

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

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      signup(formData.identifier); // ✅ correct
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Sign Up | TOHFA BY US</title>
        <link rel="canonical" href="https://tohfabyus.vercel.app/signup" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

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
                className="modern-alert"
              >
                {error}
              </Alert>
            )}

            <Form onSubmit={handleSignup}>
              {/* Name */}
              <Form.Group className="mb-3">
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                    name="identifier"
                    placeholder="Email or mobile number"
                    value={formData.identifier}
                    onChange={handleChange}
                    required
                    className="login-input with-icon"
                  />
                </div>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="login-input with-icon with-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
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
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="login-input with-icon with-toggle"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </Form.Group>

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
    </>
  );
}
