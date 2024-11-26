import React from 'react';
import Head from 'next/head';

export default function DomainRenewalReminderNotice() {
  return (
    <>
      <Head>
        <title>Domain Renewal Reminder Notification</title>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6 px-2">
        <h1 className="font-['Mont-bold'] mt-4 text-[20px] text-purple md:text-[40px]">Domain Renewal Reminder Notification</h1>
        <div className="space-y-2">
          <h2 className="font-['Mont-bold'] text-[16px] text-darkTeal md:text-[30px]">Why am I receiving this email?</h2>
          <p className="text-sm leading-8 text-black md:text-[20px]">A new implementation of recent <abbr title="Expired Registration Recovery Policy (ERRP) which forms part of the 2013 Registrar Accreditation Agreement">ICANN rules</abbr> requires that domain registrants receive several direct notifications leading up to and immediately after the expiry of a <abbr title="global top-level domain">gTLD</abbr>.</p>
          <p className="text-sm leading-8 text-black md:text-[20px]">This email is sent to you on behalf of your domain provider (or reseller) by the ICANN accredited registrar who is sponsoring your domain registration, so please excuse the slightly strange email content - it&apos;s required to ensure full compliance with the rules.</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-['Mont-bold'] text-[16px] text-darkTeal md:text-[30px]">How can I renew my domain?</h2>
          <p className="text-sm leading-8 text-black md:text-[20px]">If your domain is normally renewed automatically, this should continue as normal. If you are unsure about this, please contact your domain service provider - the company you normally pay your renewal fees to - for confirmation.</p>
          <p className="text-sm leading-8 text-black md:text-[20px]"><em>This notification has no bearing on, or knowledge of, the auto-renew status of your domain</em>. It is simply sent relative to the current expiry date of your domain, regardless of any plans or settings already in place that will take care of its safe renewal.</p>
        </div>

        <div className="space-y-2">
          <h2 className="font-['Mont-bold'] text-[16px] text-darkTeal md:text-[30px]">What notifications will I receive?</h2>
          <p className="text-sm leading-8 text-black md:text-[20px]">You will receive similar notifications 26 days, 10 days, and 2 days prior to domain expiration.<br />If the domain is not renewed, you will also receive a notification 3 days after its expiry.</p>
        </div>
      </div>
    </>
  );
}
