import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import IMG_LOCK from '@/assets/images/lock.png';
import InfoCard from "@/components/InfoCard";
import { SettingProps } from "@/types/setting";

const TabPendingPool = (props: SettingProps) => {
  const setting = props.setting;
  const onChangeSettingValue = props.onChangeSettingValue;
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: 1, label: "1 Min", locked: false },
    { value: 5, label: "5 Min", locked: false },
    { value: 15, label: "15 Min", locked: false },
    { value: 30, label: "30 Min", locked: false },
    { value: 1 * 60, label: "1 H", locked: false },
    { value: 3 * 60, label: "3 H", locked: false },
    { value: 12 * 60, label: "12 H", locked: false },
    { value: 24 * 60, label: "24 H", locked: false },
  ];

  const displayLiveMins = () => {
    if (setting?.pending_live_mins! < 60) {
      return `${setting?.pending_live_mins} Min`;
    }
    const pending_live_hours: any = setting?.pending_live_mins! / 60;

    return `${parseInt(pending_live_hours)} H`;
  }

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (e: any, option: any) => {
    if (!option.locked) {
      onChangeSettingValue(e, 'pending_live_mins', option.value);
      setIsOpen(false);
    }
  };
  return (
    <>
      <div className="mt-[20px] flex">
        <div>
          <div className="flex items-center gap-1 py-1">
            <p className="text-[14px] font-bold text-[#FFFFFF]">Pooled SOL</p>
            <div className="relative group">
              <Info size={20} color="white" className="cursor-pointer" />
              <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                <InfoCard
                  title="Pooled SOL"
                  content="Monitors the amount of Solana in the trading pool."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-[8px]">
            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex justify-between w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3">
                  Min
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <input
                type="number"
                className="text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.pending_pooled_sol_min}
                onChange={(e: any) => onChangeSettingValue(e, "pending_pooled_sol_min")}
              />
            </div>
            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex justify-between w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3">
                  Max
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.pending_pooled_sol_max}
                onChange={(e: any) => onChangeSettingValue(e, "pending_pooled_sol_max")}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 py-1 mt-[16px]">
            <p className="text-[14px] font-bold text-[#FFFFFF]">Pooled Token</p>
            <div className="relative group">
              <Info size={20} color="white" className="cursor-pointer" />
              <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                <InfoCard
                  title="Pooled Token"
                  content="Checks the amount of the token in the trading pool."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-[8px]">
            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-12">
                  Min %
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <div>
                <input
                  type="number"
                  className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                  value={setting?.pending_pooled_token_min}
                  onChange={(e: any) => onChangeSettingValue(e, "pending_pooled_token_min")}
                  max={100}
                />
              </div>
            </div>

            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex justify-between w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-12">
                  Max %
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.pending_pooled_token_max}
                onChange={(e: any) => onChangeSettingValue(e, "pending_pooled_token_max")}
                max={100}
              />
            </div>
          </div>
        </div>

        <div className="ml-[39px]">
          <div className="flex items-center gap-1 py-1">
            <p className="text-[14px] font-bold text-[#FFFFFF]">Premium Audits</p>
            <div className="relative group">
              <Info size={20} color="white" className="cursor-pointer" />
              <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                <InfoCard
                  title="Premium Audits"
                  content="High-level audits to verify token legitimacy before purchasing."
                />
              </div>
            </div>
          </div>

          <div className="grid gap-y-3 mt-[8px]">
            <div className="w-[280px] rounded-[16px] bg-[#1A1A1A] h-[60px] flex justify-between gap-12  pl-[20px] pr-[27px] py-6 items-center">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="Can Freeze Audit"
                      content="Ensures the token founder can't freeze trading to prevent scams."
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">
                  Can Freeze Audit
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting?.pending_can_freeze_audit === 1}
                  onChange={(e: any) => onChangeSettingValue(e, "pending_can_freeze_audit")}
                />
                <div
                  className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
                ></div>
              </label>
            </div>

            <div className="w-[280px] h-[60px] pl-[20px] pr-[27px] py-6 gap-12 rounded-[16px] bg-[#1A1A1A]  flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="Can Mint Audit"
                      content="Checks if token founders can mint more tokens and sell them."
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">
                  Can Mint Audit
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting?.pending_can_mint_audit === 1}
                  onChange={(e: any) => onChangeSettingValue(e, "pending_can_mint_audit")}
                />
                <div
                  className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
                ></div>
              </label>
            </div>
            <div className="w-[280px] h-[60px] pl-[20px] pr-[27px] py-6  rounded-[16px] bg-[#1A1A1A] flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="Watch For"
                      content="Sets the duration to monitor a token before the app cancels a potential trade."
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">Watch For</p>
              </div>

              <div className="relative inline-block text-left ">
                <div>
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="inline-flex justify-between w-full rounded-md shadow-sm px-4 py-2 bg-[#333333] text-sm font-medium text-[#C0C0C0] focus:outline-none"
                  >
                    {displayLiveMins()}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-[100px] rounded-md shadow-lg bg-[#333333] text-[#C0C0C0] ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {options.map((option) => (
                        <button
                          key={option.value}
                          onClick={(e) => handleSelect(e, option)}
                          className={`${option.locked ? "text-[#C0C0C0]" : "text-[#C0C0C0]"
                            } group flex justify-between items-center px-4 py-2 text-sm font-bold w-full`}
                          disabled={option.locked}
                        >
                          {option.label}
                          {option.locked && (
                            <Image src={IMG_LOCK} alt="" width={16} height={16} className="" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabPendingPool;
