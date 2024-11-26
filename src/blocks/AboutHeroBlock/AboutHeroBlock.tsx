import React, { useEffect, useState } from 'react';
import AboutHeroImage from './assets/AboutHeroImage.svg';
import { ComponentPageBlocksAboutHero } from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';

function AboutHeroBlock({
  title,
  description,
  backgroundImage,
  mobileSpacing,
}: ComponentPageBlocksAboutHero): JSX.Element {
  const [height, setHeight] = useState<string>('');

  useEffect(() => {
    switch (mobileSpacing) {
      case 'none': {
        setHeight('mt-0  sm:mt-0');
        break;
      }

      case 'xs': {
        setHeight('mt-5  sm:mt-0');
        break;
      }
      case 's': {
        setHeight('mb-12 min-w-[60%] pr-5 sm:pr-0 sm:w-full  sm:mb-0');
        break;
      }
      case 'm': {
        setHeight('mt-16  sm:mt-5');
        break;
      }
      case 'l': {
        setHeight('mt-20  sm:mt-0');
        break;
      }
      case 'xl': {
        setHeight('mt-[120px]  sm:mt-[200px]');
        break;
      }
      case 'xxl': {
        setHeight('mt-28  sm:mt-0');
        break;
      }
      case 'xxxl': {
        setHeight('mt-32  sm:mt-0');
        break;
      }
      default: {
        setHeight('');
      }
    }
  }, [mobileSpacing]);

  return (
    <div className="relative flex min-h-[300px] w-full flex-col items-end justify-end md:min-h-[552px] lg:justify-center  lg:pr-20 3xl:container  3xl:mx-auto">
      <div
        className="absolute left-0 z-0 h-full w-full bg-contain bg-left-top bg-no-repeat md:w-[82%] lg:w-[75%]"
        style={{
          backgroundImage: `url("${
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            findMediaUrl(backgroundImage) ?? (AboutHeroImage.src as string)
          }")`,
        }}
      />
      <div className="container z-10 ml-auto flex h-full flex-col place-items-end justify-center py-6 phoneS:w-[90%] lg:w-[60%]   2xl:pr-32">
        <h1
          className={` items-start pl-44 text-right  font-['Mont-book'] text-[28px] text-purple  prose-strong:font-['Mont-bold']  sm:pl-0 md:text-[60px]   lg:pb-0  ${height}`}
        >
          <ReactMarkdown>{title ?? ''}</ReactMarkdown>
        </h1>
        <div className="pl-32 text-right text-[16px]  font-['Mont-light'] text-purple sm:pl-0 md:text-2xl">
          {description}
        </div>
      </div>
    </div>
  );
}
export default AboutHeroBlock;
