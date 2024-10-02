import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import Image from 'next/image'
import React from 'react'

import IMAGE_STAR from '@/assets/images/star.svg';
import IMAGE_BHOOT from '@/assets/images/bhoot.svg';
import IMAGE_TABLEIMG from '@/assets/images/landing1.png';
import IMAGE_TABLE from '@/assets/images/landing2.jpg';
import IMAGE_TABLEIMG1 from '@/assets/images/landing3.jpg';
import IMAGE_DISCORDWHITE from '@/assets/images/discordwhite.svg';
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function Home() {
  const router = useRouter();

  const { publicKey } = useWallet();
  const [agreeTerms, setAgreeTerms] = useState(true);
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const onClickAgreeTerms = () => {
    setAgreeTerms(!agreeTerms);
  }

  useEffect(() => {
    if (publicKey) {
    }
  }, [publicKey]);

  const onClickWalletConnect = useCallback(() => {
    if (!connected) {
      setVisible(true); // Manually trigger the wallet connection modal
    } else {
      console.log('Wallet already connected');
    }
  }, [connected, setVisible]);

  return (
    <>
      <div
        className="relative w-full h-full overflow-x-hidden custom-scrollbar"
      
      >
        {/* Circle */}
        <div
          className="absolute border border-[#55555533] rounded-full opacity-100 z-0"
          style={{
            width: '623px',
            height: '623px',
            top: '1738px',
            left: '648px',
          }}
        ></div>

        <div
          className="absolute border border-[#55555533] rounded-full opacity-100 z-0"
          style={{
            width: '1032px',
            height: '1032px',
            top: '1499px',
            left: '444px',
          }}
        ></div>

        <div
          className="absolute border border-[#55555533] rounded-full opacity-100 z-0"
          style={{
            width: '1484px',
            height: '1484px',
            top: '1268px',
            left: '218px',
          }}
        ></div>

        <div className='flex justify-center relative z-10'>
          <div className='mt-[105px] px-24 w-[1048px]'>
          <div className='text-[55px] xss:text-[25px] xs:text-[20px]   text-center font-bold text-white'>
    Trade Smarter With Blockbit Solana Sniper Bot
</div>

            <div className="text-[20px] mt-[36px] flex justify-center font-normal
              bg-clip-text text-transparent
              bg-gradient-to-r from-[#2593F9] via-[#2593F9] to-[#00FFD1]"
            >
              Start Trading Today For Free
            </div>
          </div>
        </div>

        <div className='flex justify-center relative z-10'>
          <div className="relative inline-block mt-[36px] p-[3px] rounded-[48px]
            bg-gradient-to-r from-[#0C4D69] to-[#18B18C]
          ">
            <button
              className="flex items-center justify-center gap-2 px-[48px] py-[16px]
                rounded-[48px] text-white text-[20px] font-bold bg-[#171717] w-full h-full
                hover:bg-gradient-to-r hover:from-[#0C4D69] hover:to-[#18B18C]
              "
              onClick={onClickWalletConnect}
            >
              <Image src={IMAGE_BHOOT} height={32} width={32} alt="Launch Icon" />
              <div className='text-[20px] font-bold' >Connect Wallet</div>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center mt-[36px] space-x-2
          cursor-pointer relative z-20"
          onClick={onClickAgreeTerms}
        >
          <input
            type="checkbox"
            className="appearance-none h-4 w-4 rounded-full border-[3px] border-white
            bg-black checked:bg-[#05EA00] checked:border-none ring-white"
            checked={agreeTerms}
          />
          <span className="text-[#989898] text-[15px] font-normal">
            By connecting, I agree to the Terms & Privacy
          </span>
        </div>

        <div className='flex justify-center mt-[29px] relative z-10'>
          <Image src={IMAGE_TABLEIMG} alt="img" layout="responsive"
            width={1332} height={751} className="max-w-[1332px] h-auto"
          />
        </div>

        <div className="md:px-[80px] flex flex-col lg:flex-row justify-between px-[20px] md:px-[50px] lg:px-[169px] items-center mt-[50px] md:mt-[150px] lg:mt-[328px] relative z-10">
          <div className="w-full  mx-auto text-start lg:text-left mb-8 lg:mb-0">
            <div className="text-[20px] font-normal text-[#989898]">01.</div>
            <div className="text-[28px] sm:text-[32px] md:text-[48px] font-normal text-white">Auto Scan</div>
            <p className="text-[14px] sm:text-[16px] md:text-[20px] font-normal text-[#989898]">
              Scan the Solana blockchain and discover new tokens based on your filters
            </p>
            <div className="relative inline-block mt-[24px] sm:mt-[36px] p-[3px] rounded-[48px]
              bg-gradient-to-r from-[#0C4D69] to-[#18B18C]">
              <button className="flex items-center justify-center gap-2 px-[20px] sm:px-[30px]
                md:px-[48px] py-[12px] sm:py-[16px] rounded-[48px] text-white text-[14px]
                sm:text-[16px] md:text-[20px] font-bold bg-[#171717] w-full h-full
                hover:bg-gradient-to-r hover:from-[#0C4D69] hover:to-[#18B18C]
              ">
                <div className="text-[14px] sm:text-[16px] md:text-[20px] font-bold"
                  onClick={onClickWalletConnect}
                >Start Trading</div>
              </button>
            </div>
          </div>
          <div className="w-full max-w-[902px]">
            <Image src={IMAGE_TABLE} alt="img" layout="responsive"
              width={902} height={418} className="w-full h-auto"
            />
          </div>
        </div>

        <div className="md:px-[80px] flex flex-col lg:flex-row justify-between px-[20px] md:px-[50px] lg:px-[169px] items-center mt-[50px] md:mt-[150px] lg:mt-[328px] relative z-10">
          <div className="w-full  mx-auto text-start lg:text-left mb-8 lg:mb-0">
            <div className="text-[20px] font-normal text-[#989898]">02.</div>
            <div className="text-[32px] sm:text-[48px] font-normal text-white">Auto Buy & Sell</div>
            <p className="text-[14px] sm:text-[20px] font-normal text-[#989898]">
              Auto buy & sell based on your strategy setup.
            </p>
            <div className="relative inline-block mt-[24px] sm:mt-[36px] p-[3px] rounded-[48px]
              bg-gradient-to-r from-[#0C4D69] to-[#18B18C]">
              <button className="flex items-center justify-center gap-2 px-[20px] sm:px-[48px]
                py-[12px] sm:py-[16px] rounded-[48px] text-white text-[14px]
                sm:text-[20px] font-bold bg-[#171717] w-full h-full
                hover:bg-gradient-to-r hover:from-[#0C4D69] hover:to-[#18B18C]
              ">
                <div className="text-[14px] sm:text-[20px] font-bold"
                  onClick={onClickWalletConnect}
                >Start Trading</div>
              </button>
            </div>
          </div>

          <div className="w-full max-w-[895px]">
            <Image src={IMAGE_TABLEIMG1} alt="img" layout="responsive"
              width={895} height={515} className="w-full h-auto"
            />
          </div>
        </div>


        <div className="md:px-[80px] flex flex-col lg:flex-row justify-between px-[20px] md:px-[50px] lg:px-[169px] items-center mt-[50px] md:mt-[150px] lg:mt-[328px] relative z-10">
          <div className="w-full  mx-auto text-start lg:text-left mb-8 lg:mb-0">
            <div className="text-[20px] font-normal text-[#989898]">03.</div>
            <div className="text-[32px] sm:text-[48px] font-normal text-white">Extreme Speed</div>
            <p className="text-[14px] sm:text-[20px] font-normal text-[#989898]">
              Execute trades in milliseconds and surpass your competitors
            </p>
            <div className="relative inline-block mt-[24px] sm:mt-[36px] p-[3px] rounded-[48px]
              bg-gradient-to-r from-[#0C4D69] to-[#18B18C]">
              <button className="flex items-center justify-center gap-2 px-[20px] sm:px-[48px]
                py-[12px] sm:py-[16px] rounded-[48px] text-white text-[14px] sm:text-[20px]
                font-bold bg-[#171717] w-full h-full
                hover:bg-gradient-to-r hover:from-[#0C4D69] hover:to-[#18B18C]
              ">
                <div className="text-[14px] sm:text-[20px] font-bold"
                  onClick={onClickWalletConnect}
                >Start Trading</div>
              </button>
            </div>
          </div>

          <div className="w-full max-w-[897px]">
            <Image src={IMAGE_TABLEIMG} alt="img" layout="responsive"
              width={897} height={492} className="w-full h-auto"
            />
          </div>
        </div>

        <div className=' relative z-10 mt-[120px] pb-32'>
          <div className='flex justify-center'>
            <div className='mt-[105px] px-24 w-[1048px]'>
              <div className='text-[48px] text-center font-normal text-white '>
                Join our Trading Community
              </div>
              <div className="text-[20px] mt-[36px] flex justify-center font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#2593F9] via-[#2593F9] to-[#00FFD1]">
                Start Earning Today!
              </div>
            </div>
          </div>
          <a href="https://discord.gg/pbbkRCG2kf" target="_blank">
            <div className='flex justify-center'>
              <div className="relative inline-block mt-[36px] p-[3px] rounded-[48px]
                bg-gradient-to-r from-[#0C4D69] to-[#18B18C]
              ">
                <button
                  className="flex items-center justify-center gap-2 px-[48px] py-[16px]
                    rounded-[48px] text-white text-[20px] font-bold bg-[#1b1a1a]
                    w-full h-full
                    hover:bg-gradient-to-r hover:from-[#0C4D69] hover:to-[#18B18C]
                  "
                >
                  <div className='text-[20px] font-bold' >Join Discord</div>
                  <Image src={IMAGE_DISCORDWHITE} height={23} width={23} color="white" alt="Launch Icon" />
                </button>
              </div>
            </div>
          </a>
        </div>
      </div>
    </>
  )
}