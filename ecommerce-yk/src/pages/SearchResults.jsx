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
          <div className="mt-12 flex items-center justify-center">
            <div className="flex items-center space-x-1">
              {/* Previous Button */}
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className={`flex h-10 w-10 items-center justify-center rounded ${
                  page === 1
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15,18 9,12 15,6"></polyline>
                </svg>
              </button>

              {/* Page Numbers */}
              {(() => {
                const pageNumbers = [];
                const maxVisiblePages = 5;
                
                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pageNumbers.push(i);
                  }
                } else {
                  // Always show first page
                  pageNumbers.push(1);
                  
                  if (page <= 3) {
                    // Show pages 2, 3, 4 and last page
                    for (let i = 2; i <= 4; i++) {
                      pageNumbers.push(i);
                    }
                    if (totalPages > 4) {
                      pageNumbers.push('...', totalPages);
                    }
                  } else if (page >= totalPages - 2) {
                    // Show last few pages
                    if (totalPages > 4) {
                      pageNumbers.push('...');
                    }
                    for (let i = totalPages - 3; i <= totalPages; i++) {
                      if (i > 1) pageNumbers.push(i);
                    }
                  } else {
                    // Show current page and neighbors
                    pageNumbers.push('...');
                    for (let i = page - 1; i <= page + 1; i++) {
                      pageNumbers.push(i);
                    }
                    pageNumbers.push('...', totalPages);
                  }
                }
                
                return pageNumbers.map((pageNum, index) => (
                  <React.Fragment key={index}>
                    {pageNum === '...' ? (
                      <span className="flex h-10 w-10 items-center justify-center text-gray-500">...</span>
                    ) : (
                      <button
                        onClick={() => setPage(pageNum)}
                        className={`h-10 min-w-[2.5rem] rounded px-3 text-sm font-medium ${
                          page === pageNum
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )}
                  </React.Fragment>
                ));
              })()}

              {/* Next Button */}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= totalPages}
                className={`flex h-10 w-10 items-center justify-center rounded ${
                  page >= totalPages
                    ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            </div>
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
