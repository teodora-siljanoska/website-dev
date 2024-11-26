/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import TabPricingCard from '@components/TabPricingCard';
import { ComponentPageBlocksTabPricing } from '@utils/types';
import React from 'react';

function TabPricingBlock({
  carts,
}: ComponentPageBlocksTabPricing): JSX.Element {
  return (
    <div className="container m-auto justify-center gap-2 pt-14 pb-[73px] sm:flex sm:pb-28">
      <div className="flex flex-wrap justify-center gap-8">
        {carts?.map((item, idx) => (
          <TabPricingCard key={idx} data={item?.data} />
        ))}
      </div>
    </div>
  );
}
export default TabPricingBlock;
