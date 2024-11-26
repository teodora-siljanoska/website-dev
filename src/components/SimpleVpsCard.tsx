import React, { Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/legacy/image';
import deskImage from './assets/location.png';

export interface P {
  title: string;
  desktopImage?: image;
  aligment: 'left' | 'center' | 'right';
  data: string[];
  setConfigState: Dispatch<SetStateAction<any>>;
}

interface image {
  width: number;
  height: number;
  src: string;
}

function SimpleVpsCard({
  title,
  desktopImage,
  aligment,
  data,
  setConfigState,
}: P): JSX.Element {
  const [showDropdown, setDropdown] = useState<boolean>(false);
  const [activeDropdownItem, setActiveDropdownItem] = useState<string>(data[0]);

  return (
    <>
      <div className="my-10 flex max-h-[293px] w-full max-w-[294px] flex-col items-center rounded-lg border  border-white bg-white shadow-custom">
        <div className="mt-10">
          {desktopImage && (
            <Image
              alt="image"
              src={desktopImage.src || deskImage.src}
              height={desktopImage.height}
              width={desktopImage.width}
            />
          )}
        </div>
        <h3
          className={`w-full ${
            aligment === 'right'
              ? 'text-right'
              : aligment === 'left'
              ? 'text-left'
              : 'text-center'
          } mt-8 mb-6 text-[18px] font-['Mont-semibold'] text-darkGrey sm:text-[26px]`}
        >
          {title}
        </h3>

        <button
          className=" inline-flex items-center rounded-lg px-4 text-center  text-base font-['Mont-semibold'] text-darkGrey  "
          type="button"
          onClick={() => setDropdown(!showDropdown)}
        >
          {activeDropdownItem}
          <svg
            className="pl-2"
            width="30"
            height="8"
            viewBox="0 0 12 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0.657227L5.7561 0.75647L11.3137 0.657227L5.65685 6.31408L0 0.657227Z"
              fill="#552B71"
            />
          </svg>
        </button>

        <div className=" shadow z-10 h-10 w-full divide-y rounded bg-white text-center text-base">
          {showDropdown && (
            <ul className="mt-8 pb-4">
              {data.map((dataItem, index: number) => (
                <li
                  onClick={() => {
                    setActiveDropdownItem(dataItem);
                    setDropdown(false);
                    setConfigState(index);
                  }}
                  className="block h-10 w-full cursor-pointer bg-white py-2 px-4 text-base font-['Mont-semibold'] text-black hover:text-purple"
                  key={index}
                >
                  {dataItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default SimpleVpsCard;
