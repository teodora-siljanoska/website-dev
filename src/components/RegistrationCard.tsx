import React, { useState, useEffect } from 'react';
import arrow from './assets/emptyDownArrow.svg';
import Image from 'next/legacy/image';

export interface DropdownOptions {
  option: string;
  price: number;
  period: string;
  currency: 'dollar' | 'euro' | 'pound';
}
export interface Options {
  tabTitle: string;
  dropdownOptions: DropdownOptions[];
}

export interface P {
  data: Options[];
}

function RegistrationCard({ data }: P): JSX.Element {
  const [showDropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<number>(0);

  useEffect(() => {
    setActiveDropdownItem(0);
  }, [activeTab]);

  return (
    <>
      <div className="mx-auto items-center justify-center self-center text-center">
        <div className="mx-auto flex w-[340px] max-w-md flex-row items-center justify-around md:w-[390px]">
          {data.map((item, idx) => (
            <button
              onClick={() => setActiveTab(idx)}
              key={idx}
              className={`${
                idx === activeTab
                  ? 'cursor-pointer rounded-t-xl bg-liliac/10 py-10  font-["Mont-bold"] text-purple md:text-2xl'
                  : 'cursor-pointer rounded-t-xl bg-white py-10   font-medium text-darkGrey md:text-2xl'
              } w-full`}
            >
              {item.tabTitle}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[340px] rounded-b-2xl  bg-liliac/10 py-4 md:w-[390px]">
            <div className="flex flex-col items-center">
              <div className="flex flex-row ">
                <button
                  className="mt-1 inline-flex h-16 w-[295px] items-center justify-center  self-center rounded-lg bg-white px-4 text-center  text-base font-['Mont-semibold'] text-darkGrey  "
                  type="button"
                  onClick={() => setDropdown(!showDropdown)}
                >
                  <p className="pr-[58px] font-medium">
                    {data[activeTab].dropdownOptions[activeDropdownItem].option}
                  </p>
                  <Image src={arrow as string} alt="down-arrow" />
                </button>
                <div className=" absolute mt-16 flex w-[295px] flex-col rounded-lg bg-white">
                  {showDropdown && (
                    <ul className=" max-h-[300px] overflow-y-scroll  py-1">
                      {data.map(
                        (dataItem, index) =>
                          index === activeTab &&
                          dataItem.dropdownOptions.map(
                            (dropdownItem, index: number) => (
                              <li
                                onClick={() => {
                                  setActiveDropdownItem(index);
                                  setDropdown(false);
                                }}
                                className="flex cursor-pointer justify-center bg-white p-3 text-center text-base text-darkGrey hover:text-purple"
                                key={index}
                              >
                                {dropdownItem.option}
                              </li>
                            )
                          )
                      )}
                    </ul>
                  )}
                </div>
              </div>
            </div>

            <p className="mt-2 text-center text-base font-['Mont-regular'] text-darkGrey">
              <span className=" text-base text-lightTeal">*</span> Registration
              restrictions apply
            </p>
            <p className="  mt-12 text-center text-base font-['Mont-regular'] text-darkGrey">
              Price per year
            </p>
            <p className="text-center font-['Mont-bold'] text-[55px] text-darkTeal">
              {data.map((item, idx) => (
                <p key={idx} className={`${idx === activeTab ? '' : 'hidden'}`}>
                  {item.dropdownOptions[activeDropdownItem].currency ===
                  'dollar'
                    ? '$'
                    : item.dropdownOptions[activeDropdownItem].currency ===
                      'euro'
                    ? '€'
                    : item.dropdownOptions[activeDropdownItem].currency ===
                      'pound'
                    ? '£'
                    : ''}{' '}
                  {item.dropdownOptions[activeDropdownItem].price}
                </p>
              ))}
            </p>
            <p className="  mt-12 text-center text-base font-['Mont-regular'] text-darkGrey">
              Registration period
            </p>
            <p className=" flex flex-row justify-center text-center font-['Mont-bold'] text-[50px] text-liliac">
              {data.map((item, idx) => (
                <p key={idx} className={`${idx === activeTab ? '' : 'hidden'}`}>
                  {item.dropdownOptions[activeDropdownItem].period}
                </p>
              ))}
              <p className="self-end pb-3 text-lg">/years</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationCard;
