import React from 'react';
import Button, { P as ButtonProps } from './Button';

interface P {
  title: string;
  firstDescription: string;
  secondDescription: string;

  buttonProps: ButtonProps;
}

function CustomPlanCardTest({
  buttonProps,
  title,
  firstDescription,
  secondDescription,
}: P): JSX.Element {
  return (
    <div className="  flex flex-col items-center pl-7">
      <div className=" shadow h-[790px] w-[314px]  rounded-2xl bg-purple p-4 md:w-[364px]">
        <p className="  mb-64 mt-2 text-center text-2xl font-['Mont-bold'] text-lightTeal">
          {title}
        </p>
        <p className="text-center  text-xl font-['Mont-light'] text-white">
          {firstDescription}
        </p>
        <p className="mt-5 text-center text-xl font-['Mont-light'] text-white">
          {secondDescription}
        </p>

        <div className=" mt-[250px] mb-4 flex justify-center">
          <Button
            cta={buttonProps.cta}
            link={buttonProps.link}
            color={buttonProps.color}
          />
        </div>
      </div>
    </div>
  );
}

export default CustomPlanCardTest;
