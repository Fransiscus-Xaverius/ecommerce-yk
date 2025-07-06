import React from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const HeroSection = ({ slides, currentSlide, setCurrentSlide }) => {
  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="relative h-[70vh] min-h-[500px]">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="flex items-center justify-center h-full text-white relative"
                style={{ 
                  background: slide.image,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-down">
                      {slide.title}
                    </h2>
                    <h3 className="text-2xl md:text-4xl mb-4 animate-fade-in-up animation-delay-1s">
                      {slide.subtitle}
                    </h3>
                    <p className="text-lg md:text-xl mb-8 animate-fade-in-up animation-delay-2s max-w-2xl mx-auto">
                      {slide.description}
                    </p>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 animate-fade-in-up animation-delay-3s inline-flex items-center">
                      {slide.cta} <ArrowRight className="ml-2" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          type="button"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        >
          <ChevronLeft size={24} />
        </button>
        <button
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300"
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
