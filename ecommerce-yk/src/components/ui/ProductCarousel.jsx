import React, { useRef } from "react";
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
const ProductCarousel = ({
  section,
  onAddToCart,
  onToggleWishlist,
  wishlist,
  sectionIndex,
}) => {
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
    <section
      className={`py-12 ${sectionIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{section.title}</h2>
            <p className="text-gray-600">{section.subtitle}</p>
          </div>
          <div className="hidden md:flex gap-2">
            <button
              className="border border-gray-300 hover:border-gray-400 rounded-full p-2 hover:bg-gray-50 transition-all duration-300"
              onClick={() => scrollCarousel(carouselRef, "left")}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="border border-gray-300 hover:border-gray-400 rounded-full p-2 hover:bg-gray-50 transition-all duration-300"
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
            className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide"
            style={{
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
            onMouseDown={(e) => handleMouseDown(e, carouselRef)}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={(e) => handleMouseMove(e, carouselRef)}
            onTouchStart={(e) => handleTouchStart(e, carouselRef)}
            onTouchEnd={handleMouseUp}
            onTouchMove={(e) => handleTouchMove(e, carouselRef)}
          >
            {section.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
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
