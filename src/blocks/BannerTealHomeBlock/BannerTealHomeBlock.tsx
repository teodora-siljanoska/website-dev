import { ComponentPageBlocksBannerTealHome } from '@utils/types';
import React from 'react';
import Button from '../../components/Button';
import ReactMarkdown from 'react-markdown';
import lines from './assets/lines.svg';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';

function BannerTealHomeBlock({
  buttonBannerTeal,
  contentTealBanner,
  rightTopImage,
}: ComponentPageBlocksBannerTealHome): JSX.Element {
  return (
    <div className=" relative mx-auto my-5 flex w-[90%] flex-col items-center justify-center gap-y-[40px] overflow-hidden rounded-[10px] bg-darkTeal/5 smallest:py-0 smallest:px-[32px] smallest:pt-[128px] smallest:pb-[50px] md:py-[88px] md:px-[37px] xlSpecial:py-[68px] xlSpecial:px-[140px] 3xl:container portrait:md:pt-[140px]">
      <div className=' text-darkGrey z-40 whitespace-pre-line text-center font-["Mont-book"] smallest:text-[22px] md:text-[24px] xlSpecial:text-[28px]'>
        <ReactMarkdown>{contentTealBanner ?? ''}</ReactMarkdown>
      </div>
      <Button
        color={'primary'}
        cta={buttonBannerTeal?.cta ?? ''}
        link={buttonBannerTeal?.link ?? ''}
      />
      <div className="absolute top-0 z-30 smallest:right-[-90px] md:right-[-125px]  xlSpecial:right-[-105px]">
        <Image
          src={findMediaUrl(rightTopImage) ?? lines}
          width={rightTopImage?.data?.attributes?.width ?? 600}
          height={rightTopImage?.data?.attributes?.height ?? 290}
          alt="arrowLink"
          className="mx-auto"
        />
      </div>
    </div>
  );
}
export default BannerTealHomeBlock;
