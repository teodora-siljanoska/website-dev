import React from 'react';

export interface P {
  cta: string;
  aligment: 'left' | 'center' | 'right';
}

function TestimonialDescripton({ cta, aligment }: P): JSX.Element {
  return (
    <div className="">
      <div
        className={` ${
          aligment === 'right'
            ? 'text-right'
            : aligment === 'left'
            ? 'text-left'
            : 'text-center'
        }  text-[18px]  font-['Mont-light'] text-white sm:text-[16px] `}
      >
        {cta}
      </div>
    </div>
  );
}
export default TestimonialDescripton;
