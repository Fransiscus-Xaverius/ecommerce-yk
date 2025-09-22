import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import EmptyState from "../components/common/EmptyState";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Pagination from "../components/common/Pagination";
import ProductCard from "../components/ui/ProductCard";

// Hooks
import useAllProducts from "../hooks/useAllProducts";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";

// Constants
import { PAGE_SIZE } from "../constants/pagination";

// All products page with pagination (shares styling with SearchResults)
const AllProduct = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = PAGE_SIZE;

  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const { products, totalItems, isLoading, error } = useAllProducts(page, limit, true);
  const totalPages = Math.ceil(totalItems / limit) || 1;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col items-start justify-between gap-2 sm:mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Products</h1>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Memuat produk..." />
      ) : error ? (
        <EmptyState title="Error memuat produk" description={error.message} />
      ) : products.length === 0 ? (
        <EmptyState title="Produk tidak ditemukan" description="Belum ada produk untuk ditampilkan." />
      ) : (
        <>
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
          <Pagination
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-12"
          />
        </>
      )}
    </div>
  );
};

export default AllProduct;
