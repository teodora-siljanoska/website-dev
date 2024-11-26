import React from 'react';
import Button from '../../components/Button';
import heroImagePlaceholder from './assets/hero.png';
import findMediaUrl from '../../../utils/findMediaUrl';
import { ComponentPageBlocksHero } from '@utils/types';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'; // Import next/image

function scrollToAgencyHostingVps() {
  const agencyHostingVpsBlock = document.getElementById('pricingcards');
  if (agencyHostingVpsBlock) {
    agencyHostingVpsBlock.scrollIntoView({ behavior: 'smooth' });
  }
}

function HeroBlock({
  size,
  title,
  description,
  heroImage,
  smallTitle,
  button,
  buttonScroll,
  secondTitleVps,
}: ComponentPageBlocksHero): JSX.Element {
  let style = '';

  switch (size) {
    case 'large':
      style = ` lg:h-[570px] py-16 sm:h-full h-full sm:px-[40px] h-full w-full relative`;
      break;
    case 'small':
      style = ` xl:h-[550px] py-16 sm:px-[40px] sm:h-full h-[433px] h-full w-full relative `;
      break;

    default:
      style = ` xl:h-[550px] py-16 sm:px-[40px] sm:h-full h-[433px] h-full w-full relative `;
      break;
  }

  return (
    <div
      className={style}
      // style={{
      //   backgroundImage: `url('${
      //     findMediaUrl(heroImage) ?? heroImagePlaceholder.src
      //   }')`,
      // }}
    >
      <Image
        src={findMediaUrl(heroImage) ?? heroImagePlaceholder.src}
        alt="Your Alt Text"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        blurDataURL={heroImagePlaceholder.src}
        placeholder="blur"
        priority
        className="absolute -z-10"
      />
      <div className="container z-40  mx-auto flex flex-col sm:mt-0">
        <div className="font-['Mont-book'] text-lg text-white  lg:mt-16 md:mt-10 ">
          {smallTitle}
        </div>
        {!smallTitle && <div className="py-4 lg:py-5" />}
        <div className="w-[100%] whitespace-pre-line font-['Mont-light'] text-[28px] leading-[35px] text-white text-balance prose-strong:font-['Mont-bold'] xl:w-[55%] sm:w-[90%] lg:text-[50px] lg:leading-[50px]  ">
          <ReactMarkdown>{title ?? ''}</ReactMarkdown>
        </div>
        {description && (
          <div className="prose-ul:xlSpecial:mt-5 prose-ul:xlSpecial:gap-6 prose-ul:xlSpecial:flex prose-ul:xlSpecial:flex-col prose-ul:mt-2 prose-ul:gap-2 prose-ul:flex prose-ul:flex-col mt-2 w-[60%] whitespace-pre-line font-['Mont-book'] text-base  text-white prose-strong:font-['Mont-bold']  prose-ul:ml-8 prose-ul:list-disc prose-li:font-['Mont-regular'] prose-li:text-[20px] md:mb-4 md:text-2xl lg:mt-[2px] lg:w-[45%] prose-li:lg:text-[30px]">
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
        {
          <div className="w-[100%] whitespace-pre-line font-['Mont-light'] text-[28px] leading-[35px] text-white prose-strong:font-['Mont-bold'] sm:w-[55%] lg:text-[50px] lg:leading-[50px]  ">
            <ReactMarkdown>{secondTitleVps ?? ''}</ReactMarkdown>
          </div>
        }
        {button && (
          <div className="my-12 sm:my-0 sm:mt-4 ">
            {button?.cta && (
              <Button
                color={'tertiary'}
                link={button.link ?? '#'}
                cta={button.cta}
              />
            )}
            {buttonScroll?.cta && (
              <Button
                color={'tertiary'}
                cta={buttonScroll.cta}
                clickHandler={scrollToAgencyHostingVps}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroBlock;
