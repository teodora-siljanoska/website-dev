import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/legacy/image';
import closePlus from './assets/closePlus.svg';
import openPlus from './assets/openPlus.svg';
import { AccordionItemProps } from './AccordionComponent';
import ReactMarkdown from 'react-markdown';

function AccordionPlusItem({
  title,
  description,
  isOpen,
  btnOnClick,
}: AccordionItemProps): JSX.Element {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current!;

      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div className="w-full ">
      <div className="mb-4 mt-6 flex justify-items-center">
        <div
          onClick={btnOnClick}
          className={`flex cursor-pointer flex-col  items-start pr-3   ${
            isOpen ? 'items-start' : 'items-center'
          }`}
        >
          <Image
            alt="image"
            src={isOpen ? (closePlus as string) : (openPlus as string)}
            height={36}
            width={36}
            layout="fixed"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3
            onClick={btnOnClick}
            className=" text-left font-['Mont-regular'] text-xl text-darkGrey sm:text-2xl"
          >
            <button className="text-left">{title}</button>
          </h3>
          {isOpen && (
            <div style={{ height }} className=" mt-4 text-left text-lg">
              <div
                ref={contentRef}
                className="prose-u:underline whitespace-pre-line font-['Mont-light'] text-darkGrey prose-a:text-liliac prose-blockquote:text-lightTeal prose-strong:font-['Mont-semibold'] prose-pre:text-lightTeal prose-ul:ml-5 prose-ul:list-disc"
              >
                <ReactMarkdown>{description}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccordionPlusItem;
