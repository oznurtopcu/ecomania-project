import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Slider = () => {
  // const sampleSlides = [
  //   {
  //     image: "", // Replace with the actual URL of your image (or use require('./image.jpg') if local)
  //     summerText: "SUMMER 2020",
  //     newCollectionText: "NEW COLLECTION",
  //     description:
  //       "We know how large objects will act, but things on a small scale.",
  //     buttonText: "SHOP NOW",
  //   },
  //   {
  //     image: "", // Add more slides as needed
  //     summerText: "SUMMER 2021", // Example different content
  //     newCollectionText: "Another Collection",
  //     description: "Example description for the second slide.",
  //     buttonText: "EXPLORE MORE",
  //   },
  //   // ... more slides
  // ];

  //   const [currentIndex, setCurrentIndex] = useState(0);

  //   const goToPrevious = () => {
  //     const isFirstSlide = currentIndex === 0;
  //     const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
  //     setCurrentIndex(newIndex);
  //   };

  //   const goToNext = () => {
  //     const isLastSlide = currentIndex === slides.length - 1;
  //     const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //     setCurrentIndex(newIndex);
  //   };

  return (
    // <div className="relative w-full h-screen overflow-hidden">
    //   {" "}
    //   {/* Full height container */}
    //   {slides.map((slide, index) => (
    //     <div
    //       key={index}
    //       className={`absolute w-full h-full transition-transform duration-500 bg-[#2DC071]${
    //         index === currentIndex ? "translate-x-0" : "translate-x-full"
    //       }`}
    //       style={{
    //         backgroundImage: `url('${slide.image}')`,
    //         backgroundSize: "cover",
    //         backgroundPosition: "center",
    //       }}
    //     >
    //       <div className="absolute inset-0 bg-sky-500 opacity-90"></div>{" "}
    //       {/* Blue background overlay */}
    //       <div className="relative px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto h-full flex flex-col justify-center items-center text-center">
    //         <p className="text-white uppercase text-sm sm:text-base font-semibold mb-2">
    //           {slide.summerText}
    //         </p>
    //         <h2 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
    //           {slide.newCollectionText}
    //         </h2>
    //         <p className="text-white text-base sm:text-lg mb-8">
    //           {slide.description}
    //         </p>
    //         <button className="bg-lime-500 hover:bg-lime-600 text-white font-bold py-3 px-8 rounded-md shadow-lg">
    //           {slide.buttonText}
    //         </button>
    //       </div>
    //     </div>
    //   ))}
    //   {/* Navigation Arrows */}
    //   <button
    //     onClick={goToPrevious}
    //     className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 text-gray-800 font-bold p-2 rounded-full"
    //   >
    //     <ChevronLeft />
    //   </button>
    //   <button
    //     onClick={goToNext}
    //     className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-70 text-gray-800 font-bold p-2 rounded-full"
    //   >
    //     <ChevronRight />
    //   </button>
    // </div>

    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide>
        <img src="https://placehold.co/414x753" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://placehold.co/414x753" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://placehold.co/414x753" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="https://placehold.co/414x753" alt="Slide 1" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
