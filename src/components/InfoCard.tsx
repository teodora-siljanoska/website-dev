import React from 'react';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import icon from '../blocks/InfoCardsBlock/assets/icon.svg';
import lines from '../blocks/InfoCardsBlock/assets/lines.svg';
import ReactMarkdown from 'react-markdown';
import Button from '@components/Button';

export interface P {
  card: any;
  numberOfShowingCardsInRow: 'two' | 'three' | 'four';
}

function InfoCard({ card, numberOfShowingCardsInRow }: P): JSX.Element {
  let paddingCards = '';

  switch (numberOfShowingCardsInRow) {
    case 'two':
      paddingCards = `px-[46px] py-[30px]`;
      break;
    case 'three':
      paddingCards = `px-[36px] py-[45px]`;
      break;
    case 'four':
      paddingCards = `px-[36px] py-[45px]`;
      break;
    default:
      paddingCards = `px-[36px] py-[45px]`;
      break;
  }
  return (
    <div className="relative rounded-[11px] shadow-custom">
      <div className={` ${paddingCards} flex h-full flex-col overflow-hidden`}>
        {card?.infoImage?.data && (
          <div className="mb-[20px]">
            <Image
              src={findMediaUrl(card?.infoImage) ?? icon}
              width={card?.infoImage?.data?.attributes?.width ?? 61.8}
              height={61.8}
              layout="intrinsic"
              alt="info"
            />
          </div>
        )}
        {card?.aboveTitleInfoCard && (
          <div
            className={`${card.colorOfContent === 'teal' && 'text-darkTeal'} ${card.colorOfContent === 'purple' && 'text-liliac'
              } font-["Mont-regular"] text-xl leading-[31px]`}
          >
            {card?.aboveTitleInfoCard}
          </div>
        )}
        {card?.titleInfoCard && (
          <h2
            className={`${card.colorOfContent === 'teal' && 'text-darkTeal'} ${card.colorOfContent === 'purple' && 'text-purple'
              } mt-[5px] font-['Mont-bold'] text-[23px] leading-[31px] `}
          >
            {card?.titleInfoCard}
          </h2>
        )}
        {card?.subTitleInfoCard && (
          <h3
            className={`${card.colorOfContent === 'teal' && 'text-black'} ${card.colorOfContent === 'purple' && 'text-black'
              } mt-[2px] font-["Mont-regular"] text-lg leading-[26px]`}
          >
            {card?.subTitleInfoCard}
          </h3>
        )}
        {card?.descriptionInfoCard && (
          <div
            className={`mt-[15px] mb-[38px] font-["Mont-book"] text-base leading-[26px] text-darkGrey 
                ${card.colorOfContent === 'teal' &&
              'prose-a:text-darkTeal prose-a:underline'
              } ${card.colorOfContent === 'purple' &&
              'prose-a:text-liliac prose-a:underline'
              } `}
          >
            <ReactMarkdown>{card?.descriptionInfoCard}</ReactMarkdown>
          </div>
        )}
        <div className="relative z-10 mt-auto">
          {card?.optionalCtaButtonInfoCard && card.optionalLinkButtonInfoCard && (
            <div className="">
              <div className="bottom-0 flex flex-col items-center">
                <Button
                  cta={card?.optionalCtaButtonInfoCard ?? ''}
                  link={card?.optionalLinkButtonInfoCard ?? ''}
                  color={
                    (card?.colorOfContent === 'teal' && 'tertiary') ||
                    (card?.colorOfContent === 'purple' && 'primary') ||
                    'primary'
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 flex h-[100%] w-full flex-col justify-end">
        <Image
          src={lines}
          width={lines.width}
          height={lines.height}
          alt="line"
          layout="responsive"
          objectFit="cover"
          quality={100}
        />
      </div>
    </div>
  );
}
export default InfoCard;
