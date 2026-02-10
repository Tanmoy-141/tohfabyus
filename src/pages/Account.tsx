import { Button } from "react-bootstrap";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import "./account.css";
import { Orders } from "../components/Orders";

export function Account() {
  const { user, logout } = useAuth();
  const [tab, setTab] = useState("profile");

  // ✅ Auth guard
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Safe fallback name
  const displayName =
    user.displayName || user.username || user.email || user.phone || "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

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
                  <div className="avatar">{avatarLetter}</div>
                  <div>
                    <h4>{displayName}</h4>
                    <p className="text-muted">
                      {user.email || user.phone || user.username}
                    </p>
                  </div>
                </div>

                <div className="profile-info">
                  <div>
                    <label>Full Name :</label>
                    <span> {displayName}</span>
                  </div>

                  {user.email && (
                    <div>
                      <label>Email :</label>
                      <span> {user.email}</span>
                    </div>
                  )}

                  {user.phone && (
                    <div>
                      <label>Phone :</label>
                      <span> {user.phone}</span>
                    </div>
                  )}

                  <div>
                    <label>Member Since :</label>
                    <span>
                      {" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
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
