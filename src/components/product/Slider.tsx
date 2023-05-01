import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";
import { product } from "@/interfaces";
import Card from "./Card";

type Props = {};

const Slider = ({cards}: {cards:product[]}) => {


  return (
    <section className="mt-6 flex overflow-x-hidden">
    <Swiper navigation={true} modules={[Navigation]} slidesPerView={1} spaceBetween={15} className="mySwiper flex items-stretch" breakpoints={{

        600: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 30
          },
      }}>
        {
            cards.map((element, index) => (
                <SwiperSlide key={index}>
                     <Card content={element} />
                </SwiperSlide>
            ))
        }
    </Swiper>
    </section>
  );
};

export default Slider;
