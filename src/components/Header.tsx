import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { ShoppingCart, Heart, User, ChevronDown } from "lucide-react";

import { useCart } from "../context/CartContext";
import { ModernSearchBar } from "./ModernSearchbar";
import logo from "../assets/tohfa300.png";

export function Header() {
  const { cartCount } = useCart();

  return (
    <Navbar fixed="top" expand="lg" className="header-navbar" collapseOnSelect>
      <Container fluid>
        {/* BRAND */}
        <Navbar.Brand as={Link} to="/" className="header-brand">
          <div className="brand-link">
            <img src={logo} alt="TOHFA logo" className="brand-logo" />
            <div className="brand-title-wrapper">
              <div className="brand-title">
                TOHFA <span className="brand-highlight">by US</span>
              </div>
            </div>
          </div>
        </Navbar.Brand>

        {/* TOGGLE */}
        <Navbar.Toggle
          aria-controls="main-navbar"
          className="custom-navbar-toggle"
        />

        {/* COLLAPSE */}
        <Navbar.Collapse id="main-navbar">
          {/* SEARCH BAR - Desktop (before nav links) */}
          <div className="d-none d-lg-flex  mx-auto">
            <ModernSearchBar />
          </div>

          {/* CENTER NAV */}
          <Nav className="mx-auto header-nav">
            <NavLink to="/gift-items" className="nav-link-custom">
              GIFT ITEMS
              <ChevronDown size={14} className="nav-arrow" />
            </NavLink>
            <NavLink to="/home-decor" className="nav-link-custom">
              HOME DECOR
              <ChevronDown size={14} className="nav-arrow" />
            </NavLink>
            <NavLink to="/accessories" className="nav-link-custom">
              ACCESSORIES
              <ChevronDown size={14} className="nav-arrow" />
            </NavLink>
          </Nav>

          {/* SEARCH BAR - Mobile (in collapsed menu) */}
          <div className="d-lg-none mb-3">
            <ModernSearchBar />
          </div>

          {/* RIGHT ACTIONS */}
          <div className="header-actions d-flex align-items-center">
            <NavLink to="/wishlist" className="nav-icon-link">
              <Heart size={18} />
            </NavLink>

            <NavLink to="/cart" className="nav-icon-link">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </NavLink>

            {/* USER DROPDOWN */}
            <Dropdown align="end" className="ms-3">
              <Dropdown.Toggle
                as="div"
                className="nav-icon-link user-dropdown-toggle"
                role="button"
                id="user-dropdown">
                <User size={15} />
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-menu-end">
                <Dropdown.Item as={Link} to="/account">
                  Account
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/aboutus">
                  About Us
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/login">
                  Login
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
