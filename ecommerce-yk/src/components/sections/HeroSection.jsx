import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import useApiRequest from "../../hooks/useApiRequest";
import { useHeroSlider } from "../../hooks/useHeroSlider";

import { loadScopedCSS, sanitizeImageUrl } from "../../utils/helpers";

const HeroSection = () => {
  const [heroSlides, setHeroSlides] = useState([]);

  const { currentSlide, goToSlide, nextSlide, prevSlide } = useHeroSlider(heroSlides);

  const {
    response: bannerResponse,
    isLoading: loadingBanners,
    error: errorBanners,
  } = useApiRequest({
    url: "/api/banners/active",
    method: "GET",
  });

  useEffect(() => {
    const clean = loadScopedCSS(
      "https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css",
      ".hero-section-scoped"
    );
    return () => {
      clean();
    };
  }, []);

  // Fetch banners from backend
  useEffect(() => {
    if (!bannerResponse) return;
    const responseData = bannerResponse.data;
    // Map backend banner data to existing hero slide structure and sanitize image URLs
    const mappedSlides = responseData.banners.map((banner) => ({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      cta: banner.cta_text,
      cta_link: banner.cta_link,
      image: sanitizeImageUrl(banner.image_url),
    }));
    setHeroSlides(mappedSlides);
  }, [bannerResponse]);

  // Preload banner images so slide changes feel instant
  useEffect(() => {
    if (heroSlides.length === 0) return;
    heroSlides.forEach((slide) => {
      if (!slide?.image) return;
      const img = new Image();
      img.src = slide.image;
    });
  }, [heroSlides]);

  if (loadingBanners) {
    return <div>Loading banners...</div>; // Or a more sophisticated loading spinner
  }

  if (errorBanners) {
    return <div>Error loading banners: {errorBanners.message}</div>;
  }

  return (
    <section className="position-relative hero-section-scoped">
      <div id="heroCarousel" className="carousel slide carousel-fade">
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === currentSlide ? "active" : ""}
              aria-label={`Go to slide ${index + 1}`}
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter" && e.key !== " ") return;
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? "active" : ""} hero-responsive`}
              aria-hidden={index !== currentSlide}
              style={{ display: index === currentSlide ? "block" : "none" }}
            >
              <div
                className="d-flex align-items-center justify-content-center h-100 position-relative text-white"
                style={{
                  background: `radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.0))`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {/* Semi-transparent background image */}
                <div
                  className="position-absolute w-100 h-100"
                  style={{
                    background: `url(${slide.image})`,
                    backgroundSize: "100% 100%",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    mask: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.8) 100%)",
                    WebkitMask: "radial-gradient(circle at center, black 0%, rgba(0,0,0,0.8) 100%)",
                    zIndex: -1,
                  }}
                ></div>
                <div className="container px-3 text-center sm:px-4">
                  <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-lg-8">
                      <h2
                        className="display-6 display-sm-4 display-lg-3 fw-bold animate_animated animate_fadeInDown text-shadow-4xl mb-sm-3 mb-2"
                        style={{
                          textShadow: "0 0 12px rgba(0,0,0,0.5), 0 0 24px rgba(0,0,0,0.3)",
                          fontSize: "clamp(1.5rem, 4vw, 3.5rem)",
                          lineHeight: "1.2",
                        }}
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="animate_animated animatefadeInUp animate_delay-2s text-shadow-4xl mb-sm-4 mb-3"
                        style={{
                          textShadow: "0 0 8px rgba(0,0,0,0.8)",
                          fontSize: "clamp(0.9rem, 2.5vw, 1.5rem)",
                          lineHeight: "1.4",
                        }}
                      >
                        {slide.description}
                      </p>
                      <button className="btn btn-light btn-md btn-lg-lg rounded-pill fw-bold hover-scale animate_animated animatefadeInUp animate_delay-3s px-sm-4 px-lg-5 py-sm-2 py-lg-3 px-3 py-2">
                        <Link to={slide.cta_link} target="_blank">
                          <div className="flex items-center justify-center">
                            <span style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }}>{slide.cta}</span>
                            <ArrowRight
                              className="ms-2"
                              size={16}
                              style={{ width: "clamp(16px, 3vw, 20px)", height: "clamp(16px, 3vw, 20px)" }}
                            />
                          </div>
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          aria-label="Previous slide"
          style={{ zIndex: 10, pointerEvents: "auto" }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            e.stopPropagation();
            prevSlide();
          }}
        >
          <span className="carousel-control-prev-icon" style={{ pointerEvents: "none" }}></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          aria-label="Next slide"
          style={{ zIndex: 10, pointerEvents: "auto" }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
          onKeyDown={(e) => {
            if (e.key !== "Enter" && e.key !== " ") return;
            e.preventDefault();
            e.stopPropagation();
            nextSlide();
          }}
        >
          <span className="carousel-control-next-icon" style={{ pointerEvents: "none" }}></span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
