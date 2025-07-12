import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout Components
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";

/**
 * Main Application Component - Yongki Komaladi E-commerce Website
 */
const YongkiKomaladiWebsite = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen overflow-x-hidden bg-gray-50">
        {/* Top Announcement Bar */}
        <AnnouncementBar />

        {/* Header */}
        <Header />

        {/* Main Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default YongkiKomaladiWebsite;
