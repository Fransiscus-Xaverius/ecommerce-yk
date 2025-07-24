import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ui/ProductCard";
import { searchProducts } from "../services/productService";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("q");
  const [page, setPage] = useState(1);

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const { data, error, isLoading } = useQuery({
    queryKey: ["searchResults", query, page],
    queryFn: () => searchProducts(query, page, 12),
    enabled: !!query,
    keepPreviousData: true, // Optional: to keep showing old data while new data is fetching
  });

  const products = data?.products || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / 12);

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
      <h1 className="mb-4 text-2xl font-bold">Hasil Pencarian untuk "{query}"</h1>

      {products.length > 0 ? (
        <div>
          <p className="mb-6 text-gray-600">Ditemukan {totalItems} produk</p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

          {/* Pagination Controls */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sebelumnya
            </button>
            <span className="text-gray-700">
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="rounded bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Berikutnya
            </button>
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
