import React from "react";
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
  return (
    <div
      className="flex-shrink-0"
      style={{
        width: "clamp(250px, 30vw, 300px)",
        maxWidth: "300px",
        minWidth: "250px",
      }}
    >
      <div className="card h-100 shadow-sm product-card position-relative overflow-hidden">
        {/* Badges */}
        <div className="position-absolute top-0 start-0 p-3 z-3">
          {product.isNew && (
            <span className="badge bg-success mb-2 d-block">NEW</span>
          )}
          {product.discount && (
            <span className="badge bg-danger d-block">
              {product.discount}% OFF
            </span>
          )}
          {product.soldCount && (
            <span className="badge bg-dark d-block">
              {product.soldCount} sold
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="btn btn-light btn-sm rounded-circle position-absolute top-0 end-0 m-3 z-3"
        >
          <Heart
            size={18}
            className={isInWishlist ? "text-danger fill-danger" : ""}
          />
        </button>

        {/* Product Image */}
        <div
          className="bg-gradient-to-br from-gray-100 to-gray-300 d-flex align-items-center justify-content-center product-image"
          style={{ height: "250px" }}
        >
          <div className="text-center">
            <div className="display-1 shoe-icon">👟</div>
          </div>
        </div>

        {/* Product Info */}
        <div className="card-body">
          <h5 className="card-title fw-bold">{product.name}</h5>

          {/* Rating */}
          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating) ? "fill-warning" : ""
                  }
                />
              ))}
            </div>
            <small className="text-muted">{product.rating}</small>
          </div>

          {/* Price */}
          <div className="mb-3">
            <h5 className="text-primary fw-bold mb-0">
              {formatPrice(product.price)}
            </h5>
            {product.originalPrice && (
              <small className="text-muted text-decoration-line-through">
                {formatPrice(product.originalPrice)}
              </small>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="btn btn-primary w-100 rounded-pill fw-bold add-to-cart-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
