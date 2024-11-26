/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import PricingCard, {
  P as PricingCardProps,
} from '../../components/PricingCard';

export interface P {
  pricingCards: PricingCardProps[];
}

function PricingCardBlock({ pricingCards }: P): JSX.Element {
  return (
    <>
      <div className="mb-36 mt-2">
        <div className="flex flex-wrap justify-center gap-8">
          {pricingCards?.map((item, index) => (
            <PricingCard
              key={index}
              title={item.title}
              checklistItems={item.checklistItems}
              ctaButton={item.ctaButton}
              linkButton={item.linkButton}
            />
          ))}
        </div>
      </div>
    </>
  );
}
export default PricingCardBlock;
