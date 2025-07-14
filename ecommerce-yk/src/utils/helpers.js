// Utility functions for the Yongki Komaladi website

/**
 * Format price to Indonesian Rupiah currency
 * @param {number} price - The price to format
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};

/**
 * Scroll carousel in specified direction
 * @param {React.RefObject} ref - The carousel ref
 * @param {string} direction - 'left' or 'right'
 */
export const scrollCarousel = (ref, direction) => {
  if (ref.current) {
    // Updated scroll amount to match new card width (280px) + gap (24px)
    const scrollAmount = 304;
    ref.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};

/**
 * Load Bootstrap CSS dynamically
 */
export const loadBootstrapCSS = () => {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css";
  document.head.appendChild(link);

  return () => {
    document.head.removeChild(link);
  };
};
