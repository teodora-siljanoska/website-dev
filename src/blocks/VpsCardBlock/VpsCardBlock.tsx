/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ComponentPageBlocksVpsCard } from '@utils/types';
import React from 'react';
import VpsCard from '../../components/VpsCard';
import AboutHeroImage from './assets/bgLines.svg';
import Button from '@components/Button';

function VpsCardBlock({
  cardVps,
  buttonVpsCard,
}: ComponentPageBlocksVpsCard): JSX.Element {
  return (
    <>
      <div className="mb-36 mt-10 flex flex-col gap-11">
        <div
          className="bg-none sm:absolute sm:h-[700px] sm:w-full sm:bg-cover sm:bg-center sm:bg-no-repeat"
          style={{
            backgroundImage: `url("${AboutHeroImage.src}")`,
          }}
        />
        <div className="container mx-auto flex flex-wrap justify-center gap-8">
          {cardVps?.map((item, index) => (
            <div key={index} className="z-50">
              <VpsCard
                imageTopVps={item?.imageTopVps ?? ''}
                descriptionVps={item?.descriptionVps ?? ''}
                titleVps={item?.titleVps ?? ''}
                checklistItemsVps={item?.checklistItemsVps}
                ctaButtonVps={item?.ctaButtonVps ?? ''}
                linkButtonVps={item?.linkButtonVps ?? ''}
              />
            </div>
          ))}
        </div>
        <div className="z-10 flex justify-center">
          <Button
            cta={buttonVpsCard?.cta ?? ''}
            color="tertiary"
            link={buttonVpsCard?.link ?? ''}
          />
        </div>
      </div>
    </>
  );
}
export default VpsCardBlock;
