import React, { useState } from 'react';
import Button from './Button';
import CheckListItem, { P as CheckListItemsProps } from './CheckListItem';
import ReactMarkdown from 'react-markdown';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';

interface P {
  titleVps: string;
  descriptionVps: string;
  checklistItemsVps: CheckListItemsProps[];
  ctaButtonVps: string;
  linkButtonVps: string;
  imageTopVps: any;
}

function VpsCard({
  titleVps,
  descriptionVps,
  checklistItemsVps,
  ctaButtonVps,
  linkButtonVps,
  imageTopVps,
}: P): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[331px] rounded-2xl  bg-white py-[17px] px-[25px] shadow-custom">
        <Image
          src={findMediaUrl(imageTopVps) ?? ''}
          alt="coverImg"
          width={100}
          height={44}
          className="h-auto w-auto"
        />
        <p className="mt-[14px] mb-[4px] min-h-[30px] text-left font-['Mont-bold'] text-[20px] text-darkGrey">
          {titleVps}
        </p>
        <div className="mb-4  text-left font-['Mont-light'] text-[14px]  text-darkGrey">
          <ReactMarkdown>{descriptionVps}</ReactMarkdown>
        </div>
        <div className=" space-y-4 py-5  font-['Mont-regular'] text-base">
          {checklistItemsVps?.map(
            (item: CheckListItemsProps, index: number) => (
              <CheckListItem
                key={index}
                cta={item.cta}
                checking={item.checking}
                size={'vps'}
                ctaButton={''}
                linkButton={''}
                description={item.description}
              />
            )
          )}
        </div>
        <div className=" flex justify-center">
          <Button cta={ctaButtonVps} link={linkButtonVps} color={'primary'} />
        </div>
      </div>
    </div>
  );
}

export default VpsCard;
