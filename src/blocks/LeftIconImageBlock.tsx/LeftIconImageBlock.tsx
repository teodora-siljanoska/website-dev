import React from 'react';
import Image from 'next/legacy/image';
import { ComponentPageBlocksLeftIconImage } from '@utils/types';
import ReactMarkdown from 'react-markdown';
import findMediaUrl from '@utils/findMediaUrl';
import { useMediaQuery } from 'react-responsive';

function LeftIconImage({
  title,
  description,
  image,
  icon,
}: ComponentPageBlocksLeftIconImage): JSX.Element {
  return (
    <>
      <div className="3xl:container mx-auto flex h-full w-full items-center gap-x-[100px] smallest:flex-col smallest:text-center md:max-w-[90%] md:flex-row md:justify-between md:text-start xlSpecial:w-[74%] portrait:md:flex-col portrait:md:text-center">
        <div className="flex h-full w-full shrink-0 basis-[33%]  smallest:justify-center	md:w-[80%]">
          <div
            className="relative  rounded-full
          smallest:max-h-[320px] smallest:max-w-[320px]
          md:max-h-[368px] md:max-w-[368px]
          xlSpecial:max-h-[464px] xlSpecial:max-w-[464px] 
          "
          >
            <Image
              alt="image"
              src={findMediaUrl(image) ?? ''}
              height={image?.data?.attributes?.height ?? 464}
              width={image?.data?.attributes?.width ?? 464}
              className="rounded-full	object-cover"
            />
            <span className="outerGlow absolute top-12 right-0 flex translate-x-1/4 -translate-y-1/4 items-center justify-center self-end rounded-full bg-[#FFFFFF] smallest:min-h-[85px] smallest:min-w-[85px] md:min-h-[107px] md:min-w-[107px] xlSpecial:min-h-[127px] xlSpecial:min-w-[127px]">
              <Image
                alt="icon"
                src={findMediaUrl(icon) ?? ''}
                width={65}
                height={83}
                className="!smallest:h-[62px] !smallest:w-[48px] md:h-[65px] md:w-[51px] xlSpecial:h-[83px] xlSpecial:w-[65px]"
              />
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="mb-4 max-w-[481px] font-['Mont-bold'] text-[38px] text-darkTeal smallest:mt-[30px] md:mt-12 md:text-[42px]">
            {title}
          </h3>
          <div className="w-full  max-w-[481px] font-['Mont-light']  text-lg leading-8 text-[#2C2933] prose-a:font-['Mont-bold'] prose-a:text-purple prose-a:underline prose-strong:font-['Mont-bold'] prose-ul:ml-5 prose-ul:list-disc md:text-xl">
            <ReactMarkdown>{description ?? ''}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftIconImage;
