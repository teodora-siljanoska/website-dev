/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import Image from 'next/legacy/image';
import itemImages from './assets/item.png';
import { ComponentPageBlocksMarqee } from '@utils/types';
import findMediaUrl from '@utils/findMediaUrl';
import Marquee from 'react-fast-marquee';

function MarqueeBlock({
  title,
  logos,
}: ComponentPageBlocksMarqee): JSX.Element {
  return (
    <>
      <div className="relative my-10 flex max-h-[273px] flex-col items-center overflow-x-hidden">
        <h3 className=" my-10 text-3xl font-['Mont-semibold'] text-purple">
          {title}
        </h3>
        <Marquee speed={60} className="flex  flex-row gap-5">
          {logos?.data.map((logoItem, index) => (
            <div
              className="mx-4 text-4xl grayscale hover:grayscale-0 flex-wrap"
              key={index}
            >
              <Image
                alt="image"
                src={findMediaUrl({ data: logoItem }) ?? itemImages.src}
                height={logoItem.attributes?.height ?? 100}
                width={logoItem.attributes?.width ?? 100}
                layout="fixed"
                unoptimized
              />
            </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

export default MarqueeBlock;
