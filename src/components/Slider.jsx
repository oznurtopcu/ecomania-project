import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Slider() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      navigation // Okları aktif eder
      modules={[Navigation]} // Navigation modülünü burada belirtiyoruz
      className="h-[700px]"
    >
      <SwiperSlide className="relative">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://picsum.photos/seed/picsum/1200/800"
          alt="Slide 1"
        />
        <div className="absolute top-50 left-0 text-red flex flex-col gap-8 items-center text-center px-12 md:left-20">
          <h5>SUMMER 2021</h5>
          <h1 className="font-bold text-5xl">NEW COLLECTION</h1>
          <p>
            We know how large objects will act, but things on a small scale.
          </p>
          <button className="bg-[#2DC071] text-center py-3 px-8 font-bold text-sm rounded-sm">
            SHOP NOW
          </button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://picsum.photos/seed/picsum/1200/800"
          alt="Slide 1"
        />
      </SwiperSlide>
      <SwiperSlide className="">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://picsum.photos/seed/picsum/1200/800"
          alt="Slide 1"
        />
      </SwiperSlide>
    </Swiper>
  );
}
