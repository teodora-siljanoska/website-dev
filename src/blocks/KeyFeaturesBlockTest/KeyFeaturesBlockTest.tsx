import React from 'react';
import CheckListItem, {
  P as CheckListItemProps,
} from '../../components/CheckListItem';
import { ComponentPageBlocksKeyFeaturesVps } from '@utils/types';

interface P {
  checkListItemProps: CheckListItemProps[];
}

function KeyFeaturesBlockTest({
  checkListItemProps,
}: ComponentPageBlocksKeyFeaturesVps): JSX.Element {
  return (
    <div className="container mx-auto mt-2 mb-16 flex w-[60%] flex-col justify-center py-5 md:mt-10 md:w-[90%] xlSpecial:w-[70%]">
      <div className="grid gap-y-[17px] px-0 sm:gap-x-[74px] md:grid-cols-3 md:gap-y-[60px] lg:pl-5 font-['Mont-book']">
        {checkListItemProps?.map(
          (item, index) =>
            item && (
              <CheckListItem
                key={index}
                cta={item.cta ?? ''}
                checking={item.checking ?? 'check'}
                size={'features'}
              />
            )
        )}
      </div>
    </div>
  );
}

export default KeyFeaturesBlockTest;
