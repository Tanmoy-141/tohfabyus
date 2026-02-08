import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./account.css";
import { Orders } from "../components/Orders";

export function Account() {
  /* ===============================
     HOOKS — MUST BE AT TOP
  ================================ */
  const { user, isLoggedIn, logout } = useAuth();
  const [tab, setTab] = useState("profile");

  /* ===============================
     AUTH GUARD
  ================================ */
  if (!isLoggedIn || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <h1 className="mt-5 account-header">Account Summary :</h1>

      <div className="account-page">
        <div className="account-container">
          {/* Sidebar */}
          <aside className="account-sidebar">
            <h5>My Account</h5>

            <ul className="account-nav">
              <li
                className={tab === "profile" ? "active" : ""}
                onClick={() => setTab("profile")}>
                Profile
              </li>

              <li
                className={tab === "orders" ? "active" : ""}
                onClick={() => setTab("orders")}>
                Orders
              </li>

              <li
                className={tab === "addresses" ? "active" : ""}
                onClick={() => setTab("addresses")}>
                Addresses
              </li>

              <li
                className={tab === "settings" ? "active" : ""}
                onClick={() => setTab("settings")}>
                Settings
              </li>
            </ul>

            <Button variant="outline-dark" size="sm" onClick={logout}>
              Log out
            </Button>
          </aside>

          {/* Main content */}
          <section className="account-content">
            {tab === "profile" && (
              <>
                <div className="profile-header">
                  <div className="avatar">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4>{user.name}</h4>
                    <p className="text-muted">{user.email}</p>
                  </div>
                </div>

                <div className="profile-info">
                  <div>
                    <label>Full Name :</label>
                    <span> {user.name}</span>
                  </div>

                  <div>
                    <label>Email :</label>
                    <span> {user.email}</span>
                  </div>

                  <div>
                    <label>Member Since :</label>
                    <span> {user.memberSince}</span>
                  </div>
                </div>
              </>
            )}

            {tab === "orders" && <Orders />}
            {tab === "addresses" && <h4>Addresses coming soon…</h4>}
            {tab === "settings" && <h4>Settings coming soon…</h4>}
          </section>
        </div>
      </div>
    </>
  );
}
