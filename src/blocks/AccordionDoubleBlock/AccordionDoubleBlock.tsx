import AccordionArrowItem from '../../components/AccordionArrowItem';
import { useState } from 'react';
import React from 'react';
import { ComponentPageBlocksAccordionDouble } from '@utils/types';

function AccordionDoubleBlock({
  accordionItemsProps,
}: ComponentPageBlocksAccordionDouble): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  let i = 0;

  const accItemPropsLen = accordionItemsProps?.length ?? -1;

  if (accItemPropsLen % 2 != 0) {
    i = 1;
  } else {
    i = 0;
  }
  const firstAccordionItems = accordionItemsProps?.slice(
    0,
    Math.trunc(accordionItemsProps.length / 2) + i
  );
  const firstAccordionItemsLength = accordionItemsProps?.length ?? -1;
  const secondAccordionItems = accordionItemsProps?.slice(
    Math.trunc(accordionItemsProps.length / 2) + i,
    accordionItemsProps.length
  );
  const btnOnClick = (index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  };

  return (
    <div className="container mx-auto mt-10 flex flex-col sm:mt-32 md:w-full lg:mx-0 lg:max-w-[65%] xlSpecial:mx-auto">
      <div className="justify-between lg:flex lg:gap-x-10">
        <div className="flex  min-w-[80%] flex-col  xlSpecial:min-w-min xlSpecial:max-w-[427px] xlSpecial:shrink-0">
          {firstAccordionItems?.map((item, index) => (
            <span key={`firstAccordion${index}`}>
              <div className="flex justify-center">
                <AccordionArrowItem
                  title={item?.title ?? ''}
                  description={item?.description ?? ''}
                  isOpen={index === currentIndex}
                  btnOnClick={() => btnOnClick(index)}
                />
              </div>
            </span>
          ))}
        </div>

        <div className="flex  min-w-[80%] flex-col xlSpecial:min-w-min xlSpecial:max-w-[427px] xlSpecial:shrink-0">
          {secondAccordionItems?.map((item, index) => (
            <span key={`secondAccordion${index}`}>
              <div className="flex justify-center">
                <AccordionArrowItem
                  title={item?.title ?? ''}
                  description={item?.description ?? ''}
                  isOpen={index + firstAccordionItemsLength === currentIndex}
                  btnOnClick={() =>
                    btnOnClick(index + firstAccordionItemsLength)
                  }
                />
              </div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
export default AccordionDoubleBlock;
