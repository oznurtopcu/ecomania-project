import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const slides = [
  {
    id: 1,
    image: "https://picsum.photos/seed/picsum/1200/800",
    season: "SUMMER 2021",
    title: "NEW COLLECTION",
    description:
      "We know how large objects will act, but things on a small scale.",
    buttonText: "SHOP NOW",
  },
  {
    id: 2,
    image: "https://picsum.photos/seed/picsum/1150/750",
    season: "AUTUMN 2021",
    title: "NEW COLLECTION",
    description:
      "We know how large objects will act, but things on a small scale FOR AUTUMN.",
    buttonText: "SHOP NOW",
  },
  {
    id: 3,
    image: "https://picsum.photos/seed/picsum/1000/650",
    season: "WINTER 2021",
    title: "NEW COLLECTION",
    description:
      "We know how large objects will act, but things on a small scale FOR AUTUMN.",
    buttonText: "SHOP NOW",
  },
];

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation // Okları aktif eder
        modules={[Navigation, Autoplay]} // Navigation modülünü burada belirtiyoruz
        className="h-[700px]"
        autoplay={{ delay: 5000, disableOnInteraction: false }} // 5 saniyede bir geçiş yapacak
        loop={true} // Sonsuz döngü
        speed={1000} //geçişi yavaşlatıyor
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <img
              className="w-full h-full object-cover"
              src={slide.image}
              alt={slide.title}
            />
            <div className="absolute top-50 left-0 text-white flex flex-col gap-8 items-center text-center px-12 md:left-20 max-w-2xl">
              <h5>{slide.season}</h5>
              <h1 className="font-bold text-5xl">{slide.title}</h1>
              <p>{slide.description}</p>
              <button className="bg-[#2DC071] text-center py-3 px-8 font-bold text-sm rounded-sm">
                {slide.buttonText}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
