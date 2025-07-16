import { useState, useEffect } from "react";

// Section Components
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import Newsletter from "../../components/sections/Newsletter";

// UI Components
import ProductCarousel from "../../components/ui/ProductCarousel";

// import { useHeroSlider } from "../../hooks/useHeroSlider";
import { loadBootstrapCSS } from "../../utils/helpers";

// Hooks
import { useWishlist } from "../../hooks/useWishlist";
import { useCart } from "../../hooks/useCart";
import { fetchProductByArtikel, fetchProductList } from "../../services/productService"; // Import fetchProductList

export default function HomePage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingNewArrivals, setLoadingNewArrivals] = useState(true);
  const [errorNewArrivals, setErrorNewArrivals] = useState(null);

  // Best Seller section is hidden
  // const [bestSellers, setBestSellers] = useState([]);
  // const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  // const [errorBestSellers, setErrorBestSellers] = useState(null);

  const [specialDeals, setSpecialDeals] = useState([]);
  const [loadingSpecialDeals, setLoadingSpecialDeals] = useState(true);
  const [errorSpecialDeals, setErrorSpecialDeals] = useState(null);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        // Fetch New Arrivals (10 newest products by tanggal_terima)
        const newArrivalsData = await fetchProductList({ limit: 10, sortColumn: "tanggal_terima", sortDirection: "desc" });
        setNewArrivals(newArrivalsData.map(product => ({ ...product, isNew: true })));
        setLoadingNewArrivals(false);

        // Fetch Best Sellers (example: first 10 products by artikel, you might want a different logic here)
        // const bestSellersData = await fetchProductList({ limit: 10, offset: 10, sortColumn: "artikel", sortDirection: "asc" });
        // setBestSellers(bestSellersData);
        // setLoadingBestSellers(false);

        // Fetch Special Deals (example: next 10 products by artikel, you might want a different logic here)
        const specialDealsData = await fetchProductList({ limit: 10, offset: 20, sortColumn: "artikel", sortDirection: "asc" });
        setSpecialDeals(specialDealsData);
        setLoadingSpecialDeals(false);

      } catch (error) {
        setErrorNewArrivals(error);
        // setErrorBestSellers(error);
        setErrorSpecialDeals(error);
        setLoadingNewArrivals(false);
        // setLoadingBestSellers(false);
        setLoadingSpecialDeals(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const productSections = [
    { title: "New Arrivals", products: newArrivals },
    // { title: "Best Seller", products: bestSellers }, // Hidden
    { title: "Special Deal", products: specialDeals },
  ];

  // Load Bootstrap CSS
  useEffect(() => {
    const cleanup = loadBootstrapCSS();
    return cleanup;
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Product Sections */}
      {loadingNewArrivals || loadingSpecialDeals ? (
        <div>Loading products...</div>
      ) : errorNewArrivals || errorSpecialDeals ? (
        <div>Error loading products: {errorNewArrivals?.message || errorSpecialDeals?.message}</div>
      ) : newArrivals.length > 0 || specialDeals.length > 0 ? (
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
