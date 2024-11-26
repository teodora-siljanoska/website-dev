/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from 'react';
import Image from 'next/legacy/image';
import exitButton from './assets/exit.svg';
import LoginCard from './LogInCard';
import RegisterCard from './RegisterCard';

interface P {
  closePopUp: () => void;
  openRegister: () => void;
}

const Login = ({ openRegister, closePopUp }: P) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section className="fixed top-1/2 left-1/2 z-50 h-[700px] w-[1155px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-[#E1E1E1]  bg-[#FFFFFF] shadow-custom">
      <div className="mt-[40px] place-items-center text-center text-2xl">
        <strong className="text-purple">Hey, psst!</strong> Do we know
        eachother?
      </div>
      <div className="mt-[30px] flex  flex-row	place-content-center	text-xl font-medium">
        <p
          className="cursor-pointer rounded-tl-2xl p-8"
          onClick={() => setActiveTab(1)}
          style={{
            color: activeTab ? '#552B71' : 'black',
            fontWeight: activeTab ? '700' : '500',
            backgroundColor: activeTab ? '#f5eff6' : 'white',
          }}
        >
          I&apos;m new here!
        </p>
        <p
          className="cursor-pointer rounded-tr-2xl p-8"
          onClick={() => setActiveTab(0)}
          style={{
            color: activeTab ? 'black' : '#552B71',
            fontWeight: activeTab ? '500' : '700',
            backgroundColor: activeTab ? 'white' : '#f5eff6',
          }}
        >
          Yes, I have an account!
        </p>
      </div>
      <section className="shadow fixed top-[400px] left-1/2 z-50 h-[60%] w-[819px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2  border-[#f5eff7] bg-[#f5eff6]">
        {activeTab === 0 ? (
          <LoginCard closePopUp={closePopUp} />
        ) : (
          <RegisterCard openRegister={openRegister} closePopUp={closePopUp} />
        )}
      </section>
      <div
        className="absolute top-[4.57%] right-[2.94%] cursor-pointer font-extrabold text-purple"
        onClick={closePopUp}
      >
        <Image alt="exit" src={exitButton.src} height={25} width={25} />
      </div>
    </section>
  );
};

export default Login;
