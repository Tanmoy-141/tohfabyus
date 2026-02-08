import { Footer } from "../components/footer.tsx";
import { Link } from "react-router-dom";
import "./about.css";
import souravImg from "../assets/creators/souravmitra.jpg";
import utsaImg from "../assets/creators/utsa3.jpg";
import { useState } from "react";

export function AboutUs() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const openImage = (src: string) => setActiveImage(src);
  const closeImage = () => setActiveImage(null);

  return (
    <>
      <div className="page-wrapper about-bg about-page">
        <div className="container-fluid page-content mt-3">
          <h4 className="about-title d-flex">
            <Link to="/" className="brand-link">
              <span className="about-highlight">TOHFA by US</span>
            </Link>{" "}
            from Sourav and Utsa Mitra.
          </h4>
          <p className="about-description mt-3">
            We'd love to hear from you. Reach out to us anytime.
          </p>

          <div className="contact-links mt-3 d-flex">
            {/* WhatsApp */}
            <a
              href="https://wa.me/+7980062879"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item gap-2"
              role="link"
              aria-label="Contact us on WhatsApp">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.48 0 .12 5.36.12 11.94c0 2.1.55 4.16 1.6 5.99L0 24l6.23-1.63a11.9 11.9 0 0 0 5.83 1.49h.01c6.58 0 11.94-5.36 11.94-11.94a11.9 11.9 0 0 0-3.49-8.44zM12.07 21.4a9.47 9.47 0 0 1-4.83-1.32l-.35-.2-3.7.97.99-3.6-.23-.37a9.45 9.45 0 1 1 8.12 4.52zm5.2-7.08c-.29-.14-1.72-.85-1.99-.94-.27-.1-.47-.14-.67.14-.2.29-.77.94-.95 1.13-.17.2-.35.22-.64.07-.29-.14-1.22-.45-2.33-1.43-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.35.43-.52.14-.17.19-.29.29-.49.1-.2.05-.37-.02-.52-.07-.14-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.29-1.05 1.03-1.05 2.52s1.08 2.93 1.23 3.13c.14.2 2.12 3.24 5.13 4.54.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.27-.2-.56-.35z" />
              </svg>
              <span className="me-2 mb-2">WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href="mailto:souravmitra045@gmail.com"
              className="contact-item gap-2"
              role="link"
              aria-label="Send us an email">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <span className="me-2 mb-2">Email</span>
            </a>

            {/* Phone */}
            <a
              href="tel:+919836676041"
              className="contact-item gap-2"
              role="link"
              aria-label="Call us at +91 983 667 6041">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                <path d="M22 16.92V21a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h4.09a2 2 0 0 1 2 1.72c.12.81.31 1.6.57 2.35a2 2 0 0 1-.45 2.11L9.91 10.91a16 16 0 0 0 6.18 6.18l1.73-1.3a2 2 0 0 1 2.11-.45c.75.26 1.54.45 2.35.57A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="mb-2">Call us</span>
            </a>
          </div>
        </div>

        <div className="creators-section mb-5">
          <h5 className="creators-title"> Messages from Us:</h5>

          <div className="creators-grid">
            {/* Sourav */}
            <div className="creator-card">
              <img
                src={souravImg}
                alt="Sourav Mitra"
                className="creator-image clickable"
                onClick={() => openImage(souravImg)}
              />
              <h6 className="creator-name">
                <a
                  href="https://www.facebook.com/Souravseverus"
                  target="_blank"
                  rel="noopener noreferrer">
                  Sourav Mitra
                </a>
              </h6>
              <p className="creator-quote">"কিনলে কিনুন, নাহলে আসুন।"</p>
            </div>

            {/* Utsa */}
            <div className="creator-card">
              <img
                src={utsaImg}
                alt="Utsa Mitra"
                className="creator-image clickable"
                onClick={() => openImage(utsaImg)}
              />
              <h6 className="creator-name">
                <a
                  href="https://www.facebook.com/utsa.tarafdar.5"
                  target="_blank"
                  rel="noopener noreferrer">
                  Utsa Mitra
                </a>
              </h6>
              <p className="creator-quote">
                " 'হারিয়ে যাওয়ার টিকিট' পড়বেন? রাখব? "
              </p>
            </div>
          </div>
        </div>

        <div className="follow-us mt-5">
          <p className="follow-text">Follow us on :</p>
          <div className="social-links d-flex">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1C28tw8Hpu/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              aria-label="Facebook">
              <div className="icon-box me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentcolor"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.3v-2.9h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.4v1.7h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" />
                </svg>
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/tohfabyus?igsh=MTBlbWR2Z25sMTdl"
              target="_blank"
              rel="noopener noreferrer"
              className="social-item"
              aria-label="Instagram">
              <div className="icon-box me-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8zM17.6 6.4a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                </svg>
              </div>
            </a>
          </div>
        </div>
        {activeImage && (
          <div className="image-modal" onClick={closeImage}>
            <img
              src={activeImage}
              alt="Creator full view"
              className="modal-image"
              onClick={(e) => e.stopPropagation()}
            />
            <span className="modal-close" onClick={closeImage}>
              x
            </span>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
}
