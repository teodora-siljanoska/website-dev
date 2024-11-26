import React from 'react';
import Title from '../../components/Title';
import { ComponentPageBlocksLeftTitleRightDescription } from '@utils/types';
import ReactMarkdown from 'react-markdown';

function LeftTitleRightDescriptionBlock({
  title,
  description,
  descriptionTwo,
}: ComponentPageBlocksLeftTitleRightDescription): JSX.Element {
  return (
    <div className="mx-auto flex flex-col smallest:w-[90%] md:w-[77%] xlSpecial:w-[55%] 3xl:container">
      <div className="flex-col sm:flex">
        <div className="mb-[30px]">
          <Title cta={title ?? ''} alignment={'left'} fontSize={'Big'} />
        </div>
        <div className="justify-between smallest:grid md:flex md:gap-x-10">
          <div
            className={`${
              descriptionTwo
                ? 'md:max-w-[330px] xlSpecial:max-w-[403px]'
                : 'max-w-[536px]'
            } font-['Mont-book'] text-[18px] prose-p:mb-10 prose-strong:font-['Mont-semibold'] sm:basis-2/4 text-darkGrey`}
          >
            <ReactMarkdown>{description ?? ''}</ReactMarkdown>
          </div>
          {descriptionTwo && <div className="vl smallest:hidden md:flex" />}
          {descriptionTwo && (
            <div className="font-['Mont-book'] text-[18px] prose-p:mb-10 prose-strong:font-['Mont-semibold'] text-darkGrey sm:basis-2/4 md:max-w-[330px] xlSpecial:max-w-[403px]">
              <ReactMarkdown>{descriptionTwo ?? ''}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftTitleRightDescriptionBlock;
