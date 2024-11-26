import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export interface Options {
  tabTitle: string;
  pairs: Pairs[];
  title: string;
}

export interface Pairs {
  configuration: string;
  desc: string;
  price: number;
  value: 'dollar' | 'euro' | 'pound';
}

export interface P {
  data: Options[];
}

function Resources({ data }: P): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="mx-auto  items-center justify-center self-center text-center ">
        <div className="m-auto w-[19rem] rounded-2xl  md:w-[35.125rem]">
          <div className="mx-auto flex w-[19rem] items-center justify-around md:w-[35.125rem]">
            {data.map((item, idx) => (
              <button
                onClick={() => setActiveTab(idx)}
                key={idx}
                className={`${
                  idx === activeTab
                    ? "bg-liliac/10 font-['Mont-semibold'] text-purple"
                    : "bg-white font-['Mont-regular'] text-darkGrey"
                }  w-full cursor-pointer rounded-t-xl py-5 px-2 text-base md:px-5 md:text-xl`}
              >
                {item.tabTitle}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center">
            <div className="m-auto min-h-[226px] w-[19rem]  rounded-b-2xl bg-liliac/10 py-5  md:w-[35.125rem]">
              <div className="my-7 text-center text-2xl font-['Mont-regular']">
                {data.map(
                  (item, idx) =>
                    idx === activeTab &&
                    item.pairs.map((itemPairs, index) => (
                      <div
                        key={index}
                        className="mx-5 flex justify-between py-1 text-sm sm:mx-12 sm:text-base"
                      >
                        <div>
                          <div className="text-left">
                            {itemPairs.configuration}
                          </div>
                          {itemPairs.desc && (
                            <div className="pl-1 text-left text-sm">
                              <ReactMarkdown>{itemPairs.desc}</ReactMarkdown>
                            </div>
                          )}
                        </div>

                        <div>
                          {itemPairs.value === 'dollar'
                            ? '$'
                            : itemPairs.value === 'euro'
                            ? '€'
                            : itemPairs.value === 'pound'
                            ? '£'
                            : ' '}
                          {itemPairs.price}
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Resources;
