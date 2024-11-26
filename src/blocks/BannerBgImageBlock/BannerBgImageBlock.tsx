import { ComponentPageBlocksBannerBgImage } from '@utils/types';
import React from 'react';
import Description from '@components/Description';
import Link from 'next/link';
import arrow from './assets/arrow.svg';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';

function scrollToAgencyHostingVps() {
  const agencyHostingVpsBlock = document.getElementById('testimonials');
  if (agencyHostingVpsBlock) {
    agencyHostingVpsBlock.scrollIntoView({ behavior: 'smooth' });
  }
}

function BannerBgImageBlock({
  bannerMainText,
  imgBanner,
  linkForLink,
  textForLink,
}: ComponentPageBlocksBannerBgImage): JSX.Element {
  return (
    <div className="container relative mx-auto mb-10 flex flex-col gap-[13px] md:w-[70%] xlSpecial:w-[50%]">
      <div className="mt-16">
        <Description
          alignment={bannerMainText?.alignment ?? 'center'}
          contentDescription={bannerMainText?.contentDescription ?? ''}
          fontSize={bannerMainText?.fontsize ?? 'big'}
        />
      </div>
      <div className="z-10 w-full text-center text-base text-liliac sm:text-xl font-['Mont-regular']">
        <button type="button" onClick={scrollToAgencyHostingVps}>
          <div className="flex justify-center gap-3">
            <div>{textForLink} </div>
            <Image src={arrow} width={16} height={14} alt="arrowLink" />
          </div>
        </button>
      </div>
      <div className="absolute z-0 flex w-full justify-center">
        <div className="mx-auto">
          <Image
            src={findMediaUrl(imgBanner) ?? arrow}
            width={imgBanner?.data?.attributes?.width ?? 146}
            height={imgBanner?.data?.attributes?.height ?? 110}
            alt="arrowLink"
            className="mx-auto"
          />
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .absolute {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
        }
      `}</style>
    </div>
  );
}
export default BannerBgImageBlock;
