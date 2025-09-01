'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import {SLIDES_PER_VIEW} from "@/utils/utils.ts";
import {Navigation} from "swiper/modules";
import React, {ReactNode} from "react";
import './SwiperStyle.css'

type PropsType = {
    array: Array<ReactNode>
    slides_per_view: number,
    breakpoints?: {[key: number]: {slidesPerView: number, spaceBetween?: number}};
}

export const SwiperComponent = ({array, slides_per_view, breakpoints}: PropsType) => {
    return (
        <Swiper modules={[Navigation]} slidesPerView={slides_per_view} navigation={true} breakpoints={breakpoints} loop={SLIDES_PER_VIEW > 4}>
            {array.map((item, index) => <SwiperSlide key={index}>{item}</SwiperSlide>)}
        </Swiper>
    );
};