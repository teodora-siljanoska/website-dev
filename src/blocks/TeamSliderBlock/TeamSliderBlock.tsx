/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import OurTeam from '@components/OurTeam';
import sliderRight from '../../blocks/TeamSliderBlock/assets/sliderRight.svg';
import sliderLeft from '../../blocks/TeamSliderBlock/assets/sliderLeft.svg';
import Title from '../../components/Title';
import Image from 'next/legacy/image';
import {
  ComponentPageBlocksTeamSlider,
  UploadFileEntityResponse,
} from '@utils/types';

function TeamSliderBlock({
  title,
  slide,
}: ComponentPageBlocksTeamSlider): JSX.Element {
  return (
    <>
      <div className="">
        <div className="mb-20">
          <Title cta={title ?? ''} alignment="center" fontSize="Big" />
        </div>
        <Swiper
          // navigation={true}
          modules={[Navigation]}
          className="lg:container"
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
          {slide?.map((item, index) => (
            <SwiperSlide key={index} className="">
              <OurTeam
                testimonialDesc={item?.testimonialDesc ?? ''}
                ceo={item?.ceo ?? ''}
                bigImage={item?.bigImage as UploadFileEntityResponse}
                backgroundImage={
                  item?.backgroundImage as UploadFileEntityResponse
                }
              />
            </SwiperSlide>
          ))}
          <div className="hidden lg:flex">
            <button
              type="button"
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className="classname-of-button-prev-news-carousel absolute left-2 top-[47%] z-20 flex  w-9"
            >
              <i className="absolute">
                <Image
                  alt="image"
                  src={sliderLeft.src}
                  height={25}
                  width={33}
                />
              </i>
            </button>
            <button
              type="button"
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className="classname-of-button-next-news-carousel absolute right-2 top-[47%] z-20 flex w-9"
            >
              <i className="absolute">
                <Image
                  alt="image"
                  src={sliderRight.src}
                  height={25}
                  width={33}
                />
              </i>
            </button>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className="classname-of-button-prev-news-carousel absolute left-[70%] top-[95%] z-20 flex w-9 sm:left-[80%]  md:left-[85%]"
            >
              <i className="absolute">
                <Image
                  alt="image"
                  src={sliderLeft.src}
                  height={25}
                  width={33}
                />
              </i>
            </button>
            <button
              type="button"
              // eslint-disable-next-line tailwindcss/no-custom-classname
              className="classname-of-button-next-news-carousel absolute right-4 top-[95%] z-20 flex w-9"
            >
              <i className="absolute">
                <Image
                  alt="image"
                  src={sliderRight.src}
                  height={25}
                  width={33}
                />
              </i>
            </button>
          </div>
        </Swiper>
      </div>
    </>
  );
}
export default TeamSliderBlock;
