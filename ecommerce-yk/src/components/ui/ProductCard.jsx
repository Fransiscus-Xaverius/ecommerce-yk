import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { formatPrice } from "../../utils/helpers";

/**
 * Product Card Component
 * @param {Object} product - Product data
 * @param {Function} onAddToCart - Add to cart handler
 * @param {Function} onToggleWishlist - Wishlist toggle handler
 * @param {boolean} isInWishlist - Whether product is in wishlist
 */
const ProductCard = ({ product, onAddToCart, onToggleWishlist, isInWishlist, onProductClick }) => {
  return (
    <div className="w-[280px] flex-shrink-0">
      <div
        className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-transform hover:scale-[1.02]"
        onClick={() => onProductClick(product.artikel)}
      >
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">NEW</span>
          )}
          {product.discount && (
            <span className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          )}
          {product.soldCount && (
            <span className="rounded bg-gray-900 px-2 py-1 text-xs font-semibold text-white">
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
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition-shadow hover:shadow-lg"
        >
          <Heart size={18} className={isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>

        {/* Product Image */}
        <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50">
          <img
            src={`https://via.placeholder.com/280x224/e3e3e3/666?text=${encodeURIComponent(product.nama)}`}
            alt={product.nama}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "block";
            }}
          />
          <div className="hidden text-center">
            <div className="text-6xl">👟</div>
          </div>
        </div>

        {/* Product Info - flex-1 to fill remaining space */}
        <div className="flex flex-1 flex-col p-4">
          <h5 className="mb-3 line-clamp-2 min-h-[3rem] font-bold text-gray-900">{product.nama}</h5>

          {/* Rating - Horizontal */}
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={star <= Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mb-4 flex flex-1 flex-col justify-end">
            <h5 className="mb-1 text-lg font-bold text-blue-600">{formatPrice(product.harga)}</h5>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="mt-auto w-full rounded-full bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
