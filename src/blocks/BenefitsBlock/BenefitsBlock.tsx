import React from 'react';
import Benefit from '@components/Benefit';
import placeholderImage from './assets/secondImage.png';
import {
  ComponentPageBlocksBenefits,
  UploadFileEntityResponse,
} from '@utils/types';
import ReactMarkdown from 'react-markdown';
import { useMediaQuery } from 'react-responsive';
import AboutHeroImage from './assets/ribbonsIntro.png';

function BenefitsBlock({ benefits }: ComponentPageBlocksBenefits): JSX.Element {
  const isMobile = useMediaQuery({ maxWidth: 736 });

  return (
    <>
      {isMobile && (
        <div className=" flex w-full justify-between sm:bg-cover sm:bg-center sm:bg-no-repeat lg:flex-row ">
          <div className="z-40 mx-auto mt-20 flex w-[90%] flex-col self-end smallest:gap-[40px] sm:mt-0 md:gap-[153px]">
            {benefits?.map((item, index) => (
              <Benefit
                key={index}
                buttonColor={item?.buttonColor ?? 'primary'}
                buttonLink={item?.buttonLink ?? '#'}
                buttonCta={item?.buttonCta ?? ''}
                description={item?.description ?? ''}
                title={item?.title ?? ''}
                image={
                  item?.image ??
                  (placeholderImage.src as UploadFileEntityResponse)
                }
                alignment={item?.alignment as 'left' | 'right' | 'center'}
              />
            ))}
          </div>
        </div>
      )}
      {!isMobile && (
        <div
          className="flex w-full justify-between sm:bg-cover sm:bg-center sm:bg-no-repeat lg:flex-row 3xl:container 3xl:mx-auto "
          style={{
            backgroundImage: `url("${AboutHeroImage.src}")`,
          }}
        >
          <div className="z-40 mx-auto mt-20 flex flex-col gap-[153px] self-end sm:mt-0 md:w-[90%] xlSpecial:w-[74%]">
            {benefits?.map((item, index) => (
              <Benefit
                key={index}
                buttonColor={item?.buttonColor ?? 'primary'}
                buttonLink={item?.buttonLink ?? '#'}
                buttonCta={item?.buttonCta ?? ''}
                description={item?.description ?? ''}
                title={item?.title ?? ''}
                image={
                  item?.image ??
                  (placeholderImage.src as UploadFileEntityResponse)
                }
                alignment={item?.alignment as 'left' | 'right' | 'center'}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default BenefitsBlock;
