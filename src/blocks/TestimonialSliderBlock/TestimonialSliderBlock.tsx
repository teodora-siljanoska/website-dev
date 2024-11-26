/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
// import SwiperCore, { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

import TestimonialImage, {
  P as TestimonialImageProps,
} from '@components/TestimonialImage';
import sliderRight from '../../components/assets/arrowRight.svg';
import sliderLeft from '../../components/assets/arrowLeft.svg';
import { ComponentPageBlocksTestimonialSlider } from '@utils/types';

import Image from 'next/legacy/image';

export interface P {
  testimonials: TestimonialImageProps[];
}

function TestimonialSliderBlock({
  testimonials,
}: ComponentPageBlocksTestimonialSlider): JSX.Element {
  return (
    <>
      <div id="testimonials" className="relative justify-center">
        <Swiper
          // navigation={true}
          modules={[Navigation]}
          className="sm:container md:w-[90%] xlSpecial:!w-[74%]"
          spaceBetween={32}
          slidesPerView={1}
          observer
          observeParents
          navigation={{
            prevEl: '.classname-of-button-prev-news-carousel',
            nextEl: '.classname-of-button-next-news-carousel',
          }}
          // className="mySwiper"
          breakpoints={
            {
              // when window width is >= 640px
            }
          }
        >
          {testimonials?.map((item, index: number) => (
            <SwiperSlide key={index} className="">
              <TestimonialImage
                testimonialDesc={item?.testimonialDesc ?? ''}
                ceo={item?.ceo ?? ''}
                ceoImage={item?.ceoImage ?? undefined}
                bigImage={item?.bigImage ?? undefined}
                readMore={item?.readMore ?? ''}
              />
            </SwiperSlide>
          ))}
          <button
            type="button"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="classname-of-button-prev-news-carousel absolute left-3 top-[47%] z-20 flex  w-9"
          >
            <i className="absolute">
              <Image alt="image" src={sliderLeft.src} height={25} width={33} />
            </i>
          </button>
          <button
            type="button"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="classname-of-button-next-news-carousel absolute right-3 top-[47%] z-20 flex w-9"
          >
            <i className="absolute">
              <Image alt="image" src={sliderRight.src} height={25} width={33} />
            </i>
          </button>
        </Swiper>
        <div className="absolute bottom-[-2px] z-0 h-32 w-full bg-darkGrey " />
      </div>
    </>
  );
}
export default TestimonialSliderBlock;
