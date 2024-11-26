import { ComponentPageBlocksDescription } from '@utils/types';
import React from 'react';
import ReactMarkdown from 'react-markdown';

function DescriptionBlock({
  cta,
  alignment,
  fontSize,
}: ComponentPageBlocksDescription): JSX.Element {
  return (
    <div className="container m-auto flex w-[90%] lg:w-[80%]">
      <div className="w-full">
        <div
          className={` ${
            alignment === 'right'
              ? 'text-right'
              : alignment === 'left'
              ? 'text-left'
              : 'text-center'
          } ${
            fontSize == 'Big'
              ? 'text-[20px] leading-9 sm:text-[28px]'
              : fontSize == 'Small'
              ? 'text-[18px] leading-6 sm:text-[22px]'
              : 'text-[20px] leading-9  sm:text-[28px]'
          }              
          text-balance whitespace-pre-line font-['Mont-light'] text-darkGrey prose-h3:font-['Mont-regular'] prose-h3:text-[28px] prose-strong:font-['Mont-bold'] prose-ul:ml-5 prose-ul:list-disc`}
        >
          <ReactMarkdown>{cta ?? ''}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
export default DescriptionBlock;
