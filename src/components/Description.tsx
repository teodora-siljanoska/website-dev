import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface P {
  contentDescription: any;
  alignment: 'left' | 'center' | 'right';
  fontSize?: 'big' | 'small';
}

function Description({
  contentDescription,
  alignment,
  fontSize,
}: P): JSX.Element {
  return (
    <div className="w-full">
      <div
        className={` ${alignment === 'right'
            ? 'text-right'
            : alignment === 'left'
              ? 'text-left'
              : 'text-center'
          } ${fontSize == 'big'
            ? 'text-[20px] leading-9 sm:text-[28px]'
            : fontSize == 'small'
              ? 'text-[18px] leading-7  sm:text-[22px]'
              : 'text-[20px] leading-9  sm:text-[28px]'
          }              
              font-['Mont-light']  text-darkGrey prose-ul:ml-5 prose-ul:list-disc`}
      >
        <ReactMarkdown>{contentDescription ?? ''}</ReactMarkdown>
      </div>
    </div>
  );
}
export default Description;
