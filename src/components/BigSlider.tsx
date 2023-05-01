import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import testSlider2 from "../assets/sliders/slide-2.png";
import testSlider1 from "../assets/sliders/slide-1.png";
import testSlider3 from "../assets/sliders/slide-3.png";

import { Navigation, Autoplay } from "swiper";
import ImageWithLoader from "./ImageWithLoader";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";

const BANNERS = [
  {
    image: testSlider1,
    link: { pathname: `/category/Jordan`, query: { id: 2 } },
  },
  {
    image: testSlider3,
    link: { pathname: `/category/Running Shoes`, query: { id: 3 } },
  },
  {
    image: testSlider2,
    link: { pathname: `/category/Sneakers`, query: { id: 4 } },
  },
];

const BigSlider = () => (
  <section className="overflow-hidden w-full relative flex flex-col lg:px-6 lg:pb-6">
    <div>
      <Swiper
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        className="mySwiper flex items-stretch"
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: `#swiper-button-next`,
          prevEl: `#swiper-button-prev`,
        }}
      >
        {BANNERS.map((element, index) => (
          <SwiperSlide key={index}>
            <Link
              href={{
                pathname: element.link.pathname,
                query: element.link.query,
              }}
              className="relative"
            >
              <div className="uppercase absolute bg-white py-2 px-2 text-sm md:py-5 md:px-9 bottom-6 md:bottom-24 md:shadow-md font-bold md:text-2xl">
                shop now
              </div>
              <ImageWithLoader
                width={1500}
                height={75}
                src={element.image}
                alt="banner"
                className="w-full md:w-auto h-[230px] object-cover md:h-[550px]"
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <section className="absolute bottom-0 right-0 lg:mr-6 lg:mb-6 z-30 flex flex-row">
      <div
        id={`swiper-button-prev`}
        className={`items-center justify-center cursor-pointer z-20 text-xl ml-1 mr-[1px] w-[50%] p-2 md:px-5 md:py-4 bg-black`}
      >
        <AiOutlineArrowLeft className="text-white " />
      </div>
      <div
        id={`swiper-button-next`}
        className={`items-center justify-center cursor-pointer z-20 text-xl w-[50%] p-2 md:px-5 md:py-4 bg-black`}
      >
        <AiOutlineArrowRight className="text-white cursor-pointer" />
      </div>
    </section>
  </section>
);

export default BigSlider;
