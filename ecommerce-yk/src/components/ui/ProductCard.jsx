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
const ProductCard = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // Scroll to top before navigating
    window.scrollTo(0, 0);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="flex-shrink-0 w-[280px]">
      <div 
        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer relative h-full transition-transform hover:scale-[1.02] flex flex-col" 
        onClick={handleCardClick}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded">NEW</span>
          )}
          {product.discount && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded">
              {product.discount}% OFF
            </span>
          )}
          {product.soldCount && (
            <span className="px-2 py-1 bg-gray-900 text-white text-xs font-semibold rounded">
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
          className="absolute top-3 right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        >
          <Heart
            size={18}
            className={isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"}
          />
        </button>

        {/* Product Image */}
        <div className="h-56 bg-gray-50 flex items-center justify-center relative overflow-hidden">
          <img 
            src={`https://via.placeholder.com/280x224/e3e3e3/666?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="text-center hidden">
            <div className="text-6xl">👟</div>
          </div>
        </div>

        {/* Product Info - flex-1 to fill remaining space */}
        <div className="p-4 flex flex-col flex-1">
          <h5 className="font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3rem]">{product.name}</h5>

          {/* Rating - Horizontal */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.floor(product.rating) 
                      ? "text-yellow-400 fill-yellow-400" 
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="mb-4 flex-1 flex flex-col justify-end">
            <h5 className="text-lg font-bold text-blue-600 mb-1">
              {formatPrice(product.price)}
            </h5>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-colors mt-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
