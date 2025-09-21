import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ui/ProductCard";
import { searchProducts } from "../services/productService";
import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import Pagination from "../components/common/Pagination";

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
    return <LoadingSpinner label="Mencari produk..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Terjadi Kesalahan"
        description={error.message}
        action={
          <button
            onClick={() => window.location.reload()}
            className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
          >
            Coba Lagi
          </button>
        }
      />
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-3 py-4 xs:px-4 sm:px-6 md:px-8 lg:px-4 xl:py-8">
      <h1 className="mb-3 text-lg font-bold xs:text-xl sm:mb-4 md:text-2xl">
        Hasil Pencarian untuk "{query}"
      </h1>

      {products.length > 0 ? (
        <div>
          <p className="mb-4 text-sm text-gray-600 sm:mb-6 md:text-base">
            Ditemukan {totalItems} produk
          </p>
          {/* 
            Mobile (< 475px): 2 columns, tight spacing
            Large Mobile (475px - 640px): 2 columns, more spacing
            Small Tablet (640px - 768px): 2 columns, comfortable spacing  
            iPad Portrait (768px - 1024px): 3 columns
            iPad Landscape/Desktop (> 1024px): 4 columns
          */}
          <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5">
            {products.map((product) => (
              <div key={product.id} className="w-full">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.includes(product.id)}
                  onProductClick={(artikel) => navigate(`/product/${artikel}`)}
                />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-12"
          />
        </div>
      ) : (
        <EmptyState
          title="Tidak ada produk ditemukan"
          description="Coba gunakan kata kunci yang berbeda untuk pencarian Anda."
        />
      )}
    </div>
  );
};

export default SearchResults;
