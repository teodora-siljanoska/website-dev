import React from 'react';
import Title from '../../components/Title';
import CheckListItem from '../../components/CheckListItem';
import { ComponentPageBlocksKeyFeatures } from '@utils/types';

function KeyFeaturesBlock({
  title,
  checkListItems,
}: ComponentPageBlocksKeyFeatures): JSX.Element {
  return (
    <div className="container mx-auto mt-10 mb-16 flex flex-col justify-center">
      <div className="mb-12 sm:mb-5">
        <Title cta={title ?? ''} alignment={'center'} fontSize={'Big'} />
      </div>
      <div className="m-auto grid  gap-y-[48px] px-0 pt-5 sm:gap-y-[60px] sm:gap-x-[74px] sm:pt-[90px] md:w-[80%] lg:grid-cols-2 lg:px-5 xl:grid-cols-3">
        {checkListItems?.map((item, index) => (
          <span className="w-full" key={index}>
            <CheckListItem
              cta={item?.cta ?? ''}
              checking={item?.checking ?? 'check'}
              size={'features'}
              description={item?.description ?? ''}
              ctaButton={item?.ctaButton ?? ''}
              linkButton={item?.linkButton ?? ''}
              theme={item?.theme ?? 'simple'}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default KeyFeaturesBlock;
