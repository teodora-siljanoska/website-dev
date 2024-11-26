import React from 'react';
import Button, { P as ButtonProps } from './Button';

export interface P {
  description: string;
  secondDescription: string;
  buttonProps?: ButtonProps;
  closePopUp?: () => void;
}

function PopUp({
  buttonProps,
  description,
  closePopUp,
  secondDescription,
}: P): JSX.Element {
  return (
    <div onClick={closePopUp} className=" modal-backdrop relative">
      <div className="fixed top-1/2 left-1/2  z-50 flex  w-[860px] -translate-x-1/2  -translate-y-1/2 justify-center rounded-2xl bg-white p-4">
        <div className=" w-full md:h-auto ">
          <div className="mt-32 text-center font-['Mont-semibold']">
            <p className=" text-2xl">{description}</p>
            <p className=" text-2xl">{secondDescription}</p>
          </div>
          <div className=" mt-12 mb-24 flex items-center justify-center space-x-2 rounded-b ">
            <Button
              cta={buttonProps?.cta}
              link={buttonProps?.link}
              color={buttonProps?.color ?? 'primary'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
