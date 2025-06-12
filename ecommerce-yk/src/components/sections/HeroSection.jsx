import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = ({ slides, currentSlide, setCurrentSlide }) => {
  return (
    <section className="position-relative">
      <div
        id="heroCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={index === currentSlide ? "active" : ""}
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${
                index === currentSlide ? "active" : ""
              }`}
              style={{ height: "70vh", minHeight: "500px" }}
            >
              <div
                className="d-flex align-items-center justify-content-center h-100 text-white"
                style={{ background: slide.image }}
              >
                <div className="container text-center">
                  <div className="row justify-content-center">
                    <div className="col-lg-8">
                      <h2 className="display-3 fw-bold mb-3 animate_animated animate_fadeInDown">
                        {slide.title}
                      </h2>
                      <h3 className="h2 mb-3 animate_animated animatefadeInUp animate_delay-1s">
                        {slide.subtitle}
                      </h3>
                      <p className="lead mb-4 animate_animated animatefadeInUp animate_delay-2s">
                        {slide.description}
                      </p>
                      <button className="btn btn-light btn-lg px-5 py-3 rounded-pill fw-bold hover-scale animate_animated animatefadeInUp animate_delay-3s">
                        {slide.cta} <ArrowRight className="ms-2" size={20} />
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
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
