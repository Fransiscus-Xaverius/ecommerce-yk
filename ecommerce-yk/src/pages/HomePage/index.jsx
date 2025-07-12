import { useState, useEffect } from "react";

// Section Components
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import Newsletter from "../../components/sections/Newsletter";

// UI Components
import ProductCarousel from "../../components/ui/ProductCarousel";

import { useHeroSlider } from "../../hooks/useHeroSlider";
import { loadBootstrapCSS } from "../../utils/helpers";

// Hooks
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";

export default function HomePage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { cartItems, addToCart } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [errorSearch, setErrorSearch] = useState(null);

  const [heroSlides, setHeroSlides] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [errorBanners, setErrorBanners] = useState(null);

  const { currentSlide, setCurrentSlide } = useHeroSlider(heroSlides);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [errorNewArrivals, setErrorNewArrivals] = useState(null);

  const [bestSellers, setBestSellers] = useState([]);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  const [errorBestSellers, setErrorBestSellers] = useState(null);

  const [specialDeals, setSpecialDeals] = useState([]);
  const [loadingSpecialDeals, setLoadingSpecialDeals] = useState(true);
  const [errorSpecialDeals, setErrorSpecialDeals] = useState(null);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const fetchedProducts = [];
        for (let i = 1; i <= 10; i++) {
          const artikel = `ART-${String(i).padStart(6, "0")}`;
          const response = await fetch(
            `http://localhost:8080/api/products/${artikel}`
          );
          if (!response.ok) {
            console.error(
              `Error fetching New Arrival ${artikel}: HTTP error! status: ${response.status}`
            );
            continue;
          }
          const responseData = await response.json();
          if (responseData.data) {
            fetchedProducts.push(responseData.data);
          }
        }
        setNewArrivals(fetchedProducts);
        console.log("Fetched New Arrivals:", fetchedProducts);
      } catch (error) {
        setErrorNewArrivals(error);
      } finally {
        setLoadingNewArrivals(false);
      }
    };

    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const fetchedProducts = [];
        for (let i = 11; i <= 20; i++) {
          const artikel = `ART-${String(i).padStart(6, "0")}`;
          const response = await fetch(
            `http://localhost:8080/api/products/${artikel}`
          );
          if (!response.ok) {
            console.error(
              `Error fetching Best Seller ${artikel}: HTTP error! status: ${response.status}`
            );
            continue;
          }
          const responseData = await response.json();
          if (responseData.data) {
            fetchedProducts.push(responseData.data);
          }
        }
        setBestSellers(fetchedProducts);
        console.log("Fetched Best Sellers:", fetchedProducts);
      } catch (error) {
        setErrorBestSellers(error);
      } finally {
        setLoadingBestSellers(false);
      }
    };

    fetchBestSellers();
  }, []);

  useEffect(() => {
    const fetchSpecialDeals = async () => {
      try {
        const fetchedProducts = [];
        for (let i = 21; i <= 30; i++) {
          const artikel = `ART-${String(i).padStart(6, "0")}`;
          const response = await fetch(
            `http://localhost:8080/api/products/${artikel}`
          );
          if (!response.ok) {
            console.error(
              `Error fetching Special Deal ${artikel}: HTTP error! status: ${response.status}`
            );
            continue;
          }
          const responseData = await response.json();
          if (responseData.data) {
            fetchedProducts.push(responseData.data);
          }
        }
        setSpecialDeals(fetchedProducts);
        console.log("Fetched Special Deals:", fetchedProducts);
      } catch (error) {
        setErrorSpecialDeals(error);
      } finally {
        setLoadingSpecialDeals(false);
      }
    };

    fetchSpecialDeals();
  }, []);

  const productSections = [
    { title: "New Arrivals", products: newArrivals },
    { title: "Best Seller", products: bestSellers },
    { title: "Special Deal", products: specialDeals },
  ];

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
      {searchQuery ? (
        loadingSearch ? (
          <div>Searching products...</div>
        ) : errorSearch ? (
          <div>Error searching products: {errorSearch.message}</div>
        ) : searchResults.length > 0 ? (
          <ProductCarousel
            section={{
              title: `Search Results for "${searchQuery}"`,
              products: searchResults,
            }}
            sectionIndex={-1} // Use a unique index for search results
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ) : (
          <div>No products found for "{searchQuery}".</div>
        )
      ) : loadingNewArrivals || loadingBestSellers || loadingSpecialDeals ? (
        <div>Loading products...</div>
      ) : errorNewArrivals || errorBestSellers || errorSpecialDeals ? (
        <div>
          Error loading products:{" "}
          {errorNewArrivals?.message ||
            errorBestSellers?.message ||
            errorSpecialDeals?.message}
        </div>
      ) : newArrivals.length > 0 ||
        bestSellers.length > 0 ||
        specialDeals.length > 0 ? (
        productSections.map((section, sectionIndex) => (
          <ProductCarousel
            key={sectionIndex}
            section={section}
            sectionIndex={sectionIndex}
            onAddToCart={addToCart}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))
      ) : (
        <div>No products found.</div>
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
