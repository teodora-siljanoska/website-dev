import React from 'react';
import Title from '../../components/Title';
import SmallPricing from '../../components/SmallPricing';
import { ComponentPageBlocksSmallPricing } from '@utils/types';

function SmallPricingBlock({
  title,
  cards,
}: ComponentPageBlocksSmallPricing): JSX.Element {
  return (
    <div className="container m-auto mt-10 mb-[71px]">
      <div className="mb-20">
        <Title cta={title ?? ''} alignment="center" fontSize="Big" />
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {cards?.map((item, index) => (
          <SmallPricing
            key={index}
            title={item?.title ?? ''}
            value={item?.value ?? 'pound'}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            checklistItems={item?.checklistItems}
            ctaButton={item?.ctaButton ?? ''}
            linkButton={item?.linkButton ?? ''}
            price={item?.price ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
export default SmallPricingBlock;
