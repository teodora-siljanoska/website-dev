/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import Title from '../../components/Title';
import Benefit from '../../components/Benefit';
import WhyUsImage from './assets/WhyUsImage.png';
import findMediaUrl from '../../../utils/findMediaUrl';
import { ComponentPageBlocksWhyUsBlock } from '@utils/types';

function WhyUsBlock({
  title,
  benefits,
  backgroundImage,
}: ComponentPageBlocksWhyUsBlock): JSX.Element {
  return (
    <div className="flex-row items-center lg:flex">
      <div
        className="bg-cover bg-left-bottom pb-[15%] sm:w-[67%] sm:basis-2/3 sm:pb-[20%] xl:bg-cover"
        style={{
          backgroundImage: `url('${
            findMediaUrl(backgroundImage) ?? WhyUsImage.src
          }')`,
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="min-h-[300px] pt-[30%] pl-[49%] sm:pt-[25%] sm:pl-[25%]">
          <Title cta={title ?? ''} alignment="left" fontSize="Big" />
        </div>
      </div>
      <div className=" container mx-auto -mt-10 flex justify-start px-5 sm:-mt-20  sm:max-w-full lg:basis-[40%]">
        <div className="w-full md:w-[75%]">
          {benefits?.map((item, index: number) => (
            <div key={index} className="mt-10  w-full">
              <Benefit
                buttonColor={item?.buttonColor ?? 'primary'}
                description={item?.description ?? ''}
                title={item?.title ?? ''}
                image={item?.image ?? undefined}
                alignment={item?.alignment ?? 'left'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WhyUsBlock;
