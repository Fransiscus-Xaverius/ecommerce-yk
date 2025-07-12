import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

import useApiRequest from "../../hooks/useApiRequest";
import { useHeroSlider } from "../../hooks/useHeroSlider";

const HeroSection = () => {
  const [heroSlides, setHeroSlides] = useState([]);

  const { currentSlide, setCurrentSlide } = useHeroSlider(heroSlides);

  const {
    response: bannerResponse,
    isLoading: loadingBanners,
    error: errorBanners,
  } = useApiRequest({
    url: "/api/banners/active",
    method: "GET",
  });

  // Fetch banners from backend
  useEffect(() => {
    if (!bannerResponse) return;
    const responseData = bannerResponse.data;
    // Map backend banner data to existing hero slide structure
    const mappedSlides = responseData.banners.map((banner) => ({
      id: banner.id,
      title: banner.title,
      subtitle: banner.subtitle,
      description: banner.description,
      cta: banner.cta_text,
      image: `${import.meta.env.VITE_BACKEND_URL}${banner.image_url}`,
    }));
    console.log(mappedSlides);
    setHeroSlides(mappedSlides);
  }, [bannerResponse]);

  if (loadingBanners) {
    return <div>Loading banners...</div>; // Or a more sophisticated loading spinner
  }

  if (errorBanners) {
    return <div>Error loading banners: {errorBanners.message}</div>;
  }

  return (
    <section className="position-relative">
      <div id="heroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === currentSlide ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === currentSlide ? "active" : ""}`}
              style={{ height: "70vh", minHeight: "500px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center h-100 text-white"
                style={{
                  background: `radial-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3)), url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundBlendMode: "darken",
                }}
              >
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <h2
                        className="display-3 fw-bold animate_animated animate_fadeInDown text-shadow-4xl mb-3"
                        style={{
                          textShadow: "0 0 12px rgba(0,0,0,0.8), 0 0 24px rgba(0,0,0,0.6)",
                        }}
                      >
                        {slide.title}
                      </h2>
                      <p
                        className="animate_animated animatefadeInUp animate_delay-2s text-shadow-4xl mb-4 text-2xl font-medium"
                        style={{ textShadow: "0 0 8px rgba(0,0,0,0.8)" }}
                      >
                        {slide.description}
                      </p>
                      <button className="btn btn-light btn-lg rounded-pill fw-bold hover-scale animate_animated animatefadeInUp animate_delay-3s px-5 py-3">
                        <div className="flex items-center">
                          {slide.cta}
                          <ArrowRight className="ms-2" size={20} />
                        </div>
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
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
