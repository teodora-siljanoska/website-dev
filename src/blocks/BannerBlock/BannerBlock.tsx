import { ComponentPageBlocksBanner } from '@utils/types';
import React from 'react';
import Title from '../../components/Title';
import Button from '@components/Button';

function BannerBlock({
  buttonForBanner,
  colorOfBanner,
  titleBanner,
}: ComponentPageBlocksBanner): JSX.Element {
  return (
    <div
      className={` ${
        colorOfBanner === 'teal' ? 'bg-darkTeal/5' : 'bg-liliac/10'
      } mx-auto my-5 flex flex-col items-center justify-center gap-[30px] rounded-[20px] py-[43px] px-[20px] smallest:w-[90%] md:max-w-[785px]`}
    >
      <div
        className={`${
          colorOfBanner === 'teal' ? 'text-darkTeal' : 'text-liliac'
        } font-["Mont-bold"] text-[30px]`}
      >
        {titleBanner}
      </div>
      <Button
        color={`${colorOfBanner === 'teal' ? 'tertiary' : 'primary'}`}
        cta={buttonForBanner?.cta ?? ''}
        link={buttonForBanner?.link ?? ''}
      />
    </div>
  );
}
export default BannerBlock;
