import React, { useState } from "react";
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
import { heroSlides } from "./data/heroSlides";
import { productSections } from "./data/products";

// Hooks
import { useHeroSlider } from "./hooks/useHeroSlider";
import { useWishlist } from "./hooks/useWishlist";
import { useCart } from "./hooks/useCart";

/**
 * HomePage Component - Contains all main page sections
 */
const HomePage = ({ 
  heroSlides, 
  currentSlide, 
  setCurrentSlide, 
  productSections, 
  addToCart, 
  toggleWishlist, 
  wishlist 
}) => (
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

/**
 * Main Application Component - Yongki Komaladi E-commerce Website
 */
const YongkiKomaladiWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize custom hooks
  const { currentSlide, setCurrentSlide } = useHeroSlider(heroSlides);
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
                heroSlides={heroSlides}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                productSections={productSections}
                addToCart={addToCart}
                toggleWishlist={toggleWishlist}
                wishlist={wishlist}
              />
            } 
          />
          <Route 
            path="/product/:id" 
            element={
              <ProductDetail
                onAddToCart={addToCart}
              />
            } 
          />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default YongkiKomaladiWebsite;
