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
      className={`py-5 ${sectionIndex % 2 === 0 ? "bg-light" : "bg-white"}`}
    >
      <div className="container-fluid px-3 px-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h1 fw-bold mb-2">{section.title}</h2>
            <p className="text-muted mb-0">{section.subtitle}</p>
          </div>
          <div className="d-flex gap-2 d-none d-md-flex">
            <button
              className="btn btn-outline-secondary rounded-circle p-2"
              onClick={() => scrollCarousel(carouselRef, "left")}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="btn btn-outline-secondary rounded-circle p-2"
              onClick={() => scrollCarousel(carouselRef, "right")}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Draggable Product Carousel */}
        <div
          className="position-relative"
          style={{ maxWidth: "100vw", overflow: "hidden" }}
        >
          <div
            ref={carouselRef}
            className="d-flex gap-3 gap-md-4 pb-3 scrollbar-hide draggable-carousel"
            style={{
              overflowX: "auto",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
              cursor: isDragging ? "grabbing" : "grab",
              userSelect: "none",
              maxWidth: "100%",
              width: "100%",
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
