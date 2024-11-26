/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
// import Button, { P as ButtonProps } from '../../components/Button';
import heroImagePlaceholder from './assets/hero2.svg';
import { ComponentPageBlocksHeroBlog } from '../../../utils/types';
import findMediaUrl from '../../../utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';

function HeroBlogBlock({
  size,
  title,
  description,
  heroImage,
}: ComponentPageBlocksHeroBlog): JSX.Element {
  let style = '';

  switch (size) {
    case 'small':
      style = `  sm:h-[260px] h-[240px] w-full bg-contain bg-no-repeat bg-right-top `;
      break;
    case 'large':
      style = ` lg:h-[470px] md:h-[450.44px] h-[433px]  w-full bg-contain bg-right-top bg-no-repeat `;
      break;

    default:
      null;
      break;
  }
  return (
    <div
      className={style}
      style={{
        backgroundImage: `url('${
          findMediaUrl(heroImage) ?? heroImagePlaceholder.src
        }')`,
      }}
    >
      <div className="container mx-auto flex flex-col px-4 pt-28 xs:pt-36 phoneLarge:pt-28 phoneS:pt-36 sm:pt-20 heroBreakTwo:pt-16 md:pt-28 heroBreakThree:pt-16">
        <div className="container text-left">
          <div className="container w-[60%] text-[28px] font-['Mont-light'] uppercase leading-tight  text-purple phoneSmall:w-[60%] xs:w-[65%] phoneLarge:w-[60%] phoneS:w-[70%] heroBreakOne:w-[75%] sm:w-[60%] sm:text-[45px] heroBreakTwo:w-[66%] heroBreakTwo:text-[50px] md:w-[70%] heroBreakThree:w-[80%] heroBreakFour:w-[77%]">
            <ReactMarkdown>{title ?? ''}</ReactMarkdown>
          </div>
          <div className=" container my-2 text-sm font-['Mont-light'] text-darkGrey ">
            <ReactMarkdown>{description ?? ''}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroBlogBlock;
