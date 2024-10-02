import React from "react";

const PendingPoolText = () => {
  return (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-6 md:p-12 rounded-lg flex flex-col gap-3 md:gap-5">
        <span className="text-[20px] md:text-[32px] font-bold text-white text-center md:text-left">
          What is a Pending Pool?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          The Pending Pool serves as the initial filter for all tokens emerging
          from the Solana blockchain. Upon a token&apos;s launch on the
          blockchain, the bot conducts a scan based on the predefined criteria
          within the Pending Pool settings. Tokens that satisfy these criteria
          are listed in the Pending Pool, awaiting the conditions necessary for
          an automatic purchase.
        </p>
      </div>
    </div>
  );
};

export default PendingPoolText;
