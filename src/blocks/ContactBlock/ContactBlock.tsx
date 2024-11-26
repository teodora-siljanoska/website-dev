import { ComponentPageBlocksContact } from '@utils/types';
import React, { useState } from 'react';
import Button from '@components/Button';
import lines from './assets/lines.svg';
import Image from 'next/legacy/image';
import findMediaUrl from '@utils/findMediaUrl';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import ContactForm from '@components/ContactForm';
import Link from 'next/link';

function ContactBlock({
  preSalesInquiry,
  billingInquiry,
  technicalSupport,
}: ComponentPageBlocksContact): JSX.Element {
  const [showBlock, setShowBlock] = useState(false);

  return (
    <div className="mx-auto flex flex-col gap-[35px] smallest:max-w-[90%] md:max-w-[784px]">
      {preSalesInquiry && (
        <div className="relative overflow-hidden rounded-[11px] px-[44px] py-[26px] shadow-custom">
          <div className="flex items-center justify-between gap-10 ">
            <div className="flex flex-col gap-5 smallest:text-center md:text-left">
              <div className='font-["Mont-bold"] text-[26px] leading-[31px] text-purple'>
                {preSalesInquiry.titleContactFormCard}
              </div>
              <div className='whitespace-pre-line font-["Mont-light"] text-[16px] leading-[28px] text-darkGrey'>
                <ReactMarkdown>
                  {preSalesInquiry.descriptionContactFormCard ?? ''}
                </ReactMarkdown>
              </div>
            </div>
            {/* {!showBlock && (
              <div className="z-40">
                <Button
                  cta={preSalesInquiry.buttonContactFormCard ?? ''}
                  color="primary"
                  clickHandler={() => setShowBlock(!showBlock)}
                />
              </div>
            )} */}
          </div>

          <ContactForm
            emailTo={process.env.MAIL_CONTACT_US}
            buttonCta={preSalesInquiry.buttonContactFormCard ?? ''}
          />

          <div className="absolute bottom-[-8px] right-0 -z-10 ">
            <Image
              src={lines}
              width={lines.width ?? 507}
              height={lines.height ?? 183}
              alt="arrowLink"
              className="mx-auto"
            />
          </div>
        </div>
      )}
      {technicalSupport && (
        <div className="relative items-center justify-between gap-10 overflow-hidden rounded-[11px] px-[44px] py-[26px] shadow-custom smallest:grid smallest:text-center md:flex md:text-start">
          <div className="flex flex-col gap-5">
            <div className='font-["Mont-bold"] text-[26px] leading-[31px] text-darkTeal'>
              {technicalSupport.titleLinkCard}
            </div>
            <div className='whitespace-pre-line font-["Mont-light"] text-[16px] leading-[28px] text-darkGrey'>
              <ReactMarkdown>
                {technicalSupport.descriptionLinkContent ?? ''}
              </ReactMarkdown>
            </div>
          </div>
          <div className="z-40">
            <Link
              href={technicalSupport.buttonLinkContact ?? ''}
              legacyBehavior
            >
              <button
                type="submit"
                className="min-w-[240px] rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[40px] lg:py-[13px]"
              >
                {technicalSupport.buttonCtaContact ?? ''}
              </button>
            </Link>
            {/* <Button
              cta={technicalSupport.buttonCtaContact ?? ''}
              color="tertiary"
              link={technicalSupport.buttonLinkContact ?? ''}
              openInNewTab={true}
            /> */}
          </div>
          <div className="absolute bottom-[-8px] right-0 z-30">
            <Image
              src={lines}
              width={lines.width ?? 507}
              height={lines.height ?? 183}
              alt="arrowLink"
              className="mx-auto"
            />
          </div>
        </div>
      )}
      {billingInquiry && (
        <div className="relative items-center justify-between justify-items-center gap-10 overflow-hidden rounded-[11px] px-[44px] py-[26px] shadow-custom smallest:grid smallest:text-center md:flex md:text-start">
          <div className="flex flex-col gap-5">
            <div className='font-["Mont-bold"] text-[26px] leading-[31px] text-liliac'>
              {billingInquiry.titleLinkCard}
            </div>
            <div className='flex flex-col whitespace-pre-line font-["Mont-light"] text-[16px] leading-[28px] text-darkGrey prose-h6:text-xs prose-h6:leading-[28px]'>
              <ReactMarkdown>
                {billingInquiry.descriptionLinkContent ?? ''}
              </ReactMarkdown>
            </div>
          </div>
          <div className="z-40">
            <Link href={billingInquiry.buttonLinkContact ?? ''} legacyBehavior>
              <button
                type="submit"
                className="min-w-[220px] rounded-full border-2 border-purple bg-purple px-[35px]  py-[12px] text-base font-['Mont-semibold'] text-white transition  duration-500 hover:border-2 hover:border-purple hover:bg-transparent hover:text-purple lg:px-[40px] lg:py-[13px]"
              >
                {billingInquiry.buttonCtaContact ?? ''}
              </button>
            </Link>
            {/* <Button
              cta={billingInquiry.buttonCtaContact ?? ''}
              color="secondary"
              link={billingInquiry.buttonLinkContact ?? ''}
              openInNewTab={true}
            /> */}
          </div>
          <div className="absolute bottom-[-8px] right-0 z-30">
            <Image
              src={lines}
              width={lines.width ?? 507}
              height={lines.height ?? 183}
              alt="arrowLink"
              className="mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default ContactBlock;
