import React from "react";

/**
 * Footer component with company info and links
 */
const Footer = () => {
  const shopLinks = [
    { label: "New Arrivals", href: "#" },
    { label: "Best Sellers", href: "#" },
    { label: "Sale", href: "#" },
    { label: "Collections", href: "#" },
  ];

  const helpLinks = [
    { label: "Contact Us", href: "#" },
    { label: "Shipping Info", href: "#" },
    { label: "Returns", href: "#" },
    { label: "Size Guide", href: "#" },
  ];

  const socialLinks = [
    { platform: "Facebook", icon: "bi-facebook", href: "#" },
    { platform: "Instagram", icon: "bi-instagram", href: "#" },
    { platform: "Twitter", icon: "bi-twitter", href: "#" },
    { platform: "YouTube", icon: "bi-youtube", href: "#" },
  ];

  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row g-4">
          {/* Brand Section */}
          <div className="col-md-4">
            <h3 className="h4 fw-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              YONGKI KOMALADI
            </h3>
            <p className="text-white-50">
              Premium footwear for the modern lifestyle. Quality, comfort, and
              style in every step.
            </p>
            <div className="d-flex gap-3 mt-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-white-50 footer-social"
                  aria-label={social.platform}
                >
                  <i className={`${social.icon} fs-5`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold mb-3">Shop</h5>
            <ul className="list-unstyled">
              {shopLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={link.href}
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div className="col-6 col-md-2">
            <h5 className="fw-bold mb-3">Help</h5>
            <ul className="list-unstyled">
              {helpLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <a
                    href={link.href}
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Visit Our Store</h5>
            <p className="text-white-50 mb-2">
              <i className="bi bi-geo-alt me-2"></i>
              Jl. Sudirman No. 123, Jakarta Selatan
            </p>
            <p className="text-white-50 mb-2">
              <i className="bi bi-telephone me-2"></i>
              +62 21 1234 5678
            </p>
            <p className="text-white-50">
              <i className="bi bi-envelope me-2"></i>
              hello@yongkikomaladi.com
            </p>
          </div>
        </div>

        <hr className="my-4 bg-white-50" />

        <div className="text-center text-white-50">
          <p className="mb-0">
            &copy; 2025 Yongki Komaladi. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
