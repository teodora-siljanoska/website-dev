import React, { useState } from 'react';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import team from './assets/team.png';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ComponentPageBlocksMeetTheTeam } from '@utils/types';
import { useMediaQuery } from 'react-responsive';

function MeetTheTeamBlock({
  backgroundColor,
  bioOfEmployee,
  imageOfEmployee,
  nameOfEmployee,
  positionOfEmployee,
  imagePosition,
}: ComponentPageBlocksMeetTheTeam): JSX.Element {
  const [expanded, setExpanded] = useState(false);

  const toggleBioVisibility = () => {
    setExpanded(!expanded);
  };

  let bgColor = '';
  switch (backgroundColor) {
    case 'lilac':
      bgColor = `bg-liliac/5`;
      break;
    case 'teal':
      bgColor = `bg-darkTeal/[2%]`;
      break;
    case 'white':
      bgColor = `bg-white`;
      break;
    default:
      bgColor = `bg-white`;
      break;
  }

  // Split the bio content by lines
  const bioLines = bioOfEmployee?.split('\n');
  const firstBlankLineIndex = bioLines?.findIndex((line) => line.trim() === '');
  const isSmall = useMediaQuery({ maxWidth: 2200 });

  return (
    <div className={` ${bgColor} py-[25px] sm:py-[10px]`}>
      <div
        className={` ${imagePosition === 'left'
          ? 'flex-col sm:flex-row'
          : 'flex-col  sm:flex-row-reverse'
          } container mx-auto my-[27px] flex justify-between gap-[35px] md:w-[90%]  xlSpecial:w-[70%]`}
      >
        <div className="flex shrink-0 flex-col items-center justify-center gap-[5px] ">
          <Image
            src={findMediaUrl(imageOfEmployee) ?? team}
            height={isSmall ? 316 : 380}
            width={isSmall ? 316 : 380}
            layout="fixed"
            className="rounded-full"
            alt="performance"
          />
          <div className='text-center font-["Mont-semibold"] text-xl text-darkGrey'>
            {nameOfEmployee}
          </div>
          {positionOfEmployee && (
            <div className='text-center font-["Mont-regular"] text-base text-darkTeal'>
              {positionOfEmployee}
            </div>
          )}
        </div>
        <div className="flex items-center whitespace-pre-line text-center font-['Mont-regular'] text-base leading-[24px] text-darkGrey sm:text-left 3xl:text-xl">
          <div>
            <ReactMarkdown>{bioOfEmployee ?? ''}</ReactMarkdown>
            {/* {firstBlankLineIndex && firstBlankLineIndex >= 0 && (
              <div
                onClick={toggleBioVisibility}
                className='mt-4 cursor-pointer font-["Mont-semibold"] text-lg text-purple'
              >
                {expanded ? 'Show less' : 'Read more'}
              </div>
            )} */}
          </div>
          {/* <div>
            <ReactMarkdown>
              {(expanded
                ? bioOfEmployee
                : bioLines?.slice(0, firstBlankLineIndex).join('\n')) ?? ''}
            </ReactMarkdown>
            {firstBlankLineIndex && firstBlankLineIndex >= 0 && (
              <div
                onClick={toggleBioVisibility}
                className='mt-4 cursor-pointer font-["Mont-semibold"] text-lg text-purple'
              >
                {expanded ? 'Show less' : 'Read more'}
              </div>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default MeetTheTeamBlock;
