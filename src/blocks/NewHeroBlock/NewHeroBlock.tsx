import React from 'react';
import Button from '../../components/Button';
import heroImagePlaceholder from './assets/hero.png';
import findMediaUrl from '../../../utils/findMediaUrl';
import { ComponentPageBlocksNewHero } from '@utils/types';
import ReactMarkdown from 'react-markdown';
import Image from 'next/legacy/image';

function NewHeroBlock({
  title,
  description,
  heroImage,
  button,
}: ComponentPageBlocksNewHero): JSX.Element {
  return (
    <div
      className={`relative z-30 flex overflow-x-hidden pt-[50px] md:min-h-[570px] xlSpecial:min-h-[650px] 3xl:container 3xl:mx-auto`}
    >
      <div
        className="z-40 flex flex-col smallest:ml-[20px] 
      smallest:max-w-[360px] sm:mt-0
      md:ml-[35px] md:max-w-[600px] xlSpecial:ml-[126px]
      xlSpecial:max-w-[1056px] portrait:md:max-w-[59%]  
      "
      >
        <div
          className="font-['Mont-light'] uppercase text-purple prose-strong:font-['Mont-bold']
        smallest:max-w-full smallest:pt-0 smallest:text-[32px] smallest:leading-[40px]
        md:max-w-full md:pt-[130px] md:text-[38px] xlSpecial:max-w-[75%] xlSpecial:pt-[140px]
        xlSpecial:text-[50px] xlSpecial:leading-[57px] portrait:md:pt-[70px] portrait:md:text-[32px]
         "
        >
          <ReactMarkdown>{title ?? ''}</ReactMarkdown>
        </div>
        {description && (
          <div
            className="mt-2 mb-[20px] font-['Mont-light'] text-black
          smallest:text-[20px] smallest:leading-[34px]
          md:text-[22px] xlSpecial:mt-[2px] 
          xlSpecial:max-w-[800px] xlSpecial:text-[24px] 
           "
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </div>
        )}
        <div className="z-40">
          {button?.cta && (
            <Button
              color={'tertiary'}
              link={button.link ?? '#'}
              cta={button.cta}
            />
          )}
        </div>
        <div
          className="outerGlow  relative bottom-[70px] z-30 overflow-hidden
        rounded-full
        smallest:right-[-155px]
        smallest:block smallest:max-h-[283px] smallest:max-w-[283px] phoneLarge:right-[-300px]
        phoneS:right-[-300px]
        heroBreakOne:right-[-300px]
        heroBreakOne:max-h-[450px] heroBreakOne:max-w-[450px] md:hidden
        "
        >
          <Image
            src={findMediaUrl(heroImage) ?? heroImagePlaceholder.src}
            alt="image"
            layout="intrinsic"
            objectFit="cover"
            width={594}
            height={594}
            priority
          />
        </div>
      </div>
      <div
        className="outerGlow absolute z-30 overflow-hidden rounded-full smallest:right-[-85px]
      smallest:hidden smallest:max-h-[283px] smallest:max-w-[283px] md:right-[-150px] md:block
      xlSpecial:right-[-150px] xlSpecial:max-h-[594px] xlSpecial:max-w-[594px] 3xl:right-0 portrait:md:right-[-150px] portrait:md:max-h-[470px]  portrait:md:max-w-[470px]
      landscape:md:max-h-[520px]
      landscape:md:max-w-[520px] landscape:xlSpecial:max-h-[594px] landscape:xlSpecial:max-w-[594px]
      "
      >
        <Image
          src={findMediaUrl(heroImage) ?? heroImagePlaceholder.src}
          alt="image"
          layout="intrinsic"
          objectFit="cover"
          width={694}
          height={694}
        />
      </div>
    </div>
  );
}

export default NewHeroBlock;
