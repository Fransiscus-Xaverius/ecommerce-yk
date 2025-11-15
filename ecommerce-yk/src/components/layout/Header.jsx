import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";

// Hooks
// import { useWishlist } from "../../hooks/useWishlist";
// import { useCart } from "../../hooks/useCart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  // const { wishlist } = useWishlist();
  // const { cartItems } = useCart();
  // const wishlistCount = wishlist ? wishlist.length : 0;
  const navigate = useNavigate();
  const location = useLocation();
  const previousPathname = useRef(location.pathname);
  const isNavigatingToProduct = useRef(false);

  const [searchQuery, setSearchQuery] = useState("");

  // Track navigation to product detail pages
  useEffect(() => {
    // If we're navigating from a search page to a product detail page
    if (previousPathname.current.startsWith("/products") && location.pathname.startsWith("/product/")) {
      isNavigatingToProduct.current = true;
      // Clear the search query when navigating to product detail page
      setSearchQuery("");
    } else if (location.pathname.startsWith("/product/")) {
      // If we're already on a product detail page, reset the flag
      isNavigatingToProduct.current = false;
    }

    previousPathname.current = location.pathname;
  }, [location.pathname]);

  // Debounce search query - allow searching from product detail pages
  useEffect(() => {
    if (searchQuery.trim() === "" || searchQuery.trim() === null) return;

    // Don't navigate if we just navigated to a product detail page
    if (isNavigatingToProduct.current) {
      isNavigatingToProduct.current = false;
      return;
    }

    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        navigate(`/products?q=${searchQuery}`);
      } else if (location.pathname.startsWith("/products")) {
        // If search query is empty and we are on products page, navigate to products without query
        navigate("/products");
      }
    }, 500); // 500ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, navigate, location.pathname]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${searchQuery.trim()}`);
    }
  };

  const navigationItems = [
    { label: "New Arrivals", href: "#" },
    { label: "Men", href: "#" },
    { label: "Women", href: "#" },
    { label: "Sale", href: "#" },
    { label: "Collections", href: "#" },
    { label: "About", href: "#" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-light-gray bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top Bar: Mobile Menu, Search/Logo, Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 py-4">
            {/* Mobile menu button */}
            <button
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Search Bar / Logo Toggle */}
            {!isMobileSearchOpen ? (
              <a
                className="text-2xl font-bold text-milky-blue transition-transform duration-200 hover:scale-105 lg:hidden"
                href="/"
              >
                YONGKI KOMALADI
              </a>
            ) : (
              <div className="flex-1 lg:hidden">
                {" "}
                {/* Mobile: Search bar takes space */}
                <form className="w-full" onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-milky-blue focus:outline-none focus:ring-1 focus:ring-milky-blue"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Search className="text-gray-400" size={20} />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* Logo (hidden on mobile, visible on large screens) */}
            <a
              className="hidden text-2xl font-bold text-milky-blue transition-transform duration-200 hover:scale-105 lg:block"
              href="/"
            >
              YONGKI KOMALADI
            </a>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden flex-1 justify-center px-8 lg:flex">
            <form className="w-full max-w-2xl" onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full rounded-full border border-gray-300 bg-gray-100 py-2 pl-10 pr-4 focus:border-milky-blue focus:outline-none focus:ring-1 focus:ring-milky-blue"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="text-gray-400" size={20} />
                </div>
              </div>
            </form>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2">
            <button
              className="rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)} // Toggle mobile search
            >
              {isMobileSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            {/* <button className="hidden rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 md:block">
              <User size={20} />
            </button>
            <button className="relative hidden rounded-lg p-2 transition-colors duration-200 hover:bg-gray-100 md:block">
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
            </button> */}
          </div>
        </div>
      </div>

      {/* Desktop Navigation Bar */}
      <nav className="mt-0 hidden lg:block">
        <div className="mx-auto max-w-2xl px-4">
          <ul className="flex justify-center space-x-8 pb-3">
            {navigationItems.map((item, index) => (
              <li key={index}>
                <a
                  className="font-medium text-gray-700 transition-colors duration-200 hover:text-milky-blue"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

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
                  className="block py-3 text-gray-700 transition-colors duration-200 hover:text-milky-blue"
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
