import React from 'react';
import type { NextPage } from 'next';
import Button from '@components/Button';

const Home: NextPage = () => {
  return (
    <div className="container mx-auto flex flex-col gap-5 text-center">
      <div className="pt-[25vh] font-['Mont-bold'] text-[32px]  text-liliac md:text-[50px]">
        Hey, wait!
      </div>
      <div className="pb-[10vh] text-[28px]  text-black md:text-[50px]">
        Are you sure , you want to cancel your order?
      </div>
      <div className="flex justify-center gap-5">
        <Button cta="No, I want to stay" color="secondary" link="/vps" />
        <Button cta="Yes, I'm sure" color="primary" link="/vps" />
      </div>
    </div>
  );
};

export default Home;
