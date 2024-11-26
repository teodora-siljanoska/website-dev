import React, { useCallback, useEffect } from 'react';
import Image from 'next/legacy/image';
import logo from './assets/logo.svg';
import facebookImage from './assets/fb.svg';
import linkedinImage from './assets/linkedin.svg';
import twitterImage from './assets/twitter.svg';
import youtube from './assets/youtube.svg';
import Link from 'next/link';
import { GET_FOOTER } from '@utils/queries';
import { FooterEntity, FooterEntityResponse, HeaderEntity } from '@utils/types';
import { useLazyQuery } from '@apollo/client';
import findMediaUrl from '@utils/findMediaUrl';
import ReactMarkdown from 'react-markdown';

export interface FooterInterface {
  footer: {
    data: FooterEntity;
  };
}
interface P {
  footer: FooterEntity | undefined;
  header: HeaderEntity | undefined;
}

const FooterBlock = ({ footer, header }: P): JSX.Element => {
  return (
    <section className="w-full bg-darkGrey px-4">
      <div className="container mx-auto flex w-full flex-col">
        <div className=" flex w-full flex-col items-center justify-between gap-x-10 py-[50px] md:flex-row md:items-start">
          <Link href="/" className="cursor-pointer">
            <Image
              unoptimized
              src={findMediaUrl(footer?.attributes?.footerLogo) ?? logo.src}
              alt=" logo"
              width={110}
              height={109.36}
              className=" cursor-pointer"
            />
          </Link>
          <div className=" gap-x-5 md:grid md:grid-cols-2 md:gap-x-10 md:gap-y-8 heroBreakThree:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {header?.attributes?.tabHeader?.map((item, index) => (
              <div
                key={index}
                className="mt-10 flex flex-col  gap-y-4 text-center text-[15px] text-white md:mt-0 md:text-left"
              >
                <div className=" font-['Mont-semibold']">
                  {item?.titleTabHeader}
                </div>
                <div className="flex flex-col  gap-y-2 font-['Mont-regular']">
                  {item?.optionsTabHeader?.map((option, idx) => (
                    <Link key={idx} href={option?.linkOptionTab ?? '/'}>
                      {option?.titleOptionTab}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="mt-10 flex flex-col  gap-y-4 text-center text-[15px] text-white md:mt-0 md:text-left">
              <div className="font-['Mont-semibold']">
                <div>Help & Support</div>
              </div>
              <div className="flex flex-col gap-y-2">
                {footer?.attributes?.helpAndSupport?.map((item, index) => (
                  <div key={index} className="font-['Mont-regular']">
                    <Link href={item?.linkFooter ?? '/'}>
                      {item?.labelFooter}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" self-center font-['Mont-semibold'] text-[20px] text-white md:self-start">
          Follow us
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-y-10 pb-36 pt-5 md:flex-row md:items-start md:gap-y-0 md:pt-5 ">
          <div className="flex gap-5">
            {footer?.attributes?.socialMedia?.map((item, index) => (
              <Link
                key={index}
                href={item?.linkSocialMedia ?? '/'}
                target="_blank"
              >
                <Image
                  unoptimized
                  src={findMediaUrl(item?.logoSocialMedia) ?? facebookImage.src}
                  alt=" logo"
                  width={38}
                  height={38}
                  className="cursor-pointer"
                />
              </Link>
            ))}
          </div>
          <div
            className="flex flex-col text-center 
          font-['Mont-light']  text-lg  text-white prose-a:cursor-pointer md:flex-row md:text-start"
          >
            <ReactMarkdown>{footer?.attributes?.present ?? ''}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBlock;
