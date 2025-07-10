import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";

const Header = ({ cartItems, wishlist }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wishlistCount = wishlist ? wishlist.length : 0;

  const navigationItems = [
    { label: "New Arrivals", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Sale", href: "#" },
    { label: "Collections", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a
            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
            href="#"
          >
            YONGKI KOMALADI
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center">
            <ul className="flex space-x-8 mb-0">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a
                    className="font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200 py-2"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <User size={20} />
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden bg-white border-t transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-3 text-gray-700 hover:text-purple-600 transition-colors duration-200"
                >
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
