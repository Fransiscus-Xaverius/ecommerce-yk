import { useState, useEffect } from "react";

/**
 * Custom hook for managing hero slider functionality
 */
export const useHeroSlider = (slides) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotate hero slider
  useEffect(() => {
    if (slides.length === 0) return; // Don't start timer if no slides
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return {
    currentSlide,
    setCurrentSlide,
  };
};
