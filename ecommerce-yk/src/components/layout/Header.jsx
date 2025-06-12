import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";

const Header = ({ cartItems, wishlistCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "New Arrivals", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Sale", href: "#" },
    { label: "Collections", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <header className="bg-white shadow-lg sticky-top">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          {/* Mobile menu button */}
          <button
            className="navbar-toggler border-0 me-2"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a className="navbar-brand me-auto me-lg-4" href="#">
            <h1 className="h3 mb-0 fw-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              YONGKI KOMALADI
            </h1>
          </a>

          {/* Desktop Navigation */}
          <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
            <ul className="navbar-nav">
              {navigationItems.map((item, index) => (
                <li key={index} className="nav-item">
                  <a
                    className="nav-link fw-medium px-3 hover-purple"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="d-flex align-items-center">
            <button className="btn btn-link p-2 d-none d-md-block">
              <Search size={20} />
            </button>
            <button className="btn btn-link p-2">
              <User size={20} />
            </button>
            <button className="btn btn-link p-2 position-relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="btn btn-link p-2 position-relative">
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`collapse ${
          isMenuOpen ? "show" : ""
        } d-lg-none bg-white border-top`}
      >
        <div className="container py-3">
          <ul className="navbar-nav">
            {navigationItems.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.href} className="nav-link py-2">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
