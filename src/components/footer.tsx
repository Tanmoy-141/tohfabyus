import { useState } from "react";
import "./footer.css";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    // You can add your newsletter API call here
  };

  return (
    <footer className="site-footer mt-4">
      <hr />
      <div className="footer-sections d-flex">
        {/* Newsletter */}
        <div className="footer-block">
          <h6 className="footer-title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5z" />
            </svg>
            Newsletter
          </h6>
          <p className="footer-text">
            Stories, books & small updates — occasionally.
          </p>
          <form className="newsletter-form d-flex" onSubmit={handleSubmit}>
            <input
              type="email"
              id="newsletter-email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              aria-label="Email address for newsletter"
            />
            <button type="submit" aria-label="Subscribe to newsletter">
              Subscribe
            </button>
          </form>
        </div>
        {/* Address */}
        <div className="footer-block me-5">
          <h6 className="footer-title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            Address
          </h6>
          <p className="footer-text me-4">
            Garia, West Bengal, Kolkata: 700094
            <br />
            India
          </p>
        </div>
        {/* Enquiry */}
        <div className="footer-block">
          <h6 className="footer-title">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.12.81.31 1.6.57 2.35a2 2 0 0 1-.45 2.11L9.91 10.91a16 16 0 0 0 6.18 6.18l1.73-1.3a2 2 0 0 1 2.11-.45c.75.26 1.54.45 2.35.57A2 2 0 0 1 22 16.92z" />
            </svg>
            Brand Enquiry
          </h6>
          <p className="footer-text d-flex">
            <a href="mailto:souravmitra045@gmail.com">Email us</a>
            <br />
            <a href="tel:+919836676041">Call us</a>
          </p>
        </div>
      </div>
      <div className="footer-content d-flex">
        <p>© 2022 Tohfa by Us. All rights reserved.</p>
        <ul>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Return Policy</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
