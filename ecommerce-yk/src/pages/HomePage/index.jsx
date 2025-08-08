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
        // Fetch Hot Products (products with highest average rating: comfort+style+support)
        const hotData = await fetchProductList({ limit: 50, sortColumn: "tanggal_terima", sortDirection: "desc" });

        // Calculate average rating and sort by it
        const productsWithAvgRating = hotData.map((product) => {
          const avgRating = product.rating
            ? (product.rating.comfort + product.rating.style + product.rating.support) / 3
            : 0;
          return { ...product, avgRating, isHot: true };
        });

        // Sort by average rating (highest first) and take top 10
        const sortedHotProducts = productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating).slice(0, 10);

        setHotProducts(sortedHotProducts);

        // Fetch New Arrivals (10 newest products by tanggal_terima)
        const newArrivalsData = await fetchProductList({
          limit: 10,
          sortColumn: "tanggal_terima",
          sortDirection: "desc",
        });
        setNewArrivals(newArrivalsData.map((product) => ({ ...product, isNew: true })));

        // Fetch all products to categorize into Offline and Online sections
        const allProductsData = await fetchProductList({});

        // Categorize products based on offline and marketplace fields
        const offlineProducts = await fetchProductList({
          limit: 50,
          sortColumn: "tanggal_terima",
          sortDirection: "desc",
          offline: true,
        });
        const onlineProducts = await fetchProductList({
          limit: 50,
          sortColumn: "tanggal_terima",
          sortDirection: "desc",
          online: true,
        });

        // allProductsData.forEach((product) => {
        //   // Check if offline field is NULL/empty (considering backend transformation)
        //   const hasOfflineData = product.offline && Array.isArray(product.offline) && product.offline.length > 0;

        //   // Check if marketplace field has valid data
        //   const hasMarketplaceData =
        //     product.marketplace &&
        //     typeof product.marketplace === "object" &&
        //     Object.keys(product.marketplace).length > 0 &&
        //     Object.values(product.marketplace).some(
        //       (value) => value !== null && value !== undefined && value !== "" && value.trim() !== ""
        //     );

        //   // If offline field is NULL/empty, add to online section
        //   if (!hasOfflineData) {
        //     onlineProducts.push(product);
        //   }

        //   // If marketplace field is NULL/empty, add to offline section
        //   if (!hasMarketplaceData) {
        //     offlineProducts.push(product);
        //   }

        //   // If both fields have data, add to both sections
        //   if (hasOfflineData && hasMarketplaceData) {
        //     offlineProducts.push(product);
        //     onlineProducts.push(product);
        //   }
        // });

        // Take only 10 products from each section
        setOfflineProducts(offlineProducts);
        setOnlineProducts(onlineProducts);

        // Debug logging
        console.log("Product categorization results:");
        console.log(`Total products processed: ${allProductsData.length}`);
        console.log(`Offline products: ${offlineProducts.length}`);
        console.log(`Online products: ${onlineProducts.length}`);
        console.log("Sample offline product:", offlineProducts[0]);
        console.log("Sample online product:", onlineProducts[0]);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const productSections = [
    { title: "Hot", subtitle: "Produk dengan rating tertinggi", products: hotProducts },
    { title: "New Arrivals", subtitle: "Produk terbaru yang baru masuk", products: newArrivals },
    { title: "Offline", subtitle: "Tersedia di toko offline", products: offlineProducts },
    { title: "Online", subtitle: "Tersedia di marketplace online", products: onlineProducts },
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
        productSections
          .filter(section => section.title !== "Hot") // Hide HOT section
          .map((section, sectionIndex) => (
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
