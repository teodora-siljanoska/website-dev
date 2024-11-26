import React from 'react';
import Button from './Button';
import { P as CheckListItemsProps } from './CheckListItem';
import CheckListItemTest from './CheckListItem';

interface P {
  title: string;
  description: string;
  secondDescription: string;
  thirdDescription: string;
  longDescription: string;
  checklistItems: CheckListItemsProps[];
}

function PricingCardTest({
  secondDescription,
  thirdDescription,
  longDescription,
  title,
  description,
  checklistItems,
}: P): JSX.Element {
  return (
    <div className=" mb-10 flex flex-col items-center  px-10">
      <div className="h-[790px] w-[314px]  rounded-2xl bg-white p-4 md:w-[364px]">
        <p className="text-center font-['Mont-bold'] text-2xl">{title}</p>
        <p className="text-center text-[35px] font-extrabold text-lightTeal">
          {description}
          <span className="text-sm text-grey">{secondDescription}</span>
        </p>
        <p className="mb-2 text-center  font-['Mont-bold'] text-sm text-darkGrey">
          {thirdDescription}
        </p>
        <p className="text-center font-['Mont-semibold'] text-xs text-darkGrey">
          {longDescription}
        </p>
        <div className=" space-y-2  ">
          {checklistItems.map((item: CheckListItemsProps, index: number) => (
            <CheckListItemTest
              key={index}
              cta={item.cta || ''}
              checking={item.checking ?? 'cross'}
              size={item.size ?? 'features'}
            />
          ))}
        </div>
        <div className=" flex justify-center gap-4">
          <Button cta="Customize" link="/" color="secondary" />
          <Button cta="Buy" link="/" color="primary" />
        </div>
      </div>
    </div>
  );
}

export default PricingCardTest;
