/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentPageBlocksCheckCard } from '@utils/types';
import React from 'react';
import CheckCard from '../../components/CheckCard';
import AboutHeroImage from './assets/bg.png';
import icon from './assets/icon.png';
function CheckCardBlock({ card }: ComponentPageBlocksCheckCard): JSX.Element {
  return (
    <>
      <div className="mb-36 mt-10">
        <div
          className="bg-none sm:absolute sm:h-[700px] sm:w-full sm:bg-cover sm:bg-center sm:bg-no-repeat"
          style={{
            backgroundImage: `url("${AboutHeroImage.src}")`,
          }}
        />
        <div className="flex flex-wrap justify-center gap-8">
          {card?.map((item, index) => (
            <div key={index} className="z-50">
              <CheckCard
                title={item?.title ?? ''}
                checklistItems={item?.checklistItems}
                ctaButton={item?.ctaButton ?? ''}
                linkButton={item?.linkButton ?? ''}
                subTitleCheckCard={item?.subTitleCheckCard ?? ''}
                imgageCheckCard={item?.imgageCheckCard ?? undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default CheckCardBlock;
