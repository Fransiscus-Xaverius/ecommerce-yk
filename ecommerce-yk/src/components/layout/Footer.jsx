import React from "react";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from "lucide-react";

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
    { platform: "Facebook", icon: <Facebook size={20} />, href: "#" },
    { platform: "Instagram", icon: <Instagram size={20} />, href: "#" },
    { platform: "Twitter", icon: <Twitter size={20} />, href: "#" },
    { platform: "YouTube", icon: <Youtube size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              YONGKI KOMALADI
            </h3>
            <p className="text-gray-400 mb-4">
              Premium footwear for the modern lifestyle. Quality, comfort, and
              style in every step.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.platform}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="font-bold mb-4">Shop</h5>
            <ul className="space-y-2">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h5 className="font-bold mb-4">Help</h5>
            <ul className="space-y-2">
              {helpLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Info */}
          <div>
            <h5 className="font-bold mb-4">Visit Our Store</h5>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center">
                <MapPin className="mr-2" size={16} />
                Jl. Sudirman No. 123, Jakarta Selatan
              </p>
              <p className="flex items-center">
                <Phone className="mr-2" size={16} />
                +62 21 1234 5678
              </p>
              <p className="flex items-center">
                <Mail className="mr-2" size={16} />
                hello@yongkikomaladi.com
              </p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="text-center text-gray-400">
          <p>
            &copy; 2025 Yongki Komaladi. All rights reserved. | Privacy Policy |
            Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
