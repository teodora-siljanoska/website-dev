import React from 'react';
import thankYouImage from './thank-you/assets/thankYouImage.svg';
import Button from '@components/Button';
import Head from 'next/head';

export default function Custom404() {
  return (
    <div>
    <Head>
        <title>404 Page not found</title>
    </Head>
    <div
        className="mt-[-170px] h-[106vh] w-full bg-cover bg-no-repeat  2xl:h-[125]"
        style={{
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            backgroundImage: `url('${thankYouImage.src}')`,
        }}
    >
        <div className="container mx-auto flex flex-col justify-end text-right">
            <div className="pt-[70vh] font-['Mont-bold'] text-[20px] text-purple md:text-[40px] lg:pt-[50vh]">
                Not found
            </div>
            <div className="pb-[5vh] text-sm leading-10 text-black md:text-[20px]">
                Sorry, the page you are looking for doesn&apos;t exist
            </div>
            <div className="relative">
                <Button cta="Take me home" color="primary" link="/" />
            </div>
        </div>
    </div>
</div>
  );
}
