import React from 'react';
import { useState } from 'react';
import AccordionArrowItem from './AccordionArrowItem';
import AccordionPlusItem from './AccordionPlusItem';

export interface AccordionItemProps {
  title: string;
  description: string;
  isOpen: boolean;
  btnOnClick: () => void;
}

export interface P {
  accordionItems: AccordionItemProps[];
  shape: 'plus' | 'arrow';
}

function AccordionComponent({ accordionItems, shape }: P): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState(0);
  const btnOnClick = (index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  };

  return (
    <div className="container flex flex-col items-center justify-items-center">
      {shape === 'plus' &&
        accordionItems.map((item, index) => (
          <AccordionPlusItem
            key={index}
            title={item.title}
            description={item.description}
            isOpen={index === currentIndex}
            btnOnClick={() => btnOnClick(index)}
          />
        ))}
      {shape === 'arrow' &&
        accordionItems.map((item, index) => (
          <AccordionArrowItem
            key={index}
            title={item.title}
            description={item.description}
            isOpen={index === currentIndex}
            btnOnClick={() => btnOnClick(index)}
          />
        ))}
    </div>
  );
}

export default AccordionComponent;
