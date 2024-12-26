"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const SecImagesCarousel = ({ images, texts, transitionDuration = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, transitionDuration);

    return () => clearInterval(interval);
  }, [images.length, transitionDuration]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-[2000ms] ease-in-out ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
        >
          <Image
            src={image}
            alt={`Slide ${index + 1}`}
            width={20}
            height={20}
            className={`w-full h-full object-cover transition-transform duration-[6000ms] ${index === currentImageIndex ? "scale-105" : ""
              }`}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-40 p-4">
            <h1
              className={`font-poppins text-3xl xs:text-3xl sm:text-2xl md:text-4xl lg:text-4xl xl:text-6xl font-medium mb-4 transition-all duration-[4000ms] transform ${index === currentImageIndex ? "translate-y-0 opacity-100" : "translate-y-[-200px] opacity-0"
                }`}
            >
              {texts[index]?.title}
            </h1>
            <p
              className={`font-poppins text-sm sm:text-base md:text-lg lg:text-xl xl:text-xl transition-all duration-[4000ms] transform ${index === currentImageIndex ? "translate-y-0 opacity-100" : "translate-y-[-200px] opacity-0"
                }`}
            >
              {texts[index]?.paragraph}
            </p>
            
          </div>
        </div>
      ))}
    </section>
  );
};

export default SecImagesCarousel;
