import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layout Components
import AnnouncementBar from "./components/layout/AnnouncementBar";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ProductDetail from "./pages/ProductDetail";
import SearchResults from "./pages/SearchResults";
import AllProduct from "./pages/AllProduct";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

const MainAppContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} setSearchQuery={setSearchQuery} />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchResults searchQuery={searchQuery} />} />
        <Route path="/products" element={<SearchResults />} />
        <Route path="/all-products" element={<AllProduct />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

/**
 * Main Application Component - Yongki Komaladi E-commerce Website
 */
const YongkiKomaladiWebsite = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MainAppContent />
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default YongkiKomaladiWebsite;
