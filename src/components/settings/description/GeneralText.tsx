import React from "react";

const GeneralText = () => {
  return (
    <div className="w-[100px] md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          General Settings
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          In the General Settings section, you have the ability to personalize
          your profile picture, define the operating hours of the application,
          and manage the primary on/off switch for the Bot.
        </p>
      </div>
    </div>
  );
};

export default GeneralText;
