import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import style from "./Swiper.module.scss";
import { ISwiperCompProps } from "../types/component.interfaces";

const SwiperComp: React.FC<ISwiperCompProps> = ({ slides, onSlideChange }) => {
  const handleSlideChange = (swiper: any) => {
    if (onSlideChange) {
      onSlideChange(swiper);
    }
  };

  return (
    <Swiper
      direction="vertical"
      className={style.swiper}
      onSlideChange={(swiper) => handleSlideChange(swiper)}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>{slide.videoContent}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComp;
