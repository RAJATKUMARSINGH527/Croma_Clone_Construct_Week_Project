import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Bank_Offers from "./HomePages/Bank_Offers";
import Cromaheaders from "./HomePages/Cromaheaders";

export default function ACPromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1739976850/Croma%20Assets/CMS/LP%20Page%20Banners/2025/campaigns/Summer%20Campaign/HP%20Rotating/19022025/HP_Rotating_SC_19Feb2025_uf8bkt.jpg",
    "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1742644884/Croma%20Assets/CMS/LP%20Page%20Banners/2025/HP%20Rotating%20Banners/March/24032025/desktop/HP_Rotating_Camera_24March2025_el1tqj.jpg",
    "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1742792963/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/March/24032025/HP_Rotating_Vivo_24March2025_skqc1a.jpg",
    "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1742792964/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/March/24032025/HP_Rotating_ACs_24March2025_kkt3ab.jpg",
    "https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1742792965/Croma%20Assets/CMS/LP%20Page%20Banners/2025/Sanity/HP/March/24032025/HP_Rotating_TV_24March2025_wdblz2.jpg",
  ];

  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      <div className="relative w-full h-[60vh] md:h-screen overflow-hidden">
        {/* Image container */}
        <div className="w-full h-full flex transition-transform duration-500 ease-in-out">
          <img
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-1 md:p-2 cursor-pointer transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 rounded-full p-1 md:p-2 cursor-pointer transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6 md:h-8 md:w-8 text-white" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <Bank_Offers />
      <Cromaheaders />
    </>
  );
}
