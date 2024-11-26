import React from 'react';
import Image from 'next/legacy/image';
import placeholderImage from './assets/placeholder.png';
import findMediaUrl from '@utils/findMediaUrl';
import { ComponentPageBlocksLeftImageRightText } from '@utils/types';

function LeftImageRightTextBlock({
  title,
  description,
  circledImage,
}: ComponentPageBlocksLeftImageRightText): JSX.Element {
  return (
    <>
      <div className="container mx-auto my-20 flex flex-col px-4 md:flex-row">
        <div className={`flex h-full w-full xl:w-[90%]`}>
          <Image
            alt="image"
            src={findMediaUrl(circledImage) ?? placeholderImage.src}
            height={316}
            width={316}
          />
        </div>
        <div className="md:pl-10">
          <h3 className=" mt-12 mb-8 w-full text-lg font-['Mont-semibold'] text-darkGrey md:w-[80%] ">
            {title}
          </h3>
          <div className=" w-full list-disc text-lg  font-['Mont-light'] leading-8 md:w-[90%]">
            {description}
          </div>
        </div>
      </div>
    </>
  );
}

export default LeftImageRightTextBlock;
