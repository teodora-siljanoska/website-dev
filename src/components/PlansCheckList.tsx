import React from 'react';
import Image from 'next/legacy/image';
import check from './assets/check.svg';
import cross from './assets/cross.svg';

export interface P {
  plansTitle?: string;
  checking?: 'check' | 'cross' | 'empty';
}

function PlansCheckList({ plansTitle, checking }: P): JSX.Element {
  return (
    <div className="flex gap-[15px] w-auto">
      {checking != 'empty' ? (
        <div>
          <Image
            alt="image"
            src={checking === 'check' ? (check as string) : (cross as string)}
            height={30}
            width={30}
            layout="fixed"
          />
        </div>
      ) : (
        ''
      )}
      <div className="flex w-full flex-col gap-2">
        <span
          className={`text-lillac text-left text-darkGrey font-['Mont-book'] text-[26px]`}
        >
          {plansTitle}
        </span>
      </div>
    </div>
  );
}

export default PlansCheckList;
