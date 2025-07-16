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
import { fetchProductByArtikel } from "../../services/productService"; // Import the service

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
    const fetchProducts = async (start, end, setter, setLoading, setError) => {
      try {
        const fetchedProducts = [];
        for (let i = start; i <= end; i++) {
          const artikel = `ART-${String(i).padStart(6, "0")}`;
          const product = await fetchProductByArtikel(artikel); // Use the service
          if (product) {
            fetchedProducts.push(product);
          }
        }
        setter(fetchedProducts);
        console.log(`Fetched products from ${start} to ${end}:`, fetchedProducts);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(1, 10, setNewArrivals, setLoadingNewArrivals, setErrorNewArrivals);
    // Best Seller section is hidden
    // fetchProducts(11, 20, setBestSellers, setLoadingBestSellers, setErrorBestSellers);
    fetchProducts(21, 30, setSpecialDeals, setLoadingSpecialDeals, setErrorSpecialDeals);
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
