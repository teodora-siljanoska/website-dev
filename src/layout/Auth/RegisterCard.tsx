import React from 'react';

interface P {
  closePopUp: () => void;
  openRegister: () => void;
}

const RegisterCard = ({ openRegister, closePopUp }: P) => {
  const handleRegister = () => {
    closePopUp();
    openRegister();
  };

  return (
    <div className="mt-40 flex flex-col items-center">
      <h1 className="pb-[40px] text-xl	font-['Mont-semibold']">
        Get started for free!
      </h1>
      <input
        onClick={handleRegister}
        type="submit"
        className="h-[49px] w-[148px] cursor-pointer rounded-full border-2 border-purple bg-purple text-[18px] text-white duration-300 hover:bg-white hover:text-purple"
        value="Sign up"
      />
    </div>
  );
};

export default RegisterCard;
