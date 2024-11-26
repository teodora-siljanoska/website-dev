import React from 'react';

export interface P {
  cta: string;
}

function SmallLeftTitle({ cta }: P): JSX.Element {
  return (
    <div className="mb-8">
      <h2 className="text-center text-[20px] font-['Mont-book'] text-purple md:text-[28px] ">
        {cta}
      </h2>
    </div>
  );
}
export default SmallLeftTitle;
