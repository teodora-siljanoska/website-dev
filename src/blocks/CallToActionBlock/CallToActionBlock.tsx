import React from 'react';
// import { ComponentPageBlocksCallToAction } from '@utils/types';
import Button, { P as ButtonProps } from '@components/Button';
import ReactMarkdown from 'react-markdown';

interface P {
  title: string;
  description: string;
  buttons: ButtonProps[];
}

function CallToActionBlock({ buttons, title, description }: P): JSX.Element {
  return (
    <div className="h-full w-full bg-darkTeal sm:py-0">
      <div className="text-align-center container mx-auto flex w-[90%] flex-col justify-between gap-y-9 sm:py-14 py-28 md:w-[90%] md:flex-row md:items-center md:gap-y-0 xlSpecial:w-[77%]">
        <div className="basis-1/2">
          <h3 className="font-['Mont-regular'] text-2xl text-white sm:text-3xl">
            {title}
          </h3>
          <div className="mt-2 text-lg lg:w-[80%] ">
            <div className="font-['Mont-light'] text-white prose-strong:font-['Mont-bold'] prose-ul:list-disc">
              <ReactMarkdown>{description ?? ''}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className=" flex basis-1/2 flex-col gap-2 md:items-end">
          {buttons.map((item: ButtonProps, index: number) => (
            <div key={index}>
              <Button cta={item.cta} link={item.link} color={'primary'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CallToActionBlock;
