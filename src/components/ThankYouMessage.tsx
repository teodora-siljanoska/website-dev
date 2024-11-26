import React from 'react';

const ThankYouMessage = () => {
  return (
    <div className="glow-form fixed top-1/2 left-1/2 z-50 box-border flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center rounded-2xl bg-white px-20 md:h-[700px] md:w-[1155px] ">
      <p className="mt-4 text-center font-['Mont-regular'] text-[32px] text-purple">
        Thank You for submitting your request. A pre-sales consultant will
        contact you shortly.
      </p>
    </div>
  );
};

export default ThankYouMessage;
