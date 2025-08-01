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
    <section className={`py-8 sm:py-12 ${sectionIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-4">
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          <div>
            <h2 className="mb-1 text-xl font-bold text-gray-900 sm:mb-2 sm:text-2xl md:text-3xl">{section.title}</h2>
            <p className="text-sm text-gray-600 sm:text-base">{section.subtitle}</p>
          </div>
          <div className={`${section.products.length > 4 ? 'hidden gap-2 md:flex' : 'hidden'}`}>
            <button
              className="rounded-full border border-gray-300 p-1.5 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 sm:p-2"
              onClick={() => scrollCarousel(carouselRef, "left")}
            >
              <ChevronLeft size={16} className="sm:h-5 sm:w-5" />
            </button>
            <button
              className="rounded-full border border-gray-300 p-1.5 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 sm:p-2"
              onClick={() => scrollCarousel(carouselRef, "right")}
            >
              <ChevronRight size={16} className="sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Draggable Product Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={carouselRef}
            className={`scrollbar-hide pb-4 ${
              section.products.length < 5 
                ? 'flex justify-start gap-2 sm:gap-3 md:gap-4 lg:gap-6' 
                : 'flex gap-2 overflow-x-auto sm:gap-3 md:gap-4 lg:gap-6'
            }`}
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
                isSingleCard={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
