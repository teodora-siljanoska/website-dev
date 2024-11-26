import { ComponentPageBlocksBannerLiliacHome } from '@utils/types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

function BannerLiliacHomeBlock({
  contentLiliacBanner,
  titleLiliacBanner,
}: ComponentPageBlocksBannerLiliacHome): JSX.Element {
  return (
    <div
      className="relative bg-transparent py-5 smallest:bottom-[150px] 

    md:bottom-[90px]
    "
    >
      <div
        className="mx-auto flex w-[90%] flex-col items-center justify-center gap-y-[28px] rounded-[10px]  bg-liliac/5 smallest:px-[21px]
      smallest:py-[65px] md:px-[37px] 
      md:py-[77px] xlSpecial:px-[74px] 
      xlSpecial:py-[83px] 3xl:container 
      "
      >
        <div className='z-40 whitespace-pre-line text-center font-["Mont-bold"] text-[30px] text-purple'>
          {titleLiliacBanner ?? ''}
        </div>
        <div className='z-40 whitespace-pre-line text-center font-["Mont-light"] text-[22px] text-darkGrey'>
          <ReactMarkdown>{contentLiliacBanner ?? ''}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
export default BannerLiliacHomeBlock;
