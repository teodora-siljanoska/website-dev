import React from 'react';
import Image from 'next/legacy/image';
import TimerImage from './assets/TimerImage.svg';
import { ComponentPageBlocksImageWithTitle } from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';
import ImageWithTitle from '@components/ImageWithTitle';

function ImageWithTitleBlock({
  imgTitle,
  isThreeInRow,
}: ComponentPageBlocksImageWithTitle): JSX.Element {
  return (
    <div className=" container  mx-auto flex flex-col justify-center">
      <div
        className={`smallest:w-max-content m-auto grid gap-y-10 smallest:max-w-[90%] smallest:justify-items-start md:justify-items-center xlSpecial:max-w-[70%] ${
          isThreeInRow
            ? 'gap-x-[100px] smallest:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            : 'gap-x-[45px] smallest:grid-cols-1 md:grid-cols-2'
        }`}
      >
        {imgTitle?.map((item, index) => (
          <span
            className={`${isThreeInRow ? 'max-w-[320px]' : 'max-w-full'} `}
            key={index}
          >
            <ImageWithTitle title={item?.title ?? ''} image={item?.image} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default ImageWithTitleBlock;
