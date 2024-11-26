import React from 'react';

export interface P {
  cta: string;
  alignment: 'left' | 'center' | 'right' | 'blog';
}

function CenteredDescription({ cta, alignment }: P): JSX.Element {
  return (
    <div
      className={` ${
        alignment === 'right'
          ? 'text-right font-["Mont-semibold"] text-liliac'
          : alignment === 'left'
          ? ' text-left font-["Mont-semibold"]  text-liliac'
          : alignment === 'blog'
          ? 'text-center font-["Mont-semibold"] text-purple'
          : 'py-2 text-center font-["Mont-light"] text-[#2C2933]  xl:px-[210px] '
      }  text-xl md:text-[28px]`}
    >
      {cta}
    </div>
  );
}
export default CenteredDescription;
