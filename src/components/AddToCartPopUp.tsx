import React, { useEffect, useState } from 'react';
import Button from './Button';
import Image from 'next/legacy/image';
import bgAddToCart from './assets/bgAddToCart.png';
import successfully from './assets/successfully.svg';

function AddToCartPopUp(): JSX.Element {
  return (
    // <div className="fixed inset-0 top-0 left-0 z-10 flex h-full w-full after:h-full after:w-full after:bg-black after:opacity-10">
    <div className="">
      <div className="fixed  top-10 right-0 z-50 flex h-fit w-[374px] flex-col justify-center  overflow-hidden rounded-2xl bg-white text-center shadow-custom md:top-10 md:right-10">
        <div className="border-b-[1px] border-lightGrey font-['Mont-regular'] text-[16px] text-darkTeal">
          <div className="flex gap-x-2  p-6">
            <Image
              src={successfully}
              width={24}
              height={24}
              alt="successfully"
            />
            <div>Successfully added to cart</div>
          </div>
        </div>
        <div className="z-10 w-full py-7 px-6">
          <a
            href="/shopping-cart"
            className="justify-center rounded-full border-2 border-darkTeal bg-darkTeal  px-[42px] py-[12px] text-base text-white transition duration-500 hover:border-2 hover:border-lightTeal hover:bg-lightTeal hover:text-white lg:px-[66px] lg:py-[13px] lg:text-lg"
          >
            View cart
          </a>
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
export default AddToCartPopUp;
