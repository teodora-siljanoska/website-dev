import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import TimerImage from '../blocks/ImageWithTitleBlock/assets/TimerImage.svg';

export interface P {
  title: string;
  image: any;
}

function ImageWithTitle({ title, image }: P): JSX.Element {
  return (
    <div className=" flex items-center justify-start gap-[12px] md:flex-row">
      <div className="shrink-0">
        <Image
          alt="image"
          className="max-h-[62px]"
          src={findMediaUrl(image) ?? (TimerImage as string)}
          height={image?.data?.attributes?.height ?? 62}
          width={image?.data?.attributes?.width ?? 62}
        />
      </div>
      <ReactMarkdown className="text-left font-['Mont-book'] text-xl prose-strong:text-purple sm:text-[22px] text-darkGrey">
        {title ?? ''}
      </ReactMarkdown>
    </div>
  );
}
export default ImageWithTitle;
