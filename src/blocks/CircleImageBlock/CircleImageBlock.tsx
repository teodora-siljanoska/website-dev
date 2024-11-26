import { ComponentPageBlocksCircleImage } from '@utils/types';
import React from 'react';
import Title from '../../components/Title';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import circleMain from './assets/cireMain.png';
import { useMediaQuery } from 'react-responsive';

function CircleImageBlock({
  imageBlock,
  leftBottom,
  leftTop,
  rightBottom,
  rightTop,
}: ComponentPageBlocksCircleImage): JSX.Element {
  const isSmall = useMediaQuery({ maxWidth: 736 });

  return (
    <div className="mx-auto flex max-w-[90%] flex-col gap-x-[60px] lg:flex-row xlSpecial:max-w-[74%] 3xl:container">
      <div className="my-5 basis-1/4 flex-col justify-between text-center lg:text-left portrait:md:gap-y-10 md:flex hidden">
        <div className="flex flex-col gap-3">
          <div className="font-['Mont-semibold'] text-lg leading-[23px] text-darkGreen">
            {leftTop?.titleItemCircle}
          </div>
          <div className="font-['Mont-book'] text-sm leading-[18px] text-darkGrey">
            {leftTop?.descriptionItemCircle}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-['Mont-semibold'] text-lg leading-[23px] text-lightGreen">
            {leftBottom?.titleItemCircle}
          </div>
          <div className="font-['Mont-book'] text-sm leading-[18px] text-darkGrey">
            {leftBottom?.descriptionItemCircle}
          </div>
        </div>
      </div>
      <div className="flex basis-2/4 justify-center smallest:hidden md:flex items-center">
        <Image
          src={findMediaUrl(imageBlock) ?? circleMain}
          width={403}
          height={403}
          layout="fixed"
          alt="info"
        />
      </div>
      <div className="my-5 basis-1/4 flex-col justify-between gap-y-10 text-center md:hidden flex">
        <div className="flex flex-col gap-3">
          <div className="tet font-['Mont-semibold'] text-lg leading-[23px] text-darkGreen">
            {leftTop?.titleItemCircle}
          </div>
          <div className="font-['Mont-book'] text-sm leading-[18px] text-darkGrey">
            {leftTop?.descriptionItemCircle}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-['Mont-semibold'] text-lg leading-[23px] text-lightGreen">
            {leftBottom?.titleItemCircle}
          </div>
          <div className="font-['Mont-book'] text-sm leading-[18px] text-darkGrey">
            {leftBottom?.descriptionItemCircle}
          </div>
        </div>
      </div>
      <div className="my-5 flex basis-1/4 flex-col justify-between gap-y-10 text-center  smallest:mb-[50px] md:mb-0 lg:text-left">
        <div className="flex flex-col gap-3">
          <div className="font-['Mont-semibold'] text-lg leading-[23px] text-darkGreen">
            {rightTop?.titleItemCircle}
          </div>
          <div className="font-['Mont-book'] text-sm leading-[18px] text-darkGrey">
            {rightTop?.descriptionItemCircle}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="font-['Mont-semibold'] text-lg leading-[23px] text-lightGreen">
            {rightBottom?.titleItemCircle}
          </div>
          <div className="font-['Mont-book'] text-sm leading-[18px] text-darkGrey">
            {rightBottom?.descriptionItemCircle}
          </div>
        </div>
      </div>
      <div className="flex basis-2/4 justify-center smallest:flex md:hidden">
        <Image
          src={findMediaUrl(imageBlock) ?? circleMain}
          width={403}
          height={403}
          layout="intrinsic"
          alt="info"
        />
      </div>
    </div>
  );
}
export default CircleImageBlock;
