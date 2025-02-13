import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";

const Slider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {" "}
      {/* Full height container */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-transform duration-500 bg-[#2DC071]${
            index === currentIndex ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-sky-500 opacity-90"></div>{" "}
          {/* Blue background overlay */}
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto h-full flex flex-col justify-center items-center text-center">
            <p className="text-white uppercase text-sm sm:text-base font-semibold mb-2">
              {slide.summerText}
            </p>
            <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {slide.newCollectionText}
            </h2>
            <p className="text-white text-base sm:text-lg mb-8">
              {slide.description}
            </p>
            <button className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-8 rounded-md shadow-lg">
              {slide.buttonText}
            </button>
          </div>
        </div>
      ))}
      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 text-gray-800 font-bold p-2 rounded-full"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 text-gray-800 font-bold p-2 rounded-full"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Slider;
