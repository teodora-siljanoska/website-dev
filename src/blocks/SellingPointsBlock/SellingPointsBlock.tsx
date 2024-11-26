import React from 'react';
import Benefit from '@components/Benefit';
import {
  ComponentPageBlocksSellingPoints,
  UploadFileEntityResponse,
} from '@utils/types';
import placeholderImage from './assets/secondImage.png';

function SellingPointsBlock({
  benefits,
}: ComponentPageBlocksSellingPoints): JSX.Element {
  return (
    <>
      <div className="m-auto max-w-[80%] pb-10 sm:pb-10 xl:pb-20">
        <div className="flex flex-wrap justify-center gap-10 sm:gap-10">
          {benefits?.map((item, index: number) => (
            <div key={index} className="md:max-w-[310px]">
              <Benefit
                description={item?.description ?? ''}
                title={item?.title ?? ''}
                buttonColor={item?.buttonColor ?? 'primary'}
                alignment="center"
                image={
                  item?.image ??
                  (placeholderImage.src as UploadFileEntityResponse)
                }
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SellingPointsBlock;
