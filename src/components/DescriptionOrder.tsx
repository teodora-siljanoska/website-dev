import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface P {
  cta: string;
  alignment?: 'left' | 'center' | 'right';
}

function DescriptionOrder({ cta, alignment }: P): JSX.Element {
  return (
    <div className="">
      <div
        className={` ${
          alignment === 'right'
            ? 'text-right'
            : alignment === 'left'
            ? 'text-left'
            : 'text-center'
        } font-['Mont-bold'] text-[12px] text-darkGrey prose-ul:ml-5 prose-ul:list-disc sm:text-[16px]`}
      >
        <ReactMarkdown>{cta}</ReactMarkdown>
      </div>
    </div>
  );
}
export default DescriptionOrder;
