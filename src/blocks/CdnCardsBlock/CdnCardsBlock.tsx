import { ComponentPageBlocksCdnCards } from '@utils/types';
import React, { useContext, useEffect, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import FirstTab from './FirstTab';
import Button from '@components/Button';
import SecondTab from './SecondTab';

function CdnCardsBlock({
  contactContent,
  tabFirstTitleCDN,
  tabSecondTitleCDN,
  innerFirstTitle,
  innerSecondTitle,
  firstCDNCard,
  secondCDNCard,
  thirdCDNCard,
  firstCDNddosCard,
  secondCDNddosCard,
  thirdCDNddosCard,
}: ComponentPageBlocksCdnCards): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(1);

  return (
    <div id="pricingcards">
      <div className="mx-auto w-[90%] max-w-[1100px] md:w-[90%] xlSpecial:w-[77%] ">
        <div className="mx-auto flex justify-center gap-x-1 text-center md:items-center">
          <button
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => setActiveTab(1)}
            className={`${
              1 === activeTab
                ? 'bg-liliac/10 font-["Mont-semibold"] text-purple'
                : 'bg-liliac/5 font-["Mont-book"] text-darkGrey'
            } w-auto cursor-pointer rounded-t-xl py-5 px-2 text-base phoneSmall:px-2 md:px-5 md:text-xl lg:px-10`}
          >
            {tabFirstTitleCDN}
          </button>
          <button
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onClick={() => setActiveTab(2)}
            className={`${
              2 === activeTab
                ? 'bg-liliac/10 font-["Mont-semibold"] text-purple'
                : 'bg-liliac/5 font-["Mont-book"] text-darkGrey'
            } w-auto cursor-pointer rounded-t-xl py-5 px-2 text-base phoneSmall:px-2 md:px-5 md:text-xl lg:px-10`}
          >
            {tabSecondTitleCDN}
          </button>
        </div>
        <div className="flex flex-col items-center rounded-b-2xl bg-liliac/10  heroBreakOne:rounded-2xl md:m-auto">
          {1 === activeTab && (
            <FirstTab
              innerFirstTitle={innerFirstTitle ?? ''}
              firstCDNCard={firstCDNCard}
              secondCDNCard={secondCDNCard}
              thirdCDNCard={thirdCDNCard}
            />
          )}
          {2 === activeTab && (
            <SecondTab
              innerFirstTitle={innerSecondTitle ?? ''}
              firstCDNCard={firstCDNddosCard}
              secondCDNCard={secondCDNddosCard}
              thirdCDNCard={thirdCDNddosCard}
            />
          )}
          <div className="w-full rounded-b-2xl bg-purple ">
            <div className="mx-auto my-7 flex w-[90%] flex-col justify-between font-['Mont-light'] text-[28px] text-white prose-strong:font-['Mont-bold'] md:flex-row md:items-center">
              <div className="whitespace-pre-line">
                <ReactMarkdown>{contactContent ?? ''}</ReactMarkdown>
              </div>
              <div>
                <Button color="tertiary" cta="Contact us" link="/contact-us" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CdnCardsBlock;
