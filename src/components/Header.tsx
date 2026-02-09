import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { ShoppingCart, Heart, User, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

import { useCart } from "../context/CartContext";
import { ModernSearchBar } from "./ModernSearchbar";
import logo from "../assets/tohfa300.png";

export function Header() {
  const { cartCount } = useCart();
  const [expanded, setExpanded] = useState(false);

  // Prevent body scroll when menu is open on mobile
  useEffect(() => {
    if (expanded) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [expanded]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbar = document.getElementById("main-navbar");
      const toggler = document.querySelector(".custom-navbar-toggle");

      if (
        expanded &&
        navbar &&
        !navbar.contains(event.target as Node) &&
        toggler &&
        !toggler.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    if (expanded) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [expanded]);

  // Close menu on any navigation
  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar
      fixed="top"
      expand="lg"
      className="header-navbar"
      expanded={expanded}
      onToggle={setExpanded}>
      <Container fluid>
        {/* BRAND */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="header-brand"
          onClick={handleNavClick}>
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
          <div className="d-none d-lg-flex mx-auto">
            <ModernSearchBar />
          </div>

          {/* CENTER NAV */}
          <Nav className="mx-auto header-nav">
            <NavLink
              to="/gift-items"
              className="nav-link-custom"
              onClick={handleNavClick}>
              GIFT ITEMS
              <ChevronDown size={14} className="nav-arrow" />
            </NavLink>
            <NavLink
              to="/home-decor"
              className="nav-link-custom"
              onClick={handleNavClick}>
              HOME DECOR
              <ChevronDown size={14} className="nav-arrow" />
            </NavLink>
            <NavLink
              to="/accessories"
              className="nav-link-custom"
              onClick={handleNavClick}>
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
            <NavLink
              to="/wishlist"
              className="nav-icon-link"
              onClick={handleNavClick}>
              <Heart size={18} />
            </NavLink>

            <NavLink
              to="/cart"
              className="nav-icon-link"
              onClick={handleNavClick}>
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
                <Dropdown.Item as={Link} to="/account" onClick={handleNavClick}>
                  Account
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/aboutus" onClick={handleNavClick}>
                  About Us
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as={Link} to="/login" onClick={handleNavClick}>
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
