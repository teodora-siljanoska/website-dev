/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import deskImage from './assets/ProfileImage.png';
import backImage from './assets/BackImage.svg';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import { ComponentPageBlocksTestimonialCard } from '@utils/types';
import ReactMarkdown from 'react-markdown';

function TestimonialCardBlock({
  image,
  description,
}: ComponentPageBlocksTestimonialCard): JSX.Element {
  return (
    <div className="container mx-auto">
      <div className="relative  mx-auto flex w-full justify-between bg-purple/10 phoneS:pb-3 xl:w-[87%]">
        <div className="absolute right-0 z-0 h-[290px] w-[290px] scale-x-[-1] sm:left-0 sm:h-[240px] sm:w-[240px] sm:scale-x-[1]">
          <Image
            unoptimized
            alt="image"
            src={backImage.src}
            height={391}
            width={391}
          />
        </div>
        <div className=" z-10   flex flex-col items-center justify-center gap-x-12 px-60  sm:flex-row  ">
          <div className="mx-8 mt-8 flex justify-center xs:pl-10 phoneLarge:pl-12 phoneS:pl-20  heroBreakOne:pl-[20%] sm:my-[50px] sm:mx-0 sm:h-[192px] sm:w-[192px] sm:pl-0">
            <Image
              unoptimized
              alt="image"
              src={findMediaUrl(image) ?? deskImage.src}
              height={182}
              width={182}
            />
          </div>

          {/* </div> */}

          <div className="flex px-[8%]  py-[35px]  text-left text-[18px] font-['Mont-regular'] text-purple sm:w-2/3  sm:px-0    sm:text-[24px]">
            <ReactMarkdown>{description ?? ''}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TestimonialCardBlock;
