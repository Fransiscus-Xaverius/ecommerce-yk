import React, { useState, useEffect } from "react";

// Layout Components
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Section Components
import HeroSection from "./components/sections/HeroSection";
import FeaturesSection from "./components/sections/FeaturesSection";
import Newsletter from "./components/sections/Newsletter";

// UI Components
import ProductCarousel from "./components/ui/ProductCarousel";
import GlobalStyles from "./components/ui/GlobalStyles";

// Data
import { heroSlides } from "./data/heroSlides";
import { productSections } from "./data/products";

// Hooks
import { useHeroSlider } from "./hooks/useHeroSlider";
import { useWishlist } from "./hooks/useWishlist";
import { useCart } from "./hooks/useCart";

// Utils
import { loadBootstrapCSS } from "./utils/helpers";

/**
 * Main Application Component - Yongki Komaladi E-commerce Website
 */
const YongkiKomaladiWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Initialize custom hooks
  const { currentSlide, setCurrentSlide } = useHeroSlider(heroSlides);
  const { wishlist, toggleWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();

  // Load Bootstrap CSS
  useEffect(() => {
    const cleanup = loadBootstrapCSS();
    return cleanup;
  }, []);

  return (
    <div
      className="min-h-screen bg-light"
      style={{ maxWidth: "100vw", overflowX: "hidden" }}
    >
      <GlobalStyles />

      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cartItems={cartItems}
        wishlist={wishlist}
      />

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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default YongkiKomaladiWebsite;
