import React from "react";

const FeesText = () => {
  return (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          What are Fees?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          This section allows you to configure fee limits that will be applied
          to every transaction executed by the bot, ensuring optimal cost
          management.
        </p>
      </div>
    </div>
  );
};

export default FeesText;
