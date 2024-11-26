import React from 'react';
import Image from 'next/legacy/image';
import Button from '../../components/Button';
import deskImage from './assets/desktopImage.png';
import { ComponentPageBlocksCircledLeftImage } from '@utils/types';
import ReactMarkdown from 'react-markdown';
import findMediaUrl from '@utils/findMediaUrl';
import { useMediaQuery } from 'react-responsive';

function CircledLeftImageBlock({
  title,
  description,
  button,
  image,
}: ComponentPageBlocksCircledLeftImage): JSX.Element {
  const isMobile = useMediaQuery({ maxWidth: 1252 });
  return (
    <>
      <div className="container mx-auto mt-20 flex flex-col items-center gap-x-20 md:flex-row lg:gap-x-32 xl:gap-x-40 ">
        <div className="flex h-full w-full shrink-0 basis-[33%]  md:w-[80%]	">
          <Image
            alt="image"
            src={findMediaUrl(image) ?? deskImage.src}
            height={image?.data?.attributes?.height ?? 464}
            width={image?.data?.attributes?.width ?? 464}
            layout={`${isMobile ? 'intrinsic' : 'fixed'}`}
          />
        </div>
        <div className="flex w-full basis-[67%] ">
          <div className=" md:pl-20  xl:pl-0">
            <h3 className=" mt-12 mb-4 stroke-black text-xl font-['Mont-semibold'] text-darkGrey md:text-2xl">
              {title}
            </h3>
            <div className=" mb-11 w-full text-base font-['Mont-light'] leading-8 prose-a:font-['Mont-bold'] prose-a:text-purple prose-a:underline prose-strong:font-['Mont-bold'] prose-ul:ml-5 prose-ul:list-disc">
              <ReactMarkdown>{description ?? ''}</ReactMarkdown>
            </div>
            {button?.cta && (
              <Button
                cta={button.cta}
                link={button.link ?? '#'}
                color="secondary"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CircledLeftImageBlock;
