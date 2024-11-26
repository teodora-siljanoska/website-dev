import React, { useEffect, useState } from 'react';
import Button from './Button';
import Image from 'next/legacy/image';
import thankContact from './assets/ty.png';

interface P {
  closeEmailForm: any;
}
function ContactThankYou({ closeEmailForm }: P): JSX.Element {
  return (
    <div className="fixed top-1/2 left-1/2 z-50 flex h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 flex-col justify-center overflow-hidden rounded-2xl bg-white p-5 text-center shadow-custom md:h-[500px] md:w-[50%]">
      <div className="font-['Mont-semibold'] text-[30px] text-purple">
        THANK YOU!
      </div>
      <div className="font-['Mont-book'] text-[30px] text-darkGrey">
        FOR SUBMITTING YOUR REQUEST!
      </div>
      <div className="pt-5 pb-16 font-['Mont-book'] text-[20px] text-darkGrey">
        A pre-sales consultant will contact you shortly.
      </div>
      <div className="z-10">
        <Button
          color="primary"
          cta="Close"
          clickHandler={() => {
            closeEmailForm(false);
          }}
        />
      </div>
      <div className="absolute inset-0 z-0 w-[100%]">
        <Image
          src={thankContact}
          width={900}
          height={500}
          alt="arrowLink"
          layout="fill"
          className="h-full w-full"
          style={{
            width: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
          }}
        />
      </div>
    </div>
  );
}
export default ContactThankYou;
