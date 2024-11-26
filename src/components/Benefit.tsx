import React from 'react';
import Image from 'next/legacy/image';
import deskImage from './assets/benefit.png';
import { UploadFileEntityResponse } from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';
import Button from './Button';

export interface P {
  title: string;
  description: string;
  image?: UploadFileEntityResponse;
  alignment: 'left' | 'center' | 'right';
  buttonCta?: string;
  buttonLink?: string;
  buttonColor: 'primary' | 'tertiary';
}

function Benefit({
  title,
  description,
  image,
  alignment,
  buttonColor,
  buttonCta,
  buttonLink,
}: P): JSX.Element {
  return (
    <span className="w-full">
      <div
        className={`flex items-center smallest:flex-col md:flex-row  ${
          alignment === 'left' ? 'justify-start' : 'justify-end'
        }`}
      >
        <div
          className={`outerGlow ${
            alignment === 'left'
              ? 'flex smallest:self-start md:self-auto'
              : 'self-end smallest:flex md:hidden'
          } shadow-lg flex h-[228px] w-[228px] items-center justify-center rounded-full bg-white	smallest:mr-0	smallest:mb-[30px] md:mr-[55px] md:mb-0`}
        >
          {image?.data && (
            <Image
              alt="image"
              src={findMediaUrl(image) ?? deskImage.src}
              height={image.data.attributes?.height ?? 150}
              width={image.data.attributes?.width ?? 100}
            />
          )}
        </div>
        <div className="flex flex-col gap-[20px] portrait:md:w-[60%]">
          <h3
            className={`w-full ${
              alignment === 'left'
                ? 'text-left text-purple'
                : alignment === 'right'
                ? 'text-left text-darkTeal'
                : 'text-center'
            }   font-["Mont-bold"] text-[24px] leading-tight sm:text-[24px]`}
          >
            {title}
          </h3>
          <div
            className={`w-full prose-ul:list-disc prose-ul:pl-6 ${
              alignment === 'right'
                ? 'text-left'
                : alignment === 'left'
                ? 'text-left'
                : 'text-center'
            } font-["Mont-regular"] text-[16px] leading-7 text-darkGrey sm:text-[16px]
            `}
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
          {buttonCta && (
            <div className={`self-start`}>
              <Button cta={buttonCta} color={buttonColor} link={buttonLink} />
            </div>
          )}
        </div>
        <div
          className={`outerGlow ${
            alignment === 'right' ? 'smallest:hidden md:flex' : 'hidden'
          } shadow-lg ml-[55px] flex h-[228px] w-[228px] items-center justify-center	rounded-full	bg-white`}
        >
          {image?.data && (
            <Image
              alt="image"
              src={findMediaUrl(image) ?? deskImage.src}
              height={image.data.attributes?.height ?? 150}
              width={image.data.attributes?.width ?? 100}
            />
          )}
        </div>
      </div>
    </span>
  );
}

export default Benefit;
