import React from 'react';
import Image from 'next/legacy/image';
import check from './assets/check.svg';
import cross from './assets/cross.svg';
import ReactMarkdown from 'react-markdown';
import Button from './Button';

export interface P {
  cta?: string;
  description?: string;
  checking?: 'check' | 'cross' | 'empty';
  size?: 'card' | 'features' | 'packageCard' | 'vps';
  ctaButton?: string;
  linkButton?: string;
  theme?: 'simple' | 'secondary' | 'quaternary';
}

function CheckListItem({
  cta,
  description,
  checking,
  size,
  ctaButton,
  linkButton,
  theme,
}: P): JSX.Element {
  if (size === 'card') {
    return (
      <div className="flex pr-2">
        {checking != 'empty' && (
          <span className="shrink-0">
            <Image
              alt="image"
              src={checking === 'check' ? (check as string) : (cross as string)}
              height={14}
              width={13.35}
              layout="fixed"
            />
          </span>
        )}

        <div
          className={`${
            checking != 'empty' ? 'pl-[2px] text-left' : 'text-left '
          } text-[16px] text-darkGrey `}
        >
          <ReactMarkdown>{cta ?? ''}</ReactMarkdown>
        </div>
      </div>
    );
  } else if (size === 'vps') {
    return (
      <div className="flex pr-2">
        {checking != 'empty' && (
          <span className="shrink-0">
            <Image
              alt="image"
              src={checking === 'check' ? (check as string) : (cross as string)}
              height={14}
              width={13.35}
              layout="fixed"
            />
          </span>
        )}
        <span className="grid">
          <div
            className={`${
              checking != 'empty' ? 'pl-[2px] text-left' : 'text-center '
            } font-['Mont-semibold'] text-[14px] text-darkGrey`}
          >
            <ReactMarkdown>{cta ?? ''}</ReactMarkdown>
          </div>
          <div className="whitespace-pre-line font-['Mont-regular'] text-[12px] text-[#696969]">
            <ReactMarkdown>{description ?? ''}</ReactMarkdown>
          </div>
        </span>
      </div>
    );
  } else if (size === 'features') {
    return (
      <div className="flex gap-2">
        {checking != 'empty' ? (
          <div>
            <Image
              alt="image"
              src={checking === 'check' ? (check as string) : (cross as string)}
              height={30}
              width={30}
              layout="fixed"
            />
          </div>
        ) : (
          ''
        )}
        <div className="flex w-full flex-col gap-2">
          <span
            className={`${
              checking === 'empty'
                ? `${
                    theme === 'secondary' ? 'text-liliac' : 'text-darkGrey'
                  }  font-['Mont-bold']`
                : 'text-darkGrey'
            } text-left text-[18px] lg:text-[21px] `}
          >
            {cta}
          </span>
          {checking === 'empty' && (
            <hr
              className={`${
                theme === 'secondary'
                  ? 'border-t-[6px] border-purple'
                  : 'border-t-[6px] text-darkTeal'
              }  `}
            />
          )}

          {description && (
            <div className="whitespace-pre-line  text-left text-lg text-darkGrey prose-ul:ml-5 prose-ul:list-disc            ">
              <ReactMarkdown>{description ?? ''}</ReactMarkdown>
            </div>
          )}

          {ctaButton && (theme === 'secondary' || theme === 'quaternary') ? (
            <Button cta={ctaButton} link={linkButton} color={theme} />
          ) : ctaButton ? (
            <Button cta={ctaButton} link={linkButton} color="tertiary" />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  } else if (size === 'packageCard') {
    return (
      <div className="flex  w-full flex-row  items-start ">
        <Image
          alt="image"
          src={checking === 'check' ? (check as string) : (cross as string)}
          height={13.75}
          width={13.1}
        />

        <span className="flex w-full  pl-[4px]  text-base  text-darkGrey">
          <ReactMarkdown>{cta ?? ''}</ReactMarkdown>
        </span>
        {description && (
          <div
            className="whitespace-pre-line  text-left text-lg text-darkGrey prose-ul:ml-5 prose-ul:list-disc
          "
          >
            <ReactMarkdown>{description ?? ''}</ReactMarkdown>
          </div>
        )}
      </div>
    );
  }

  return <div>Error!</div>;
}

export default CheckListItem;
