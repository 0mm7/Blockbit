"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import IMG_SOLANA from '@/assets/images/solana.svg';
import IMG_PROFILE from '@/assets/images/user_icon.jpg';
import IMG_DISCORD_LOGO from '@/assets/images/discord_logo.svg';
import IMG_X_LOGO from '@/assets/images/x_logo.svg';
import MENU from '@/assets/images/menu.png';
import Image from "next/image";

import { useRouter } from "next/router";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Connection, PublicKey } from '@solana/web3.js';
import { useUpdateSetting } from "@/components/settings/UpdateSettingProvider";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";

const Navbar = () => {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const { publicKey } = useWallet();
  const connection = new Connection('https://nd-326-444-187.p2pify.com/9de47db917d4f69168e3fed02217d15b');
  const { updateSetting } = useUpdateSetting();
  const [profileImageSrc, setProfileImageSrc] = useState("");
  const [isTradePage, setIsTradePage] = useState(false);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer visibility

  const loadSetting = async () => {
    const response = await apiService.get(
      apiRoutes.settings.list,
      publicKey?.toString()
    );

    if (response === 401) {
      return;
    }

    setBBTPublicKey(response.bbt_public_key);
  };

  useEffect(() => {
    getWalletBalance();
  }, [bbt_public_key]);

  useEffect(() => {
    const image_src = `/profile_image/${publicKey}?t=${Date.now()}`;
    setProfileImageSrc(image_src)
  }, [updateSetting]);

  const getWalletBalance = async () => {
    if (bbt_public_key) {
      const balance = await connection.getBalance(new PublicKey(bbt_public_key));
      setBalance(balance / LAMPORTS_PER_SOL);
    }
  }

  const displayBalance = (balance: any) => {
    if (balance > 0) {
      return `${balance.toFixed(4)}...`;
    } else if (balance === 0) {
      return '0.0000';
    }
  }

  useEffect(() => {
    if (bbt_public_key) {
      loadSetting();

      const intervalId = setInterval(getWalletBalance, 5000);
      return () => clearInterval(intervalId);
    }
  }, [bbt_public_key]);

  useEffect(() => {
    if (publicKey === null) {
      // router.push('/');
    } else {
      if (router.pathname === '/') {
        // router.push('/trades/pending');
      }

      const image_src = `/profile_image/${publicKey}?t=${Date.now()}`;
      setProfileImageSrc(image_src)
    }
  }, [publicKey])

  useEffect(() => {
    if (router.pathname === '/trades/pending'
      || router.pathname === '/trades/open'
      || router.pathname === '/trades/closed'
      || router.pathname === '/settings'
    ) {
      setIsTradePage(true);
    } else {
      setIsTradePage(false);
    }
  }, [router]);

  return (
    <>
      {isTradePage ? (
        <div className="navbar px-5 w-full bg-[#171717]">
          <div className="flex items-center justify-between">
            <div className="flex justify-between items-center gap-2">
              <Logo />
              <div className="hidden lg:flex">
                {publicKey ? (
                  <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-6 rtl:space-x-reverse md:flex-row md:mt-0">
                    <li>
                      <Link
                        href="/trades/pending"
                        className={`text-[14px] block cursor-pointer 
                      ${router.pathname === '/trades/pending' ? "text-white font-bold" : "text-[#858686] font-normal"
                        }`}
                        aria-current="page"
                      >
                        Pending Pool
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/trades/open"
                        className={`text-[14px] block cursor-pointer 
                      ${router.pathname === '/trades/open' ? "text-white font-bold" : "text-[#858686] font-normal"
                        }`}
                      >
                        Open positions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/trades/closed"
                        className={`text-[14px] block cursor-pointer 
                      ${router.pathname === '/trades/closed' ? "text-white font-bold" : "text-[#858686] font-normal"
                        }`}
                      >
                        Closed positions
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className={`text-[14px] block cursor-pointer 
                      ${router.pathname === '/settings' ? "text-white font-bold" : "text-[#858686] font-normal"
                        }`}
                      >
                        Settings
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </div>
              {/* Hamburger Menu Icon for mobile */}
            
            </div>

          <div className="flex justify-between gap-2">
  <div className="flex gap-2 hidden lg:flex"> {/* Add 'hidden lg:flex' to hide on small screens */}
    {publicKey ? (
      <div className="border cursor-pointer rounded-[48px] px-4 gap-1 flex justify-between items-center my-4 h-10 border-[#676767] ">
        <h1 className="text-white text-[13px] font-bold">{displayBalance(balance)}</h1>
        <Image src={IMG_SOLANA} width={20} height={20} alt="image" />
      </div>
    ) : null}

    <div className="flex border rounded-[48px] px-4 my-4 h-10 border-[#676767] cursor-pointer items-center hover:bg-[#1a1f2e]">
      <WalletMultiButton style={{}} />
    </div>
  </div>

  <div className="flex items-center">
  <button 
    type="button" 
    className="hidden lg:flex text-[12px] bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
    id="user-menu-button"
  >
    <span className="sr-only">Open user menu</span>

    {publicKey && profileImageSrc ? (
      <Image 
        className="w-8 h-8 rounded-full" 
        src={profileImageSrc} 
        alt="user photo" 
        width={32} 
        height={32} 
      />
    ) : (
      <Image 
        className="w-8 h-8 rounded-full" 
        src={IMG_PROFILE} 
        alt="user photo" 
        width={32} 
        height={32} 
      />
    )}
  </button>

  </div>
</div>

              <div className="flex lg:hidden">
                <button onClick={() => setDrawerOpen(true)}>
                  <Image src={MENU} alt="Menu" width={24} height={24} />
                </button>
              </div>
          </div>

          {/* Drawer for mobile menu */}
          {drawerOpen && (
            <div className="fixed inset-0 flex justify-end bg-black bg-opacity-50 z-50">
              <div className="bg-[#171717] w-3/4 max-w-sm h-full p-6">
                <button onClick={() => setDrawerOpen(false)} className="text-white absolute top-4 right-4">
                  X
                </button>
                <ul className="flex flex-col items-center justify-center h-full">
                  <li className="my-2">
                    <Link href="/trades/pending" className="text-white">Pending Pool</Link>
                  </li>
                  <li className="my-2">
                    <Link href="/trades/open" className="text-white">Open positions</Link>
                  </li>
                  <li className="my-2">
                    <Link href="/trades/closed" className="text-white">Closed positions</Link>
                  </li>
                  <li className="my-2">
                    <Link href="/settings" className="text-white">Settings</Link>
                  </li>
                  <div className="flex justify-between gap-2">
              <div className="flex gap-2 ">
                {publicKey ? (
                  <div className="border cursor-pointer rounded-[48px] px-4 gap-1 flex justify-between items-center my-4 h-10 border-[#676767] ">
                    <h1 className="text-white text-[13px] font-bold">{displayBalance(balance)}</h1>
                    <Image src={IMG_SOLANA} width={20} height={20} alt="image" />
                  </div>
                ) : null}

                <div className="flex border rounded-[48px] px-4 my-4 h-10 border-[#676767] cursor-pointer items-center hover:bg-[#1a1f2e]">
                  <WalletMultiButton style={{}} />
                </div>
              </div>

              <div className="flex items-center ">
                <button type="button" className="flex text-[12px] bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button">
                  <span className="sr-only">Open user menu</span>

                  {publicKey && profileImageSrc ? (
                    <Image className="w-8 h-8 rounded-full" src={profileImageSrc} alt="user photo" width={32} height={32} />
                  ) : (
                    <Image className="w-8 h-8 rounded-full" src={IMG_PROFILE} alt="user photo" width={32} height={32} />
                  )}
                </button>
              </div>
            </div>
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="">
          <nav className="bg-[#171717] border-gray-200 px-5 pt-4 w-full pb-4 items-center">
            <div className="flex justify-between ">
              <Logo />
              <div className="flex justify-between gap-10 items-center">
                <a href="https://discord.gg/pbbkRCG2kf" target="_blank">
                  <Image src={IMG_DISCORD_LOGO} height={24} width={24} alt="img" className='cursor-pointer' />
                </a>
                <a href="https://x.com/TheBlockbit" target="_blank">
                  <Image src={IMG_X_LOGO} height={24} width={24} alt="img" className='cursor-pointer' />
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
