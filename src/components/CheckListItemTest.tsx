import React from 'react';
import Image from 'next/legacy/image';
import check from './assets/check.svg';
import cross from './assets/cross.svg';

export interface P {
  cta: string;
  checking: 'check' | 'cross' | 'empty';
  size: 'card' | 'features' | 'packageCard';
}

function CheckListItemTest({ cta, checking, size }: P): JSX.Element {
  if (size === 'card') {
    return (
      <div className="mt-4 pl-[50px] ">
        <Image
          alt="image"
          src={checking === 'check' ? (check as string) : (cross as string)}
          height={13.75}
          width={13.1}
        />

        <span className="pl-[10px]   text-[11.78px] text-black">{cta}</span>
      </div>
    );
  } else {
    if (size === 'features') {
      return (
        <div className="mt-5">
          <Image
            alt="image"
            src={checking === 'check' ? (check as string) : (cross as string)}
            height={30}
            width={30}
          />

          <span className="pl-[15px] text-left text-[26px] text-darkGrey">
            {cta}
          </span>
        </div>
      );
    } else {
      return <div>Error!</div>;
    }
  }
}
export default CheckListItemTest;
