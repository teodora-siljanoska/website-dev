import React from 'react';
import Image from 'next/legacy/image';
import 'react-phone-number-input/style.css';
import error from './assets/error.svg';
import bgAddToCart from './assets/bgAddToCart.png';

interface P {
  message: string;
}

function ErrorAddToCartPopUp({ message }: P): JSX.Element {
  return (
    <div className="">
      <div className="fixed  top-10 right-0 z-50 flex h-fit w-[374px] flex-col justify-center  overflow-hidden rounded-2xl bg-white text-center shadow-custom md:top-10 md:right-10">
        <div className="border-b-[1px] border-lightGrey font-['Mont-regular'] text-[16px] text-darkGrey">
          <div className="flex items-start  gap-x-2 p-6">
            <div className="h-[24px] w-[24px]">
              <Image
                src={error}
                width={24}
                height={24}
                layout="fixed"
                alt="successfully"
              />
            </div>
            <div className="text-left">
              <div className="font-['Mont-regular']">{message}</div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 z-0 w-[100%]">
          <Image
            src={bgAddToCart}
            width={574}
            height={357}
            alt="arrowLink"
            layout="fill"
            className="h-full w-full"
            style={{
              width: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default ErrorAddToCartPopUp;
