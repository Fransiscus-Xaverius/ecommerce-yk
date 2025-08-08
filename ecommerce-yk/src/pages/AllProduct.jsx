import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/ui/ProductCard';
import { searchProducts } from '../services/productService';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';

// All products page with pagination (shares styling with SearchResults)
const AllProduct = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 12;

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const { data, isLoading, error } = useQuery({
    queryKey: ['allProducts', page],
    queryFn: async () => {
      // For simplicity reuse searchProducts with empty query + pagination by passing ?q=
      const result = await searchProducts('', page, limit);
      return result;
    },
    keepPreviousData: true,
  });

  const products = data?.products || [];
  const totalItems = data?.totalItems || 0;
  const totalPages = Math.ceil(totalItems / limit) || 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Products</h1>
        </div>
      </div>

      {isLoading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div>Error loading products</div>
      ) : products.length === 0 ? (
        <div>No products found.</div>
      ) : (
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
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="mt-6 flex items-center justify-center sm:mt-8 md:mt-10 lg:mt-12">
          <div className="flex items-center space-x-0.5 sm:space-x-1">
            {/* Previous Button */}
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`flex h-7 w-7 items-center justify-center rounded sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 ${
                page === 1 ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            {/* Dynamic Page Numbers with Ellipsis */}
            {(() => {
              const pageNumbers = [];
              const maxVisiblePages = 5;

              if (totalPages <= maxVisiblePages) {
                for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
              } else {
                pageNumbers.push(1);
                if (page <= 3) {
                  for (let i = 2; i <= 4; i++) pageNumbers.push(i);
                  if (totalPages > 4) pageNumbers.push('...', totalPages);
                } else if (page >= totalPages - 2) {
                  if (totalPages > 4) pageNumbers.push('...');
                  for (let i = totalPages - 3; i <= totalPages; i++) if (i > 1) pageNumbers.push(i);
                } else {
                  pageNumbers.push('...');
                  for (let i = page - 1; i <= page + 1; i++) pageNumbers.push(i);
                  pageNumbers.push('...', totalPages);
                }
              }

              return pageNumbers.map((pageNum, index) => (
                <React.Fragment key={index}>
                  {pageNum === '...' ? (
                    <span className="flex h-7 w-7 items-center justify-center text-xs text-gray-500 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 lg:text-sm">...</span>
                  ) : (
                    <button
                      onClick={() => setPage(pageNum)}
                      className={`h-7 min-w-[1.75rem] rounded px-1.5 text-xs font-medium sm:h-8 sm:min-w-[2rem] sm:px-2 md:h-9 md:min-w-[2.25rem] md:text-sm lg:h-10 lg:min-w-[2.5rem] lg:px-3 ${
                        page === pageNum ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
              className={`flex h-7 w-7 items-center justify-center rounded sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 ${
                page >= totalPages ? 'cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="sm:h-3 sm:w-3 md:h-3.5 md:w-3.5 lg:h-4 lg:w-4"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProduct;
