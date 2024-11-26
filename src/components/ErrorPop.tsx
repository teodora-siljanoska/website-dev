import React, { useEffect, useState } from 'react';
import Button from './Button';
import Image from 'next/legacy/image';
import plus from './assets/plus-button.svg';
import x from './assets/x.svg';
import { useRouter } from 'next/router';
import RegisterwithSteps from '@layout/Auth/RegisterwithSteps';
import Register from '@layout/Auth/Register';
import Ribbons from './assets/opacity-ribbons.svg';

interface P {
  closeError?: any; // Define the prop typ
  message?: any;
  emailError?: any;
  slug?: any;
}

const loginUrl = new URL(process.env.NEXT_PUBLIC_LOGIN_URL?.toString() ?? '');

function ErrorForm({ closeError, message, emailError }: P): JSX.Element {
  return (
    <div
      className=" glow-form fixed top-1/2 left-1/2 z-50 box-border h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white py-[150px] md:h-auto max-w-[70%]"
      style={{
        backgroundImage: `url("${Ribbons.src as string}")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="grid justify-items-center	">
        <label className='mb-[10px] text-center font-["Mont-semibold"] text-[28px] text-[#9D64A9]'>
          {message}
        </label>
        {emailError === true ? (
          <Button color="primary" cta="Okay" link="/shopping-cart" />
        ) : (
          <Button color="primary" cta="Okay" clickHandler={closeError} />
        )}
      </div>
    </div>
  );
}

export default ErrorForm;
