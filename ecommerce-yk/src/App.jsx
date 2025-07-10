import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Section Components
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import Newsletter from "./components/sections/Newsletter";
import ProductDetail from "./components/sections/ProductDetail";

// UI Components
import ProductCarousel from "./components/ui/ProductCarousel";

// Data
import { productSections } from "./data/products";

// Hooks
import { useHeroSlider } from "./hooks/useHeroSlider";
import { useWishlist } from "./hooks/useWishlist";
import { useCart } from "./hooks/useCart";
import { loadBootstrapCSS } from "./utils/helpers";

/**
 * HomePage Component - Contains all main page sections
 */
const HomePage = ({ productSections, addToCart, toggleWishlist, wishlist }) => {
  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [errorBanners, setErrorBanners] = useState(null);

  const { currentSlide, setCurrentSlide } = useHeroSlider(heroSlides);

  // Fetch banners from backend
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/banners/active"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData);
        // Map backend banner data to existing hero slide structure
        const mappedSlides = responseData.data.banners.map((banner) => ({
          id: banner.id,
          title: banner.title,
          subtitle: banner.subtitle,
          description: banner.description,
          cta: banner.cta_text,
          image: `url('http://localhost:8080${banner.image_url}')`, // Prepend backend URL
        }));
        console.log(mappedSlides);
        setHeroSlides(mappedSlides);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setErrorBanners(error);
      } finally {
        setLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  // Load Bootstrap CSS
  useEffect(() => {
    const cleanup = loadBootstrapCSS();
    return cleanup;
  }, []);

  if (loadingBanners) {
    return <div>Loading banners...</div>; // Or a more sophisticated loading spinner
  }

  if (errorBanners) {
    return <div>Error loading banners: {errorBanners.message}</div>;
  }

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        slides={heroSlides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Product Sections */}
      {productSections.map((section, sectionIndex) => (
        <ProductCarousel
          key={sectionIndex}
          section={section}
          sectionIndex={sectionIndex}
          onAddToCart={addToCart}
          onToggleWishlist={toggleWishlist}
          wishlist={wishlist}
        />
      ))}

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
};

/**
 * Main Application Component - Yongki Komaladi E-commerce Website
 */
const YongkiKomaladiWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize custom hooks
  const { wishlist, toggleWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Header */}
        <Header
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          cartItems={cartItems}
          wishlist={wishlist}
        />

        {/* Main Content */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                productSections={productSections}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={addToCart} />}
          />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default YongkiKomaladiWebsite;
