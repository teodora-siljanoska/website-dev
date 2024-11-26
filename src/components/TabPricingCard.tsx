import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Button from './Button';
import CheckListItem, { P as CheckListItemProps } from './CheckListItem';

export interface Options {
  tabTitle: string;
  title: string;
  value: 'dollar' | 'euro' | 'pound';
  price: number;
  sale: number;
  underPriceDesc: string;
  linkButton: string;
  itemsCheck: CheckListItemProps[];
}

export interface P {
  data: Options[];
}

function TabPricingCard({ data }: P): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <>
      <div className="mx-auto items-center justify-center self-center text-center ">
        <div className="m-auto w-[16.75rem] rounded-2xl shadow-custom">
          <div className="mx-auto flex w-[16.75rem] max-w-md items-center justify-around">
            {data.map((item, idx) => (
              <button
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                onClick={() => setActiveTab((activeTab) => idx)}
                key={idx}
                className={`${
                  idx === activeTab
                    ? "cursor-pointer rounded-t-xl bg-liliac/10 py-7 font-['Mont-regular']   text-purple md:text-2xl"
                    : "cursor-pointer rounded-t-xl bg-white py-7 font-['Mont-regular']   text-darkGrey md:text-2xl"
                } w-full`}
              >
                {item.tabTitle}
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            <div className="m-auto grid w-[16.75rem] content-between rounded-b-2xl bg-white py-5 sm:h-[630px]">
              <div>
                <p className="mb-4 text-center text-xl font-['Mont-regular'] text-darkGrey">
                  {data.map((item, idx) => (
                    <p
                      key={idx}
                      className={`${idx === activeTab ? '' : 'hidden'}`}
                    >
                      <ReactMarkdown>{item.title}</ReactMarkdown>
                    </p>
                  ))}
                </p>
                <p className="text-center font-['Mont-bold'] text-lg text-darkGrey/70 line-through">
                  {data.map((item, idx) =>
                    item.sale === 0 ? (
                      <p
                        key={idx}
                        className={`${
                          idx === activeTab ? '' : 'hidden'
                        }  invisible`}
                      >
                        {item.value === 'dollar'
                          ? '$'
                          : item.value === 'euro'
                          ? '€'
                          : item.value === 'pound'
                          ? '£'
                          : ' '}{' '}
                        {item.price}
                      </p>
                    ) : (
                      <p
                        key={idx}
                        className={`${idx === activeTab ? '' : 'hidden'}`}
                      >
                        {item.value === 'dollar'
                          ? '$'
                          : item.value === 'euro'
                          ? '€'
                          : item.value === 'pound'
                          ? '£'
                          : ' '}{' '}
                        {item.price}
                      </p>
                    )
                  )}
                </p>
                <p className="-m-5 text-center  font-['Mont-bold'] text-[45px]">
                  {data.map((item, idx) =>
                    item.sale === 0 ? (
                      <p
                        key={idx}
                        className={`${
                          idx === activeTab ? 'text-lightTeal' : 'hidden'
                        }`}
                      >
                        {item.value === 'dollar'
                          ? '$'
                          : item.value === 'euro'
                          ? '€'
                          : item.value === 'pound'
                          ? '£'
                          : ' '}{' '}
                        {item.price}
                      </p>
                    ) : (
                      <p
                        key={idx}
                        className={`${
                          idx === activeTab ? 'text-pink' : 'hidden'
                        }`}
                      >
                        {item.value === 'dollar'
                          ? '$'
                          : item.value === 'euro'
                          ? '€'
                          : item.value === 'pound'
                          ? '£'
                          : ' '}{' '}
                        {((item.price / 100) * (100 - item.sale)).toFixed(2)}
                      </p>
                    )
                  )}
                </p>
                <p className="min-h-[20px] pt-1">
                  {data.map((item, idx) => (
                    <p key={idx} className="text-sm text-[#9F9F9F]">
                      {item.underPriceDesc}
                    </p>
                  ))}
                </p>
                <p className="mb-[57px] mt-6 flex justify-center px-2">
                  {data.map((item, idx) => (
                    <p
                      key={idx}
                      className={`${idx === activeTab ? '' : 'hidden'} `}
                    >
                      {item.itemsCheck.map((itemCheck, idx) => (
                        <CheckListItem
                          key={idx}
                          cta={itemCheck.cta}
                          size="card"
                          checking="check"
                          description=""
                          ctaButton=""
                          linkButton=""
                        />
                      ))}
                    </p>
                  ))}
                </p>
              </div>
              <div>
                <p className="mb-5  text-center font-['Mont-bold'] text-lg text-lightTeal">
                  {data.map((item, idx) => (
                    <p
                      key={idx}
                      className={`${idx === activeTab ? '' : 'hidden'}`}
                    >
                      <Button
                        cta="Buy"
                        link={item.linkButton}
                        color="primary"
                      />
                    </p>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabPricingCard;
