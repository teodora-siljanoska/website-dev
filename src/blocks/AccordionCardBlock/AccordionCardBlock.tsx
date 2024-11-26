/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import AccordionComponent from '@components/AccordionComponent';
import RegistrationCard from '@components/RegistrationCard';
import React from 'react';
import {
  ComponentPageBlocksAccordionCart,
  ComponentPageComponentsAccordionItem,
} from '@utils/types';

function AccordionCardBlock({
  accordions,
  regCard,
}: ComponentPageBlocksAccordionCart): JSX.Element {
  return (
    <div className="container mt-10 sm:mx-auto sm:mt-32 sm:flex">
      <div className="sm:basis-1/2">
        <AccordionComponent
          shape="arrow"
          accordionItems={
            accordions ??
            ([
              { id: '1', description: '', title: '' },
            ] as ComponentPageComponentsAccordionItem[])
          }
        />
      </div>
      <div className=" mt-5 sm:basis-1/2">
        <RegistrationCard data={regCard?.data} />
      </div>
    </div>
  );
}
export default AccordionCardBlock;
