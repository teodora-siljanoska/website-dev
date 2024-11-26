/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { useState } from 'react';
import Button from '@components/Button';
import TitleTab from '@components/TitledTab';
import { ComponentPageBlocksTitledTabs } from '@utils/types';

interface Pair {
  title: string;
  desc: string;
}

function TitledTabsBlock({ tabs }: ComponentPageBlocksTitledTabs): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="container mx-auto items-center justify-center  self-center md:w-[90%] xlSpecial:w-[70%]">
        <div className="mx-auto flex justify-center gap-x-1 text-center md:items-center">
          {tabs?.map((item, idx) => (
            <button
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onClick={() => setActiveTab(idx)}
              key={idx}
              className={`${
                idx === activeTab
                  ? 'bg-liliac/10 font-["Mont-semibold"] text-purple'
                  : 'bg-liliac/5 font-["Mont-book"] text-darkGrey'
              } w-auto cursor-pointer rounded-t-xl py-5 px-2 text-base phoneSmall:px-2 md:px-5 md:text-xl lg:px-10`}
            >
              {item?.tabTitle}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center rounded-b-2xl bg-liliac/10 phoneLarge:rounded-2xl md:m-auto">
          <div className="w-[100%] py-10 px-5 text-left md:m-auto md:px-[68px]">
            {tabs?.map((item, index) => {
              if (index === activeTab) {
                const pairs = item?.pairs ?? [];
                const lastPairIndex = pairs.length - 1;

                return pairs.map((itemPair: Pair, pairIndex: any) => (
                  <div key={index} className="grid gap-[28px] pb-[28px]">
                    <TitleTab title={itemPair.title} desc={itemPair.desc} />
                    {pairIndex !== lastPairIndex && (
                      <hr className="border-[#CABACD]" />
                    )}
                  </div>
                ));
              }
              return null;
            })}
            {tabs?.map(
              (item, index) =>
                index === activeTab &&
                item?.hasButton && (
                  <div key={index} className="my-10 flex gap-2">
                    <div className="basis-1/3 text-lg font-['Mont-semibold']  md:text-xl">
                      Pricing / Order
                    </div>
                    <div className="grid basis-2/3 justify-items-end text-lg sm:justify-items-start md:text-xl">
                      <Button
                        color="tertiary"
                        cta={item.buttonCta ?? ''}
                        link={item.buttonLink ?? '#'}
                      />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TitledTabsBlock;
