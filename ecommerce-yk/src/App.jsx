import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Search,
  User,
  Heart,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Phone,
  ArrowRight,
} from "lucide-react";

const YongkiKomaladiWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Refs for carousels
  const newArrivalsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const saleRef = useRef(null);

  // Hero slider data
  const heroSlides = [
    {
      id: 1,
      title: "ELEVATE YOUR STYLE",
      subtitle: "New Collection 2025",
      description:
        "Discover premium footwear crafted with passion and precision",
      cta: "Shop Collection",
      image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      id: 2,
      title: "MEGA SALE EVENT",
      subtitle: "Up to 70% Off",
      description: "Limited time offer on selected premium shoes",
      cta: "Shop Sale",
      image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
    {
      id: 3,
      title: "COMFORT REDEFINED",
      subtitle: "Premium Leather Collection",
      description: "Experience luxury with every step",
      cta: "Explore Now",
      image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    },
  ];

  // Product categories for carousel sections
  const productSections = [
    {
      title: "New Arrivals",
      subtitle: "Fresh styles just dropped",
      ref: newArrivalsRef,
      products: [
        {
          id: 1,
          name: "Urban Runner Pro",
          price: 1299000,
          originalPrice: 1599000,
          rating: 4.8,
          isNew: true,
        },
        {
          id: 2,
          name: "Classic Gentleman",
          price: 1899000,
          rating: 4.9,
          isNew: true,
        },
        {
          id: 3,
          name: "Street Style X",
          price: 999000,
          rating: 4.7,
          isNew: true,
        },
        {
          id: 4,
          name: "Comfort Walk Plus",
          price: 1499000,
          rating: 4.6,
          isNew: true,
        },
        {
          id: 5,
          name: "Executive Elite",
          price: 2299000,
          rating: 5.0,
          isNew: true,
        },
        {
          id: 6,
          name: "Casual Friday",
          price: 899000,
          originalPrice: 1199000,
          rating: 4.5,
          isNew: true,
        },
        {
          id: 7,
          name: "Sport Dynamic",
          price: 1099000,
          rating: 4.7,
          isNew: true,
        },
        {
          id: 8,
          name: "Office Premium",
          price: 1799000,
          rating: 4.8,
          isNew: true,
        },
      ],
    },
    {
      title: "Best Sellers",
      subtitle: "Customer favorites",
      ref: bestSellersRef,
      products: [
        {
          id: 9,
          name: "Everyday Comfort",
          price: 799000,
          rating: 4.9,
          soldCount: "2.3k",
        },
        {
          id: 10,
          name: "Business Premium",
          price: 1699000,
          rating: 4.8,
          soldCount: "1.8k",
        },
        {
          id: 11,
          name: "Weekend Warrior",
          price: 1099000,
          rating: 4.7,
          soldCount: "3.1k",
        },
        {
          id: 12,
          name: "City Walker",
          price: 999000,
          rating: 4.8,
          soldCount: "2.7k",
        },
        {
          id: 13,
          name: "Sport Fusion",
          price: 1399000,
          rating: 4.6,
          soldCount: "1.5k",
        },
        {
          id: 14,
          name: "Classic Touch",
          price: 1299000,
          rating: 4.9,
          soldCount: "2.9k",
        },
        {
          id: 15,
          name: "Urban Elite",
          price: 1599000,
          rating: 4.8,
          soldCount: "2.1k",
        },
        {
          id: 16,
          name: "Comfort Plus",
          price: 899000,
          rating: 4.7,
          soldCount: "3.5k",
        },
      ],
    },
    {
      title: "Special Deals",
      subtitle: "Limited time offers",
      ref: saleRef,
      products: [
        {
          id: 17,
          name: "Summer Breeze",
          price: 599000,
          originalPrice: 999000,
          rating: 4.5,
          discount: 40,
        },
        {
          id: 18,
          name: "Office Star",
          price: 999000,
          originalPrice: 1799000,
          rating: 4.6,
          discount: 45,
        },
        {
          id: 19,
          name: "Adventure Pro",
          price: 1299000,
          originalPrice: 2199000,
          rating: 4.7,
          discount: 41,
        },
        {
          id: 20,
          name: "Casual Elite",
          price: 699000,
          originalPrice: 1299000,
          rating: 4.4,
          discount: 46,
        },
        {
          id: 21,
          name: "Premium Walk",
          price: 1499000,
          originalPrice: 2499000,
          rating: 4.8,
          discount: 40,
        },
        {
          id: 22,
          name: "Style Master",
          price: 899000,
          originalPrice: 1599000,
          rating: 4.5,
          discount: 44,
        },
        {
          id: 23,
          name: "Weekend Style",
          price: 799000,
          originalPrice: 1399000,
          rating: 4.6,
          discount: 43,
        },
        {
          id: 24,
          name: "Executive Pro",
          price: 1199000,
          originalPrice: 1999000,
          rating: 4.7,
          discount: 40,
        },
      ],
    },
  ];

  // Auto-rotate hero slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Load Bootstrap CSS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const scrollCarousel = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 320;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Drag functionality for carousels
  const handleMouseDown = (e, ref) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleTouchStart = (e, ref) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchMove = (e, ref) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-700 to-pink-600 text-white py-2">
        <div className="container">
          <div className="text-center">
            <p className="mb-0 fw-bold animate-pulse">
              🎉 FLASH SALE: Extra 20% OFF with code FLASH20 | Free Shipping on
              orders above Rp 500.000
            </p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white shadow-lg sticky-top">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light py-3">
            {/* Mobile Menu Toggle */}
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

            {/* Desktop Navigation - Fixed to always show on large screens */}
            <div className="d-none d-lg-flex flex-grow-1 justify-content-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link fw-medium px-3 hover-purple" href="#">
                    New Arrivals
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium px-3 hover-purple" href="#">
                    Men
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium px-3 hover-purple" href="#">
                    Women
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium px-3 hover-purple" href="#">
                    Sale
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium px-3 hover-purple" href="#">
                    Collections
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link fw-medium px-3 hover-purple" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Icons */}
            <div className="d-flex align-items-center">
              <button className="btn btn-link p-2 d-none d-md-block">
                <Search size={20} />
              </button>
              <button className="btn btn-link p-2">
                <User size={20} />
              </button>
              <button className="btn btn-link p-2 position-relative">
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {wishlist.length}
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

        {/* Mobile Menu */}
        <div
          className={`collapse ${
            isMenuOpen ? "show" : ""
          } d-lg-none bg-white border-top`}
        >
          <div className="container py-3">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href="#" className="nav-link py-2">
                  New Arrivals
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link py-2">
                  Men
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link py-2">
                  Women
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link py-2">
                  Sale
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link py-2">
                  Collections
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link py-2">
                  About
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Hero Section - Bootstrap Carousel */}
      <section className="position-relative">
        <div
          id="heroCarousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={index === currentSlide ? "active" : ""}
                onClick={() => setCurrentSlide(index)}
              ></button>
            ))}
          </div>

          <div className="carousel-inner">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item ${
                  index === currentSlide ? "active" : ""
                }`}
                style={{ height: "70vh", minHeight: "500px" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center h-100 text-white"
                  style={{ background: slide.image }}
                >
                  <div className="container text-center">
                    <div className="row justify-content-center">
                      <div className="col-lg-8">
                        <h2 className="display-3 fw-bold mb-3 animate_animated animate_fadeInDown">
                          {slide.title}
                        </h2>
                        <h3 className="h2 mb-3 animate_animated animatefadeInUp animate_delay-1s">
                          {slide.subtitle}
                        </h3>
                        <p className="lead mb-4 animate_animated animatefadeInUp animate_delay-2s">
                          {slide.description}
                        </p>
                        <button className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold hover-scale animate_animated animatefadeInUp animate_delay-3s">
                          {slide.cta} <ArrowRight className="ms-2" size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            onClick={() =>
              setCurrentSlide(
                (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
              )
            }
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            onClick={() =>
              setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
            }
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row g-4">
            <div className="col-6 col-md-3">
              <div className="text-center p-3 feature-box rounded">
                <div
                  className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Truck className="text-primary" size={30} />
                </div>
                <h5 className="fw-bold">Free Shipping</h5>
                <p className="text-muted small mb-0">Orders above Rp 500k</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center p-3 feature-box rounded">
                <div
                  className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Shield className="text-success" size={30} />
                </div>
                <h5 className="fw-bold">Secure Payment</h5>
                <p className="text-muted small mb-0">100% Protected</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center p-3 feature-box rounded">
                <div
                  className="bg-warning bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "70px", height: "70px" }}
                >
                  <RefreshCw className="text-warning" size={30} />
                </div>
                <h5 className="fw-bold">Easy Returns</h5>
                <p className="text-muted small mb-0">30 Days Policy</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="text-center p-3 feature-box rounded">
                <div
                  className="bg-danger bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Phone className="text-danger" size={30} />
                </div>
                <h5 className="fw-bold">24/7 Support</h5>
                <p className="text-muted small mb-0">Always Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Sections with Manual Drag/Swipe */}
      {productSections.map((section, sectionIndex) => (
        <section
          key={sectionIndex}
          className={`py-5 ${sectionIndex % 2 === 0 ? "bg-light" : "bg-white"}`}
        >
          <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 className="h1 fw-bold mb-2">{section.title}</h2>
                <p className="text-muted mb-0">{section.subtitle}</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary rounded-circle p-2"
                  onClick={() => scrollCarousel(section.ref, "left")}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  className="btn btn-outline-secondary rounded-circle p-2"
                  onClick={() => scrollCarousel(section.ref, "right")}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Draggable Product Carousel */}
            <div className="position-relative overflow-hidden">
              <div
                ref={section.ref}
                className="d-flex gap-4 pb-3 scrollbar-hide draggable-carousel"
                style={{
                  overflowX: "auto",
                  scrollBehavior: "smooth",
                  WebkitOverflowScrolling: "touch",
                  cursor: isDragging ? "grabbing" : "grab",
                  userSelect: "none",
                }}
                onMouseDown={(e) => handleMouseDown(e, section.ref)}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={(e) => handleMouseMove(e, section.ref)}
                onTouchStart={(e) => handleTouchStart(e, section.ref)}
                onTouchEnd={handleMouseUp}
                onTouchMove={(e) => handleTouchMove(e, section.ref)}
              >
                {section.products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0"
                    style={{ width: "300px" }}
                  >
                    <div className="card h-100 shadow-sm product-card position-relative overflow-hidden">
                      {/* Badges */}
                      <div className="position-absolute top-0 start-0 p-3 z-3">
                        {product.isNew && (
                          <span className="badge bg-success mb-2 d-block">
                            NEW
                          </span>
                        )}
                        {product.discount && (
                          <span className="badge bg-danger d-block">
                            {product.discount}% OFF
                          </span>
                        )}
                        {product.soldCount && (
                          <span className="badge bg-dark d-block">
                            {product.soldCount} sold
                          </span>
                        )}
                      </div>

                      {/* Wishlist */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-3 z-3"
                      >
                        <Heart
                          size={18}
                          className={
                            wishlist.includes(product.id)
                              ? "text-danger fill-danger"
                              : ""
                          }
                        />
                      </button>

                      {/* Product Image */}
                      <div
                        className="bg-gradient-to-br from-gray-100 to-gray-300 d-flex align-items-center justify-content-center product-image"
                        style={{ height: "250px" }}
                      >
                        <div className="text-center">
                          <div className="display-1 shoe-icon">👟</div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="card-body">
                        <h5 className="card-title fw-bold">{product.name}</h5>

                        {/* Rating */}
                        <div className="d-flex align-items-center mb-3">
                          <div className="text-warning me-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={
                                  i < Math.floor(product.rating)
                                    ? "fill-warning"
                                    : ""
                                }
                              />
                            ))}
                          </div>
                          <small className="text-muted">{product.rating}</small>
                        </div>

                        {/* Price */}
                        <div className="mb-3">
                          <h5 className="text-primary fw-bold mb-0">
                            {formatPrice(product.price)}
                          </h5>
                          {product.originalPrice && (
                            <small className="text-muted text-decoration-line-through">
                              {formatPrice(product.originalPrice)}
                            </small>
                          )}
                        </div>

                        {/* Add to Cart */}
                        <button
                          onClick={() => setCartItems((prev) => prev + 1)}
                          className="btn btn-primary w-100 rounded-pill fw-bold add-to-cart-btn"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Newsletter Section */}
      <section className="py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className="display-5 fw-bold mb-3">Stay in Style</h2>
              <p className="lead mb-4">
                Get exclusive offers and be the first to know about new
                arrivals!
              </p>
              <form className="d-flex gap-2 justify-content-center flex-column flex-sm-row">
                <input
                  type="email"
                  className="form-control form-control-lg rounded-pill"
                  placeholder="Your email address"
                  style={{ maxWidth: "300px" }}
                />
                <button
                  type="submit"
                  className="btn btn-light btn-lg rounded-pill px-4 fw-bold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h3 className="h4 fw-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                YONGKI KOMALADI
              </h3>
              <p className="text-white-50">
                Premium footwear for the modern lifestyle. Quality, comfort, and
                style in every step.
              </p>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-white-50 footer-social">
                  <i className="bi bi-facebook fs-5"></i>
                </a>
                <a href="#" className="text-white-50 footer-social">
                  <i className="bi bi-instagram fs-5"></i>
                </a>
                <a href="#" className="text-white-50 footer-social">
                  <i className="bi bi-twitter fs-5"></i>
                </a>
                <a href="#" className="text-white-50 footer-social">
                  <i className="bi bi-youtube fs-5"></i>
                </a>
              </div>
            </div>
            <div className="col-6 col-md-2">
              <h5 className="fw-bold mb-3">Shop</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    New Arrivals
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Best Sellers
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Sale
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Collections
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-2">
              <h5 className="fw-bold mb-3">Help</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Shipping Info
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Returns
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-white-50 text-decoration-none footer-link"
                  >
                    Size Guide
                  </a>
                </li>
              </ul>
            </div>
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
              &copy; 2025 Yongki Komaladi. All rights reserved. | Privacy Policy
              | Terms of Service
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .hover-scale:hover {
          transform: scale(1.1);
        }
        .hover-purple:hover {
          color: #9333ea !important;
        }
        .fill-warning {
          fill: #ffc107;
        }
        .fill-danger {
          fill: #dc3545;
        }
        .bg-clip-text {
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .product-card {
          transition: all 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        .product-card:hover .shoe-icon {
          transform: rotate(-10deg) scale(1.1);
        }
        .shoe-icon {
          transition: transform 0.3s ease;
        }
        .draggable-carousel {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .feature-box {
          transition: all 0.3s ease;
        }
        .feature-box:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        .add-to-cart-btn {
          transition: all 0.3s ease;
        }
        .add-to-cart-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .footer-link:hover {
          color: white !important;
        }
        .footer-social:hover {
          color: white !important;
          transform: scale(1.2);
        }
        @media (max-width: 991px) {
          .navbar-brand {
            font-size: 1.2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default YongkiKomaladiWebsite;
