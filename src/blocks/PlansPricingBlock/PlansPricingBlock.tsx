import React from 'react';
import Title from '../../components/Title';
import Description from '@components/Description';
import PlansCheckList from '../../components/PlansCheckList';
import { ComponentPageBlocksPlansPricingBlock } from '@utils/types';

function PlansPricingBlock({
  plansCheckTitle,
  plansCheckDescription,
  plansList,
  rowNumber,
}: ComponentPageBlocksPlansPricingBlock): JSX.Element {
  return (
    <div className="container mx-auto mt-10 mb-16 flex flex-col justify-center md:w-[90%] xlSpecial:w-[70%]">
      {plansCheckTitle && (
        <div className="mb-[25px] sm:mb-5">
          <Title
            cta={plansCheckTitle ?? 'Title'}
            alignment={'center'}
            fontSize={'Small'}
          />
        </div>
      )}
      {plansCheckDescription && (
        <div className="mb-[42px] sm:mb-5">
          <Description
            contentDescription={plansCheckDescription ?? 'test'}
            alignment={'center'}
            fontSize={'small'}
          />
        </div>
      )}
      <div
        className={` ${
          (plansCheckTitle || plansCheckDescription) && 'pt-5 sm:pt-[90px]'
        } m-auto grid lg:px-5
        ${
          rowNumber === 'double'
            ? 'md:grid-cols-2  gap-y-[48px] sm:gap-y-[60px] sm:gap-x-[74px]'
            : ''
        }
        ${
          rowNumber === 'triple'
            ? 'md:grid-cols-3  gap-y-[48px] sm:gap-y-[60px] sm:gap-x-[74px]'
            : ''
        }
        ${
          rowNumber === 'single'
            ? 'w-fit grid-cols-1  gap-y-[24px]  lg:gap-y-[20px] sm:gap-x-[74px]'
            : '  gap-y-[48px] sm:gap-y-[60px] sm:gap-x-[74px] w-[90%] lg:w-[70%] '
        } 
        `}
      >
        {plansList?.map((item, index) => (
          <span key={index} className="w-fit">
            <PlansCheckList
              plansTitle={item?.plansTitle ?? ''}
              checking={item?.checking ?? 'check'}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export default PlansPricingBlock;
