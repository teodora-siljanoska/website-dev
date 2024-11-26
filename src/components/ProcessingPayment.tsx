import React, { useEffect, useState } from 'react';
import Button from './Button';
import Image from 'next/legacy/image';
import thankContact from './assets/ty.png';
import processing from './assets/processing.svg';

function ProcessingPayment(): JSX.Element {
  return (
    <div className="fixed inset-0 top-0 left-0 z-10 flex h-full w-full after:h-full after:w-full after:bg-black after:opacity-50">
      <div className=" fixed top-1/2 left-1/2 z-50 flex h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col justify-center overflow-hidden rounded-2xl bg-white p-5 text-center shadow-custom md:h-[500px] md:w-[50%]">
        <div>
          <Image
            className="animate-spin"
            alt="image"
            src={processing.src}
            height={61}
            width={61}
            layout="fixed"
          />
        </div>
        <div className="font-['Mont-semibold'] text-[32px] text-liliac">
          Processing order
        </div>
        <div className="pt-5 pb-16 font-['Mont-book'] text-[18px] text-darkGrey">
          Please wait while we process your payment...
        </div>
        <div className="absolute inset-0 z-0 w-[100%]">
          <Image
            src={thankContact}
            width={900}
            height={500}
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
export default ProcessingPayment;
