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
      const response = await fetch(`http://localhost:8080/api/products/?q=${query}`);
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
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <a
            className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-200 hover:scale-105"
            href="#"
          >
            YONGKI KOMALADI
          </a>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 justify-center lg:flex">
            <ul className="mb-0 flex space-x-8">
              {navigationItems.map((item, index) => (
                <li key={index}>
                  <a
                    className="py-2 font-medium text-gray-700 transition-colors duration-200 hover:text-purple-600"
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
                className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-64">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
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
            <button className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100">
              <User size={20} />
            </button>
            <button className="relative rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button className="relative rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100">
              <ShoppingCart size={20} />
              {cartItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs text-white">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`border-t bg-white transition-all duration-300 lg:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="block py-3 text-gray-700 transition-colors duration-200 hover:text-purple-600"
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
