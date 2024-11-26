import React from 'react';
import bigImg from './assets/teamImage.png';
import { UploadFileEntityResponse } from '@utils/types';
import findMediaUrl from '../../utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/legacy/image';
import ribonimage from '../blocks/TeamSliderBlock/assets/Ribbon.png';

export interface P {
  testimonialDesc: string;
  ceo: string;
  bigImage: UploadFileEntityResponse | undefined;
  backgroundImage: UploadFileEntityResponse | undefined;
}

function OurTeam({
  testimonialDesc,
  ceo,
  bigImage,
  backgroundImage,
}: P): JSX.Element {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 950 });
  const isMobile = useMediaQuery({ maxWidth: 949 });
  return (
    <div className="flex h-full text-left ">
      <div className="m-auto w-full max-w-[100%] place-self-center  bg-[#D9D9D9]/10 lg:max-w-[90%]">
        <div
          className="absolute z-50 h-[20%] w-[80%]  -scale-y-100 bg-contain  bg-left-bottom bg-no-repeat sm:h-[60%] lg:top-56 lg:w-full lg:scale-y-100 lg:bg-left-top"
          style={{
            backgroundImage: `url("${
              findMediaUrl(backgroundImage) ?? ribonimage.src
            }")`,
          }}
        />
        <div className="mx-6 my-9 gap-10 lg:flex">
          <div className="justify-center lg:flex lg:basis-1/5">
            <div className="flex justify-center">
              {isDesktopOrTablet && (
                <Image
                  alt="image"
                  src={findMediaUrl(bigImage) ?? bigImg.src}
                  height={322}
                  width={322}
                  layout="fixed"
                />
              )}
              {isMobile && (
                <Image
                  alt="image"
                  src={findMediaUrl(bigImage) ?? bigImg.src}
                  height={255}
                  width={255}
                  layout="fixed"
                />
              )}
            </div>
          </div>
          <div className="z-50 my-6 flex flex-col gap-5 place-self-start px-8 md:mx-16 lg:m-0 lg:basis-2/3">
            <div className=" max-w-[100%] text-center text-sm font-['Mont-light'] text-darkGrey md:text-left lg:text-left lg:text-[18px] lg:leading-6">
              <ReactMarkdown>{testimonialDesc}</ReactMarkdown>
            </div>
            <div className="text-center font-['Mont-regular'] text-darkGrey prose-p:text-[18px] prose-strong:text-[22px] prose-strong:font-['Mont-semibold'] prose-strong:text-purple lg:text-left">
              <ReactMarkdown>{ceo}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OurTeam;
