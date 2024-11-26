import React from 'react';
import Image from 'next/legacy/image';
import cart from './assets/cart.svg';
import Button from '@components/Button';

function EmptyCart(): JSX.Element {
  return (
    <div className="container mx-auto mb-28 flex flex-col items-center">
      <div className="mb-10 flex justify-center">
        <Image src={cart as string} alt="down-arrow" />
      </div>
      <div className="mb-3 font-['Mont-bold'] text-4xl text-purple">
        Your cart is empty
      </div>
      <div className="font-['Mont-regular'] text-lg text-darkGrey">
        ...but our website is full of limitless options.
      </div>
      <div className="mb-10 font-['Mont-regular'] text-lg text-darkGrey">
        Start exploring now!
      </div>
      <div>
        <Button cta="Return to Home" color="secondary" link="/" />
      </div>
    </div>
  );
}
export default EmptyCart;
