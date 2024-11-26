import React from 'react';

export interface P {
  cta: string;
  alignment: 'left' | 'center' | 'right';
  fontSize: 'Big' | 'Small';
}

function Title({ cta, alignment, fontSize }: P): JSX.Element {
  return (
    <div className="">
      <h2
        className={` ${
          alignment === 'right'
            ? 'text-right text-balance'
            : alignment === 'left'
            ? 'text-left text-balance'
            : 'text-center text-balance'
        } ${
          fontSize === 'Big'
            ? 'smallest:text-[26px] sm:text-[28px] xlSpecial:text-[42px]'
            : fontSize === 'Small'
            ? 'smallest:text-[26px] sm:text-[28px] xlSpecial:text-[30px]'
            : 'text-[36px] sm:text-[42px]'
        } font-['Mont-bold'] text-purple`}
      >
        {cta}
      </h2>
    </div>
  );
}
export default Title;
