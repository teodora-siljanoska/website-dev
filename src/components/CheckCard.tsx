import React from 'react';
import Button from './Button';
import CheckListItem, { P as CheckListItemsProps } from './CheckListItem';
import { UploadFileEntityResponse } from '@utils/types';
import icon from '../blocks/CheckCardBlock/assets/icon.png';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
interface P {
  title: string;
  checklistItems: CheckListItemsProps[];
  ctaButton: string;
  linkButton: string;
  subTitleCheckCard: string;
  imgageCheckCard?: UploadFileEntityResponse;
}

function CheckCard({
  title,
  checklistItems,
  ctaButton,
  linkButton,
  subTitleCheckCard,
  imgageCheckCard,
}: P): JSX.Element {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[314px] rounded-2xl  bg-white px-[36px] py-[45px] shadow-custom md:w-[304px]">
        <div>
          <Image
            src={findMediaUrl(imgageCheckCard) ?? icon}
            width={imgageCheckCard?.data?.attributes?.width ?? 61.8}
            height={61.8}
            layout="intrinsic"
            alt="info"
          />
        </div>
        <p className="mb-[2px] mt-6 min-h-[60px] text-left font-['Mont-bold'] text-2xl text-darkTeal">
          {title}
        </p>
        <p className="min-h-[50px] font-['Mont-regular'] text-lg text-darkTeal ">{subTitleCheckCard}</p>
        <div className="min-h-[180px] space-y-4 py-10  font-['Mont-book'] text-base">
          {checklistItems?.map((item: CheckListItemsProps, index: number) => (
            <CheckListItem
              key={index}
              cta={item.cta}
              checking={item.checking}
              size={'card'}
              ctaButton={''}
              linkButton={''}
              description={''}
            />
          ))}
        </div>
        <div className="mt-5 mb-4 flex justify-center">
          <Button cta={ctaButton} link={linkButton} color={'tertiary'} />
        </div>
      </div>
    </div>
  );
}

export default CheckCard;
