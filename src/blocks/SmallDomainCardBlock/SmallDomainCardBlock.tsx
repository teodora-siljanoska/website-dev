import { ComponentPageBlocksSmallCards } from '@utils/types';
import React from 'react';
import domainIg from './assets/co.png';
import findMediaUrl from '@utils/findMediaUrl';
import Image from 'next/legacy/image';

function SmallDomainCardBlock({
  smallCard,
}: ComponentPageBlocksSmallCards): JSX.Element {
  return (
    <div className="container mx-auto grid grid-cols-1 gap-x-[59px] gap-y-[30px] md:grid-cols-2 md:gap-y-6 xl:grid-cols-4">
      {smallCard?.map((item, index) => (
        <div
          key={index}
          className="rounded-[10px] py-[27px] px-[26px] shadow-custom"
        >
          {item?.imgDomain && (
            <div className="pb-[14px]">
              <Image
                height={item.imgDomain.data?.attributes?.height ?? 44}
                width={item.imgDomain.data?.attributes?.width ?? 50}
                alt="domainIg"
                src={findMediaUrl(item.imgDomain) ?? domainIg.src}
              />
            </div>
          )}
          {item?.priceTitle && (
            <div className="pb-[4px] font-['Mont-bold'] text-xl text-darkGrey">
              {item.priceTitle}
            </div>
          )}
          {item?.descCard && (
            <div className="font-['Mont-light'] text-sm text-darkGrey ">
              {item.descCard}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
export default SmallDomainCardBlock;
