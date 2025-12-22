import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Custom hook for managing hero slider functionality
 */
export const useHeroSlider = (slides) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef(null);

  const autoplayMs = 3000;

  // const lastAutoAdvanceAtRef = useRef(null);

  const currentSlideRef = useRef(0);
  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (!slides || slides.length === 0) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        const next = (prev + 1) % slides.length;
    
        return next;
      });
    }, autoplayMs);
  }, [autoplayMs, clearTimer, slides]);

  // Auto-rotate hero slider
  useEffect(() => {
    startTimer();
    return () => {
      clearTimer();
    };
  }, [clearTimer, startTimer]);

  const goToSlide = useCallback(
    (index) => {
      if (!slides || slides.length === 0) return;
      const safeIndex = ((index % slides.length) + slides.length) % slides.length;
      setCurrentSlide(safeIndex);
      startTimer();
    },
    [slides, startTimer]
  );

  const nextSlide = useCallback(() => {
    if (!slides || slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    startTimer();
  }, [slides, startTimer]);

  const prevSlide = useCallback(() => {
    if (!slides || slides.length === 0) return;

    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  }, [slides, startTimer]);

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
  };
};
