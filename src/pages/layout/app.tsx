import React, { ReactNode, useState } from 'react';
import Navigation from './navigation';
import { ToastContainer } from 'react-toastify';
import { NextUIProvider } from '@nextui-org/system';
import { useRouter } from 'next/router';

import Image from 'next/image';
import IMG_BG_NORMAL from '@/assets/images/bg_normal.png';
import IMG_BG_SETTING from '@/assets/images/bg_setting.png';
import IMG_DISCORD from '@/assets/images/discord.svg';

interface AppLayoutProps {
  children: ReactNode;
}

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import dynamic from 'next/dynamic';
import { UpdateSettingProvider } from '@/components/settings/UpdateSettingProvider';

const AppWalletProvider = dynamic(
  () => import('@/components/AppWalletProvider'),
  { ssr: false }
);

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const router = useRouter();
  const [showDiscord, setShowDiscord] = useState(true);

  const onClickCloseDiscord = () => {
    setShowDiscord(false);
  };

  return (
    <AppWalletProvider>
      <NextUIProvider>
        <UpdateSettingProvider>
          <div className={`${inter.className} h-screen bg-[#121212] flex flex-col`}>
            <ToastContainer></ToastContainer>
            <Navigation />

            <div className='relative custom-scrollbar flex-1 justify-start overflow-auto'>
              {router.pathname === '/settings' ?
                <Image
                  src={IMG_BG_SETTING}
                  alt=""
                  width={200}
                  height={200}
                  className="w-[620px] h-[650px] absolute right-[600px] top-[-20px]"
                />
                : router.pathname.indexOf('trades') > 0 ?
                  <Image src={IMG_BG_NORMAL} alt="" className="w-[520px] h-[550px] absolute -left-10 top-12" />
                  : null
              }
              {children}
            </div>

            {showDiscord ?
              <div className="fixed end-1 bottom-10 mr-10 z-[40]">
                <a href="https://discord.gg/pbbkRCG2kf" target="_blank">
                  <div className="bg-gradient-to-r from-[#3E4BD8] to-[#5A67F2] 
                  z-[100] flex justify-center w-[300px] text-start rounded-[16px] items-center cursor-pointer"
                  >
                    <div className="text-[14px] ml-[20px] text-white">
                      <span className='font-bold'>Need Help?</span> Join our Discord Server for Support
                    </div>
                    <Image src={IMG_DISCORD} width={40} height={40} alt="discord"
                      className="rounded-[34px] mt-[19px] mb-[15px] mr-[24px]"
                    />
                  </div>
                </a>
                <div className="absolute right-[12px] top-[8px] text-[12px] text-[#E0E0E0]
                  cursor-pointer drop-shadow-lg hover:text-[#FFFFFF]"
                  style={{ textShadow: "1px 1px black" }}
                  onClick={onClickCloseDiscord}
                >X</div>
              </div>
              : null
            }
          </div>
        </UpdateSettingProvider>
      </NextUIProvider>
    </AppWalletProvider>
  );
};

export default AppLayout;
