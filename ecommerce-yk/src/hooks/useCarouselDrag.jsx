import { useState, useRef } from "react";

/**
 * Custom hook for managing carousel drag functionality with improved smoothness
 */
export const useCarouselDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef();

  const handleMouseDown = (e, ref) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    // Disable smooth scrolling during drag
    ref.current.style.scrollBehavior = "auto";
    // Cancel any ongoing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleTouchStart = (e, ref) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
    ref.current.style.scrollBehavior = "auto";
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseLeave = (ref) => {
    if (isDragging && ref?.current) {
      ref.current.style.scrollBehavior = "smooth";
    }
    setIsDragging(false);
  };

  const handleMouseUp = (ref) => {
    if (ref?.current) {
      ref.current.style.scrollBehavior = "smooth";
    }
    setIsDragging(false);
  };

  const handleMouseMove = (e, ref) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();

    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother movement

    // Use requestAnimationFrame for smoother scrolling
    animationRef.current = requestAnimationFrame(() => {
      ref.current.scrollLeft = scrollLeft - walk;
    });
  };

  const handleTouchMove = (e, ref) => {
    if (!isDragging || !ref.current) return;

    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 1.5;

    animationRef.current = requestAnimationFrame(() => {
      ref.current.scrollLeft = scrollLeft - walk;
    });
  };

  return {
    isDragging,
    handleMouseDown,
    handleTouchStart,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchMove,
  };
};
