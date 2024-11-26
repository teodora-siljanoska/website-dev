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
        backgroundImage: `url("${thankYouImage.src as string}")`,
      }}
    >
      <div className="container mx-auto flex flex-col justify-end  gap-5 text-right">
        <div className="pt-[50vh] font-['Mont-bold'] text-[20px]  text-purple md:text-[50px]">
          THANK YOU
        </div>
        <div className="pb-[10vh] text-[50px]  text-black md:text-[50px]">
          FOR YOUR PURCHASE!
        </div>
        <Button cta="Take me home" color="primary" link="/vps" />
        <Button cta="Fill out domain info" color="secondary" link="/#" />
      </div>
    </div>
  );
};

export default Home;
