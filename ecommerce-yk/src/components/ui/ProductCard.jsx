import React from "react";
import { Heart } from "lucide-react";
import Price from "../common/Price";

/**
 * Product Card Component
 * @param {Object} product - Product data
 * @param {Function} onAddToCart - Add to cart handler
 * @param {Function} onToggleWishlist - Wishlist toggle handler
 * @param {boolean} isInWishlist - Whether product is in wishlist
 */
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist, onProductClick, isSingleCard }) => {
  return (
    <div
      className={`${
        isSingleCard ? "w-40 flex-shrink-0 sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px]" : "w-full"
      } min-w-[160px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[240px] xl:min-w-[260px]`}
    >
      <div
        className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-transform hover:scale-[1.02]"
        onClick={() => onProductClick(product.artikel)}
      >
        {/* Badges */}
        <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 sm:left-3 sm:top-3">
          {product.isHot && (
            <span className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white sm:px-2.5 sm:py-1 sm:text-sm">
              HOT
            </span>
          )}
          {product.isNew && (
            <span className="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white sm:px-2.5 sm:py-1 sm:text-sm">
              NEW
            </span>
          )}
          {product.discount && product.harga_diskon && product.harga_diskon > 0 && (
            <span className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white sm:px-2.5 sm:py-1 sm:text-sm">
              {product.discount}% OFF
            </span>
          )}
          {product.soldCount && (
            <span className="rounded bg-gray-900 px-2 py-1 text-xs font-semibold text-white sm:px-2.5 sm:py-1 sm:text-sm">
              {product.soldCount} sold
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg sm:right-3 sm:top-3 sm:h-9 sm:w-9 md:h-10 md:w-10"
        >
          <Heart
            size={16}
            className={`sm:h-5 sm:w-5 md:h-6 md:w-6 ${isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"}`}
          />
        </button>

        {/* Product Image */}
        <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gray-50 sm:h-44 md:h-52 lg:h-60">
          <img
            src={
              product.gambar && product.gambar.length > 0
                ? product.gambar[0]
                : `https://via.placeholder.com/280x224/e3e3e3/666?text=${encodeURIComponent(product.nama)}`
            }
            alt={product.nama}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <div className="hidden text-center">
            <div className="text-4xl sm:text-6xl">👟</div>
          </div>
        </div>

        {/* Product Info - flex-1 to fill remaining space */}
        <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
          <h5 className="mb-2 line-clamp-2 min-h-[2.5rem] text-sm font-bold text-gray-900 sm:mb-3 sm:min-h-[3rem] sm:text-base md:text-lg">
            {product.nama}
          </h5>

          {/* Price */}
          <div className="mb-3 flex flex-1 flex-col justify-end sm:mb-4">
            <Price original={product.originalPrice || product.harga} discount={product.harga_diskon} size="md" />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="mt-auto w-full rounded-full bg-milky-blue py-2.5 text-sm font-semibold text-white transition-colors hover:bg-milky-blue/90 sm:py-3 sm:text-base md:text-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
