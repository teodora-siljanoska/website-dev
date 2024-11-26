import React from 'react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/legacy/image';
import arrow from './assets/arrow.svg';
import { AccordionItemProps } from './AccordionComponent';

function AccordionArrowItem({
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
    <div className="w-full">
      <div className="mb-[5px] py-[10px]">
        <div className="flex  justify-items-center ">
          <h3 className="pr-[10px] text-[20px] text-purple sm:text-[24px]">
            <button
              onClick={btnOnClick}
              className="flex flex-row items-center justify-center gap-5 text-left font-['Mont-semibold']"
            >
              {title}
              <div
                onClick={btnOnClick}
                className={`${
                  isOpen ? '-rotate-180' : 'rotate-0'
                } mt-3 flex shrink-0 self-start  duration-500`}
              >
                <Image
                  alt="image"
                  onClick={btnOnClick}
                  src={arrow as string}
                  height={10}
                  width={20}
                  layout="fixed"
                />
              </div>
            </button>
          </h3>
        </div>
        <div
          style={{ height }}
          className="pt-5 text-[18px] font-['Mont-light'] text-darkGrey sm:text-[18px]"
        >
          {isOpen && (
            <div
              className={`pb-10 duration-1000 ${
                isOpen ? 'translate-y-0' : 'translate-y-[-100%]'
              }`}
              ref={contentRef}
            >
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AccordionArrowItem;
