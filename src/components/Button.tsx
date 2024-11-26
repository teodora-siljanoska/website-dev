import Link from 'next/link';
import React from 'react';

export interface P {
  cta?: string;
  link?: string;
  clickHandler?: (e: any) => void;
  color: 'primary' | 'secondary' | 'tertiary' | 'quaternary';
  openInNewTab?: boolean;
}

function Button({
  cta,
  color,
  link,
  clickHandler,
  openInNewTab,
}: P): JSX.Element {
  let style = '';

  switch (color) {
    case 'primary':
      style = `rounded-full  border-2 border-purple bg-purple  px-[35px] py-[12px]  text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[40px] lg:py-[13px]`;
      break;
    case 'secondary':
      style = `  justify-center  px-[42px]  py-[12px]  text-purple hover:text-white transition  duration-500 hover:bg-purple hover:border-2 border-purple   hover:border-purple border-2 bg-white rounded-full`;
      break;
    case 'tertiary':
      style = ` justify-center  px-[42px]  py-[12px]  text-white hover:text-white transition  duration-500 hover:bg-lightTeal		 hover:border-2 border-darkTeal   hover:border-lightTeal border-2 bg-darkTeal rounded-full`;
      break;
    case 'quaternary':
      style = `  justify-center  px-[42px]  py-[12px]  text-darkTeal hover:text-white transition  duration-500 hover:bg-darkTeal hover:border-2 border-darkTeal   hover:border-darkTeal border-2 bg-white rounded-full`;
      break;
    default:
      null;
      break;
  }
  const linkProps = openInNewTab
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <div className="my-3 font-['Mont-semibold'] sm:text-base text-xs">
      {!clickHandler && !link && <p className={style}>Error</p>}
      {clickHandler && (
        <button
          type="button"
          className={`whitespace-nowrap ${style}`}
          onClick={clickHandler}
        >
          {cta}
        </button>
      )}
      {link && (
        <a href={link} className={`${style} whitespace-nowrap`} {...linkProps}>
          {cta}
        </a>
      )}
    </div>
  );
}
export default Button;
