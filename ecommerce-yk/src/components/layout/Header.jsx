import React, { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();
  const wishlistCount = wishlist ? wishlist.length : 0;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  const navigationItems = [
    { label: "New Arrivals", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Sale", href: "#" },
    { label: "Collections", href: "#" },
    { label: "About", href: "#" },
  ];

  const handleSearchSubmit = async (query) => {
    setSearchQuery(query);
    setLoadingSearch(true);
    setErrorSearch(null);
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/?q=${query}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setSearchResults(responseData.data.items);
    } catch (error) {
      setErrorSearch(error);
    } finally {
      setLoadingSearch(false);
    }
  };

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
            {/* Search Button / Input */}
            <div className="relative hidden md:block">
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearchSubmit(searchQuery);
                        setIsSearchOpen(false); // Close search after submit
                      }
                    }}
                  />
                </div>
              )}
            </div>
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
