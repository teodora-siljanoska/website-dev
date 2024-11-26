import { ComponentPageBlocksPerformanceHosting } from '@utils/types';
import React from 'react';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import performance from './assets/performance.png';
import check from './assets/check.svg';

function PerformanceHostingBlock({
  hostingImage,
  performances,
}: ComponentPageBlocksPerformanceHosting): JSX.Element {

  return (
    <div className="container mx-auto flex w-[90%] flex-wrap justify-center lg:w-[80%] ">
      <div className="flex w-full justify-center xl:flex xl:w-[50%] xl:justify-end">
        <Image
          src={findMediaUrl(hostingImage) ?? performance}
          width={hostingImage?.data?.attributes?.width ?? 355}
          height={hostingImage?.data?.attributes?.height ?? 386}
          layout="intrinsic"
          alt="performance"
        />
      </div>
      <div className="flex w-full justify-center xl:flex xl:w-[50%] xl:justify-start">
        <div
          className={`flex h-full
           ${
            'w-[' + hostingImage?.data?.attributes?.width + 'px]'
          }
           flex-col gap-[25px] bg-purple/10 py-[35px] px-[56px] `}
        >
          {performances?.map((performance, index) => (
            <div
              key={index}
              className="flex gap-[10px] font-['Mont-book'] text-lg leading-[21px] text-darkGrey w-full"
            >
              <div className="w-[19px] ">
                <Image
                  src={check}
                  width={21}
                  height={21}
                  alt="check"
                  layout="fixed"
                />
              </div>
              <div className="w-full">{performance?.performanece}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PerformanceHostingBlock;
