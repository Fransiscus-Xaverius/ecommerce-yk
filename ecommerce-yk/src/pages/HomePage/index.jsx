import { useState, useEffect } from "react";

// Section Components
import HeroSection from "../../components/sections/HeroSection";
import FeaturesSection from "../../components/sections/FeaturesSection";
import Newsletter from "../../components/sections/Newsletter";

// UI Components
import ProductCarousel from "../../components/ui/ProductCarousel";

// Hooks
import { useCart } from "../../hooks/useCart";
import { fetchProductList } from "../../services/productService.js";

export default function HomePage() {
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

        // Fetch New Arrivals robustly: get larger window and sort on client using best-available date
        const rawNewArrivals = await fetchProductList({
          limit: 10,
          sortColumn: "tanggal_update",
          sortDirection: "desc",
        });

        const parseDate = (d) => {
          if (!d) return 0;
          const t = Date.parse(d);
          return Number.isNaN(t) ? 0 : t;
        };

        const pickNewestTimestamp = (p) => {
          // Prefer tanggal_update, then tanggal_terima, then tanggal_produk
          return Math.max(parseDate(p.tanggal_update), parseDate(p.tanggal_terima), parseDate(p.tanggal_produk));
        };

        const sortedNewest = rawNewArrivals
          .slice()
          .sort((a, b) => pickNewestTimestamp(b) - pickNewestTimestamp(a))
          .slice(0, 10)
          .map((product) => ({ ...product, isNew: true }));

        setNewArrivals(sortedNewest);

        // Fetch all products to categorize into Offline and Online sections
        // const allProductsData = await fetchProductList({});

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

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchInitialProducts();
  }, []);

  const productSections = [
    { title: "Hot", slug: "hot", subtitle: "Produk dengan rating tertinggi", products: hotProducts },
    { title: "New Arrivals", slug: "new", subtitle: "Produk terbaru yang baru masuk", products: newArrivals },
    { title: "Offline", slug: "offline", subtitle: "Tersedia di toko offline", products: offlineProducts },
    { title: "Online", slug: "online", subtitle: "Tersedia di marketplace online", products: onlineProducts },
  ];

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
          .filter((section) => section.title !== "Hot") // Hide HOT section
          .map((section, sectionIndex) => (
            <ProductCarousel key={sectionIndex} section={section} sectionIndex={sectionIndex} onAddToCart={addToCart} />
          ))
      )}

      {/* Newsletter Section */}
      <Newsletter />
    </>
  );
}
