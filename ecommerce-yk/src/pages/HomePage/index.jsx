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
import { fetchProductList } from "../../services/productService"; // Import fetchProductList

export default function HomePage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [hotProducts, setHotProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [offlineProducts, setOfflineProducts] = useState([]);
  const [onlineProducts, setOnlineProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInitialProducts = async () => {
      try {
        // Fetch Hot Products (example: 10 products with highest rating)
        const hotData = await fetchProductList({ limit: 10, sortColumn: "rating", sortDirection: "desc" });
        setHotProducts(hotData.map((product) => ({ ...product, isHot: true })));

        // Fetch New Arrivals (10 newest products by tanggal_terima)
        const newArrivalsData = await fetchProductList({
          limit: 10,
          sortColumn: "tanggal_terima",
          sortDirection: "desc",
        });
        setNewArrivals(newArrivalsData.map((product) => ({ ...product, isNew: true })));

        // Fetch all products to filter for Offline and Online sections
        const allProducts = await fetchProductList({});

        const offline = [];
        const online = [];

        allProducts.forEach(product => {
          const isOfflineNull = product.offline === null || product.offline === undefined;
          const isMarketplaceNull = product.marketplace === null || product.marketplace === undefined || Object.keys(product.marketplace).length === 0;

          if (isOfflineNull) {
            online.push(product);
          }
          if (isMarketplaceNull) {
            offline.push(product);
          }
          if (!isOfflineNull && !isMarketplaceNull) {
            offline.push(product);
            online.push(product);
          }
        });

        setOfflineProducts(offline);
        setOnlineProducts(online);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const productSections = [
    { title: "Hot", products: hotProducts },
    { title: "New Arrivals", products: newArrivals },
    { title: "Offline", products: offlineProducts },
    { title: "Online", products: onlineProducts },
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
      {loading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div>Error loading products: {error.message}</div>
      ) : (
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
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
