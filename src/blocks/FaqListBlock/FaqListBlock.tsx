import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
// import { Maybe } from '@utils/types';
import arrow from '../../components/assets/arrow.svg';
import Image from 'next/legacy/image';

export interface P {
  activeData: number;
  content: Content[];
}
export interface Content {
  title: string;
  items: ContextItem[];
}
export interface ContextItem {
  title: string;
}

function FaqListBlock({ activeData, content }: P): JSX.Element {
  if (activeData - 1 > 0) {
    activeData = activeData - 1;
  } else {
    activeData = 0;
  }

  const isDesktopOrTablet = useMediaQuery({ minWidth: 1024 });
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  const [showDropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState<string>(
    content[activeData]?.title ? content[activeData].title : ''
  );

  // const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeTab, setActiveTab] = useState(activeData);
  // useEffect(() => {
  //   setCurrentIndex(0);
  // }, [activeTab]);

  // const btnOnClick = (index: number) => {
  //   setCurrentIndex((currentValue) => (currentValue !== index ? index : -1));
  // };
  return (
    <>
      <div className="container mx-auto my-10 lg:mx-auto lg:max-w-[auto] xl:pl-16">
        <div className="container mx-auto flex-row py-[5%] sm:justify-between lg:flex lg:gap-x-24 xl:gap-x-20">
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
                          {content?.map((dataItem, index) => (
                            <li
                              className={`${
                                activeDropdownItem == dataItem?.title
                                  ? 'font-["Mont-bold"] text-liliac'
                                  : 'font-["Mont-regular"]'
                              }  flex w-full cursor-pointer justify-center bg-white p-2 text-base text-darkGrey`}
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
                {content?.map((item, index) => {
                  return (
                    <div
                      onClick={() => setActiveTab(index)}
                      key={index}
                      className={`${
                        activeTab === index
                          ? 'font-["Mont-bold"] text-purple'
                          : "font-['Mont-light'] text-darkGrey"
                      } mb-6 cursor-pointer text-center text-2xl hover:text-purple sm:text-left sm:text-[26px]`}
                    >
                      {item?.title}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full lg:columns-3">
            {content?.[activeTab].items.map((itemProp, idx) => (
              <div key={idx} className="border-lightGrey">
                <div>{itemProp.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default FaqListBlock;
