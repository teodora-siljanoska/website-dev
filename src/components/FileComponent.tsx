import React from 'react';
import Image from 'next/legacy/image';
import iconPlaceholder from './assets/icon.png';
import Link from 'next/link';

export interface P {
  title: string;
  link: string;
}

function FileComponent({ title, link }: P): JSX.Element {
  return (
    <div className="flex flex-row break-all	">
      <div className="shrink-0">
        <Image alt="image" src={iconPlaceholder.src} height={56} width={56} />
      </div>
      <div className="flex flex-col pl-5">
        <h3 className="mt-2 font-['Mont-regular'] text-[22px] text-darkGrey worddd">
          {title}
        </h3>
        <Link
          href={`${
            process.env.NEXT_PUBLIC_STRAPI_URI ?? 'http://localhost:1337'
          }${link}`}
          passHref
          className="text-left text-lg  font-medium text-liliac"
          target="_blank"
          rel="noreferrer"
        >
          Read PDF
        </Link>
      </div>
    </div>
  );
}

export default FileComponent;
