/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import AccordionPlusItem from '../../components/AccordionPlusItem';
import { AccordionItemProps } from '../../components/AccordionComponent';
import { useState } from 'react';
import { ComponentPageBlocksAccordionPlus } from '@utils/types';

export interface P {
  accordionItems: AccordionItemProps[];
}

function AccordionPlusBlock({
  accordionItems,
}: ComponentPageBlocksAccordionPlus): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const btnOnClick = (index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  };
  return (
    <div className="container m-auto ">
      {accordionItems?.map((item, index) => (
        <div key={index} className="">
          <div className="border-b border-lightGrey">
            <AccordionPlusItem
              title={item?.title ?? ''}
              description={item?.description ?? ''}
              isOpen={index === currentIndex}
              btnOnClick={() => btnOnClick(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
export default AccordionPlusBlock;
