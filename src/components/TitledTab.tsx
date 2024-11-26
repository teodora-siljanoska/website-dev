import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface P {
  title: string;
  desc: string;
}

function TitleTab({ title, desc }: P): JSX.Element {
  return (
    <div className="flex flex-col gap-2 pb-[28px] text-left sm:flex-row sm:gap-5 sm:pb-0">
      <div className="shrink-0 grow-0 text-lg font-['Mont-semibold'] sm:basis-2/4 sm:text-xl md:basis-1/3">
        {title}
      </div>
      <div className="shrink-0 grow-0 basis-2/4 pr-1 font-['Mont-regular'] text-lg sm:text-xl md:basis-2/3">
        <ReactMarkdown>{desc}</ReactMarkdown>
      </div>
    </div>
  );
}
export default TitleTab;
