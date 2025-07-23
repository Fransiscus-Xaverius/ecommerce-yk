import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCarousel from "../components/ui/ProductCarousel";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import ProductCard from "../components/ui/ProductCard";
import { searchProducts } from "../services/productService"; // Import searchProducts

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const { data: products, error, isLoading } = useQuery({
    queryKey: ["searchResults", query],
    queryFn: () => searchProducts(query), // Use searchProducts
    enabled: !!query, // Only run the query if a query exists
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-purple-600"></div>
        </div>
        <p className="mt-4 text-gray-600">Mencari produk...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="text-red-500">
          <h2 className="mb-2 text-xl font-bold">Terjadi Kesalahan</h2>
          <p>Error: {error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Search Results for "{query}"</h1>

      {products && products.length > 0 ? (
        <div>
          <p className="mb-6 text-gray-600">Ditemukan {products.length} produk</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onToggleWishlist={toggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
                onProductClick={(artikel) => navigate(`/product/${artikel}`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="py-12 text-center">
          <div className="mb-4 text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">Tidak ada produk ditemukan</h3>
          <p className="mt-2 text-gray-500">Coba gunakan kata kunci yang berbeda untuk pencarian Anda.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
