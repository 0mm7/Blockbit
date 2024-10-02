import React from "react";

const AutoBuyText = () => {
  return (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          What is Auto-Buy?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          The Auto Buy functionality is configured to determine the precise
          conditions under which tokens from the Pending Pool are purchased.
          Once the specified criteria are fulfilled, the bot will automatically
          execute the purchase, and the token will be reflected in the open
          positions.
        </p>
      </div>
    </div>
  );
};

export default AutoBuyText;
