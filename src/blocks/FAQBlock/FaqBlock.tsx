/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import AccordionComponent from '@components/AccordionComponent';
import { AccordionItemProps } from '../../components/AccordionComponent';
import React, { useEffect, useState } from 'react';
// import Title from '../../components/Title';
import AccordionPlusItem from '@components/AccordionPlusItem';
import { useMediaQuery } from 'react-responsive';
import arrow from '../../components/assets/arrow.svg';
import Image from 'next/legacy/image';
import { Maybe } from '@utils/types';

export interface P {
  title: string;
  activeData: number;
  data: AccordionAndTitle[];
}
export interface AccordionAndTitle {
  title: string;
  accordionItems: AccordionItemProps[];
}

function FaqBlock({ data, activeData }: P): JSX.Element {
  if (activeData - 1 > 0) {
    activeData = activeData - 1;
  } else {
    activeData = 0;
  }

  const isDesktopOrTablet = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const [showDropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState<string>(
    data[activeData]?.title ? data[activeData].title : ''
  );

  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState(activeData);
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  const btnOnClick = (index: number) => {
    setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  };
  return (
    <>
      <div className="container mx-auto my-10 lg:mx-0 lg:max-w-[auto] xl:pl-16">
        <div className="flex-row py-[5%] sm:justify-between lg:flex lg:gap-x-24 xl:gap-x-32">
          <div className="shrink-0  sm:basis-1/4">
            {isMobile && (
              <div className="mb-16">
                <div className="flex flex-col items-center">
                  <div className="flex flex-row rounded-lg shadow-custom ">
                    <button
                      className=" inline-flex h-11
                      w-[17.875rem] items-center justify-center gap-2 self-center rounded-lg bg-white px-4 text-center text-base font-['Mont-regular'] text-darkGrey focus:border-2 focus:border-purple"
                      type="button"
                      onClick={() => setDropdown(!showDropdown)}
                    >
                      <span>{activeDropdownItem ?? ''}</span>
                      <span>
                        <Image
                          src={arrow as string}
                          alt="down-arrow"
                          className={`${showDropdown ? 'rotate-180 ' : ' '}`}
                        />
                      </span>
                    </button>
                    <div className="absolute z-50 mt-11 flex w-[17.875rem] flex-col rounded-lg bg-white shadow-customDropdown">
                      {showDropdown && (
                        <ul className="py-1">
                          {data?.map((dataItem, index) => (
                            <li
                              className={`${
                                activeDropdownItem == dataItem?.title
                                  ? 'font-["Mont-bold"] text-liliac'
                                  : 'font-["Mont-regular"]'
                              }  flex w-full cursor-pointer justify-center bg-white p-2 text-base  text-darkGrey`}
                              key={index}
                              onClick={() => {
                                setActiveDropdownItem(dataItem?.title ?? '');
                                setActiveTab(index);
                                setDropdown(false);
                              }}
                            >
                              {dataItem?.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isDesktopOrTablet && (
              <div>
                {data?.map((item, index) => {
                  return (
                    <div
                      onClick={() => setActiveTab(index)}
                      key={index}
                      className={`${
                        activeTab === index
                          ? "font-['Mont-bold'] text-purple"
                          : "font-['Mont-light'] text-darkGrey"
                      } my-1 mt-6 cursor-pointer text-center text-2xl  hover:font-medium hover:text-purple sm:text-left sm:text-[26px]`}
                    >
                      {item?.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          {
            <div className="w-full">
              {data?.[activeTab]?.accordionItems?.map(
                (
                  itemProp: { title: Maybe<string>; description: string },
                  idx: number
                ) => (
                  <div key={idx} className="border-b border-lightGrey">
                    <AccordionPlusItem
                      title={itemProp.title ?? ''}
                      description={itemProp.description}
                      isOpen={idx === currentIndex}
                      btnOnClick={() => btnOnClick(idx)}
                    />
                  </div>
                )
              )}
            </div>
          }
        </div>
      </div>
    </>
  );
}
export default FaqBlock;
