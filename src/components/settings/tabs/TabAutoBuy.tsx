import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import IMG_SOL from '@/assets/images/sol.png';
import InfoCard from "@/components/InfoCard";
import { SettingProps } from "@/types/setting";

const TabAutoBuy = (props: SettingProps) => {
  const setting = props.setting;
  const onChangeSettingValue = props.onChangeSettingValue;

  return (
    <>
      <div className="mt-[20px] flex">
        <div>
          <div className="flex items-center gap-1 py-1">
            <p className="text-[14px] font-bold text-[#FFFFFF]">
              Investment Per Asset
            </p>
            <div className="relative group">
              <Info size={20} color="white" className="cursor-pointer" />
              <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                <InfoCard
                  title="Investment Per Asset"
                  content="Specifies the investment amount allocated to each token trade."
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-[150px] h-[40px]  gap-1  rounded-[8px] items-center mt-[8px]">
            <div className="flex items-center gap-1 px-2 w-fit">
              <Image src={IMG_SOL} width={25} height={25} alt="image" />
            </div>
            <div className="h-6 w-[2px] bg-[#404040]"></div>

            <div className="w-full px-1">
              <input
                type="number"
                className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none  p-1.5 w-full"
                value={setting?.buy_initial_invest_sol}
                step={0.1}
                onChange={(e: any) => onChangeSettingValue(e, "buy_initial_invest_sol")}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 py-1 mt-[16px]">
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
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.buy_pooled_sol_min}
                onChange={(e: any) => onChangeSettingValue(e, "buy_pooled_sol_min")}
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
                value={setting?.buy_pooled_sol_max}
                onChange={(e: any) => onChangeSettingValue(e, "buy_pooled_sol_max")}
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
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                  Min%
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <div>
                <input
                  type="number"
                  className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                  value={setting?.buy_pooled_token_min}
                  onChange={(e: any) => onChangeSettingValue(e, "buy_pooled_token_min")}
                  max={100}
                />
              </div>
            </div>

            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex justify-between w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-12">
                  Max%
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.buy_pooled_token_max}
                onChange={(e: any) => onChangeSettingValue(e, "buy_pooled_token_max")}
                max={100}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 py-1 mt-[16px]">
            <p className="text-[14px] font-bold text-[#FFFFFF]">
              24 hours change %
            </p>
            <div className="relative group">
              <Info size={20} color="white" className="cursor-pointer" />
              <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                <InfoCard
                  title="24 hours change %"
                  content="Monitors the percentage change in asset value over 24 hours."
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 mt-[8px]">
            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-10">
                  Min%
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <div>
                <input
                  type="number"
                  className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                  value={setting?.buy_24h_change_min}
                  onChange={(e: any) => onChangeSettingValue(e, "buy_24h_change_min")}
                />
              </div>
            </div>

            <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex justify-between w-[174px] h-[40px] rounded-[8px] items-center">
              <div className="flex items-center gap-1">
                <span className="text-[#7A7A7A] text-sm font-medium rounded-l-[8px] ml-3 w-12">
                  Max%
                </span>
                <div className="h-6 w-[2px] bg-[#404040]"></div>
              </div>
              <input
                type="number"
                className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                value={setting?.buy_24h_change_max}
                onChange={(e: any) => onChangeSettingValue(e, "buy_24h_change_max")}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="grid gap-y-3 ml-[39px] mt-[94px]">
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

            <div className="w-[280px] h-[60px] pl-[20px] pr-[27px] py-6 rounded-[16px] bg-[#1A1A1A] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="LP Burned Audit"
                      content="Audit to verify if liquidity in the pool has been burned."
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">
                  LP Burned Audit
                </p>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting?.buy_lp_burned_audit === 1}
                  onChange={(e: any) => onChangeSettingValue(e, "buy_lp_burned_audit")}
                />
                <div
                  className="relative w-6 h-2 bg-gray-200 rounded-[4px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-1 after:start-[0px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
                ></div>
              </label>
              {/* <Image src={IMG_LOCK} alt="" width={16} height={16} className="" /> */}
            </div>
            <div className="w-[280px] h-[60px] pl-[20px] pr-[27px] py-6  rounded-[16px] bg-[#1A1A1A] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <Info size={20} color="white" className="cursor-pointer" />
                  <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
                    <InfoCard
                      title="Whale Check"
                      content="Check if 1 wallet holds more than 50% of the total supply (Not including the LP)"
                    />
                  </div>
                </div>

                <p className="text-[14px] font-bold text-[#FFFFFF]">
                  Whale Check
                </p>
              </div>
              <div className="bg-[#0F0F0F] border border-[#7A7A7A] flex  w-[80px] h-[40px] rounded-[8px] items-center">
                <div>
                  <input
                    type="number"
                    className=" text-white bg-transparent border-none outline-none hover:border-none py-1 px-2 w-full"
                    value={setting?.buy_whale_check_percent}
                    onChange={(e: any) => onChangeSettingValue(e, "buy_whale_check_percent")}
                  />
                </div>
              </div>
              {/* <Image src={IMG_LOCK} alt="" width={16} height={16} className="" /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabAutoBuy;
