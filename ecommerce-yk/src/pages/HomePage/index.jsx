import { useState, useEffect } from "react";

// Section Components
import HeroSection from "../../components/sections/HeroSection";
// import FeaturesSection from "../../components/sections/FeaturesSection";
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
  const [menProducts, setMenProducts] = useState([]);
  const [womenProducts, setWomenProducts] = useState([]);
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

        const menData = await fetchProductList({
          limit: 12,
          sortColumn: "tanggal_update",
          sortDirection: "desc",
          gender: "Pria",
        });
        const womenData = await fetchProductList({
          limit: 12,
          sortColumn: "tanggal_update",
          sortDirection: "desc",
          gender: "Wanita",
        });

        setMenProducts(menData);
        setWomenProducts(womenData);

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
    { title: "Men", slug: "men", subtitle: "Pilihan gaya terbaik untuk pria", products: menProducts },
    { title: "Women", slug: "women", subtitle: "Koleksi elegan untuk perempuan modern", products: womenProducts },
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      {/* <FeaturesSection /> */}

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
