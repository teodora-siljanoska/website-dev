import React from 'react';
import ceoImg from './assets/ceoImg.png';
import quotationUp from './assets/quotationUp.png';
import quotationDown from './assets/quotationDown.png';
import bigImg from './assets/bigBlock.png';
import { UploadFileEntityResponse } from '@utils/types';
import findMediaUrl from '../../utils/findMediaUrl';
import ReactPlayer from 'react-player';
import arrowRight from './assets/arrowRight.svg';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';

import Image from 'next/legacy/image';
import Link from 'next/link';

export interface P {
  testimonialDesc: string;
  ceo: string;
  ceoImage: UploadFileEntityResponse | undefined;
  bigImage: UploadFileEntityResponse | undefined;
  readMore?: string;
}

function TestimonialImage({
  testimonialDesc,
  ceo,
  ceoImage,
  bigImage,
  readMore,
}: P): JSX.Element {
  const isDesktopOrTablet = useMediaQuery({ minWidth: 950 });
  const isMobile = useMediaQuery({ maxWidth: 950 });
  return (
    <div className="flex h-fit bg-purple text-left sm:h-fit py-14">
      {!bigImage?.data?.attributes?.mime.includes('') ? (
        <div className="m-auto flex max-w-[80%] flex-col place-self-center sm:max-w-[90%]">
          <div className="m-auto max-w-[90%]">
            <div className="relative flex flex-row gap-2">
              <div className="absolute -left-10 min-w-max ">
                <Image
                  alt="image"
                  src={quotationUp.src}
                  height={25}
                  width={33}
                />
              </div>
              <div className="px-3 py-8 text-sm font-['Mont-book'] text-white sm:text-base ">
                <ReactMarkdown>{testimonialDesc}</ReactMarkdown>
              </div>
            </div>
            <div className="flex min-w-max justify-end">
              <Image
                alt="image"
                src={quotationDown.src}
                height={25}
                width={33}
              />
            </div>
            <div className="pt-5 pl-3">
              <div className="text-xl font-['Mont-semibold'] text-white">
                <ReactMarkdown>{ceo}</ReactMarkdown>
              </div>
              <div className="pt-2">
                <Image
                  alt="image"
                  src={findMediaUrl(ceoImage) ?? ceoImg.src}
                  height={29}
                  width={178}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="m-auto flex max-w-[80%] flex-col gap-10 place-self-center sm:flex sm:max-w-[90%] sm:flex-row sm:gap-0">
          <div className="mt-5 sm:mt-0 sm:flex sm:basis-1/2">
            {bigImage.data.attributes.mime.includes('image') ? (
              <div className="ml-0 flex justify-center place-self-center sm:ml-10">
                <Image
                  alt="image"
                  src={findMediaUrl(bigImage) ?? bigImg.src}
                  height={293}
                  width={440}
                />
              </div>
            ) : (
              <div className="flex aspect-video justify-center  place-self-center">
                {isDesktopOrTablet && (
                  <ReactPlayer
                    height={293}
                    width={440}
                    url={
                      findMediaUrl(bigImage) ??
                      'https://www.youtube.com/watch?v=JZC4RHVdiWA'
                    }
                  />
                )}
                {isMobile && (
                  <ReactPlayer
                    height={193}
                    width={289}
                    url={
                      findMediaUrl(bigImage) ??
                      'https://www.youtube.com/watch?v=JZC4RHVdiWA'
                    }
                  />
                )}
              </div>
            )}
          </div>
          <div className="container flex flex-col  place-self-center sm:basis-3/4 ">
            <div className="ml-3 max-w-[90%] sm:ml-0 sm:max-w-[100%]">
              <div className="relative mt-12 flex flex-row gap-2">
                <div className="absolute -left-6 min-w-max">
                  <Image
                    alt="image"
                    src={quotationUp.src}
                    height={25}
                    width={33}
                  />
                </div>
                <div className="m-auto max-w-[85%] text-sm font-['Mont-regular'] text-white sm:max-w-[90%] sm:text-base">
                  <ReactMarkdown>{testimonialDesc}</ReactMarkdown>
                </div>
              </div>
              <div className="flex min-w-max justify-end">
                <Image
                  alt="image"
                  src={quotationDown.src}
                  height={25}
                  width={33}
                />
              </div>
            </div>
            <div className="pl-8 pt-5 lg:pl-10">
              <div className="text-lg font-['Mont-semibold'] text-white sm:text-xl">
                <ReactMarkdown>{ceo}</ReactMarkdown>
              </div>
              <div className="pt-2">
                <Image
                  alt="image"
                  src={findMediaUrl(ceoImage) ?? ceoImg.src}
                  height={29}
                  width={178}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-10 left-16 flex gap-2 text-xl text-white sm:left-auto sm:right-16">
        {readMore && (
          <>
            <Link href={readMore} passHref>
              Read more
            </Link>
            <Image
              alt="image"
              src={arrowRight as string}
              height={14}
              width={16}
            />
          </>
        )}
      </div>
    </div>
  );
}
export default TestimonialImage;
