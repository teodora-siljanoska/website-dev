import React from 'react';
import type { NextPage } from 'next';
import thankYouImage from './assets/thankYouImage.svg';
import Button from '@components/Button';

const Home: NextPage = () => {
  return (
    <div
      className="mt-[-170px] h-[100vh] w-full bg-cover  bg-no-repeat"
      style={{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        backgroundImage: `url('${thankYouImage.src as string}')`,
      }}
    >
      <div className="container mx-auto flex flex-col justify-end  gap-5 text-right">
        <div className="pt-[50vh] font-['Mont-bold'] text-[20px] text-purple md:text-[40px]">
          Thank you for requesting<br />a 14 day free trial of Enscale
        </div>
        <div className="pb-[5vh] text-sm  leading-10 text-black md:text-[20px]">
          Check your inbox for an email with subject
          <br />
          <span className="font-['Mont-bold']">
            &quot;Your Enscale Trial Login Details&quot;
          </span>{' '}
          <br />
          to confirm your email and activate your account.
        </div>
        <div className="relative">
          <Button cta="Take me home" color="primary" link="/" />
        </div>
      </div>
    </div>
  );
};

export default Home;
