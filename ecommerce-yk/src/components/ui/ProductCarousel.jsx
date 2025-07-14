import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../ui/ProductCard";
import { scrollCarousel } from "../../utils/helpers";
import { useCarouselDrag } from "../../hooks/useCarouselDrag";

/**
 * Product Carousel Component with drag/swipe functionality
 * @param {Object} section - Section data with title, subtitle, and products
 * @param {Function} onAddToCart - Add to cart handler
 * @param {Function} onToggleWishlist - Wishlist toggle handler
 * @param {Array} wishlist - Array of wishlist product IDs
 * @param {number} sectionIndex - Section index for styling
 */
const ProductCarousel = ({ section, onAddToCart, onToggleWishlist, wishlist, sectionIndex }) => {
  const navigate = useNavigate();

  const handleProductClick = (artikel) => {
    navigate(`/product/${artikel}`);
  };
  const carouselRef = useRef(null);
  const {
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchMove,
    isDragging,
  } = useCarouselDrag();

  return (
    <section className={`py-12 ${sectionIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900">{section.title}</h2>
            <p className="text-gray-600">{section.subtitle}</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              className="rounded-full border border-gray-300 p-2 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
              onClick={() => scrollCarousel(carouselRef, "left")}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="rounded-full border border-gray-300 p-2 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50"
              onClick={() => scrollCarousel(carouselRef, "right")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Draggable Product Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto pb-4"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
            onMouseDown={(e) => handleMouseDown(e, carouselRef)}
            onMouseLeave={() => handleMouseLeave(carouselRef)}
            onMouseUp={() => handleMouseUp(carouselRef)}
            onMouseMove={(e) => handleMouseMove(e, carouselRef)}
            onTouchStart={(e) => handleTouchStart(e, carouselRef)}
            onTouchEnd={() => handleMouseUp(carouselRef)}
            onTouchMove={(e) => handleTouchMove(e, carouselRef)}
          >
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={handleProductClick}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isInWishlist={wishlist.includes(product.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
