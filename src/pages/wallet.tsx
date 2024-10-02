"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import IMAGE_COPY from '@/assets/images/copy.svg';
import IMAGE_SOL from '@/assets/images/solana.svg';
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-toastify";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { useRouter } from "next/router";
import sleep from "@/utils/time";

interface CurrentProps {
  currentStep: number;
  bbt_public_key: string;
  bbt_private_key: string;
}

interface NextProps {
  nextStep: any;
  bbt_public_key: string;
  bbt_private_key: string;
}

interface RestartProps {
  restartSteps: any;
  bbt_public_key: string;
  bbt_private_key: string;
}

// Step Progress Bar Component
const StepProgressBar = (props: CurrentProps) => {
  const currentStep = props.currentStep;

  return (
    <div className="flex justify-center items-center gap-4 pt-[30px]">
      <div className="border rounded-full flex px-[20px] py-[8px] gap-4">
        {[1, 2, 3].map((step, index) => (
          <div
            key={index}
            className={`w-[20px] h-[20px] rounded-full flex items-center justify-center border
                ${currentStep >= step ? "bg-[#A04BF5]" : "bg-gray-700"
              }`}
          >
          </div>
        ))}
      </div>

    </div>
  );
};

//onClick={nextStep} Card Content for Step 1 with buttons
const Step1 = (props: NextProps) => {
  const nextStep = props.nextStep;
  const [showNextCard, setShowNextCard] = useState(false);
  // const bbt_private_key = props.bbt_private_key;
  const bbt_public_key = props.bbt_public_key;
  const [copied, setCopied] = useState(false);

  const handleGenerateClick = () => {
    setShowNextCard(true); // Switch to next card
  };

  const summarize = (public_key: string) => {
    return public_key ? `${public_key.slice(0, 6)}.....${public_key.slice(-6)}` : '.....';
  }

  const onCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_public_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  return (
    <div>
      {!showNextCard ? (
        <>
          <div className="text-[32px] xs:text-[25px] sm:text-[35px] md:text-[25px] font-normal text-center px-4 md:px-0">
            Generate and Save your
            <span className="text-[#A04BF5] pl-2"> Trading wallet</span>
          </div>

          <div
            className="rounded-[48px] justify-center mt-[20px] md:mt-[30px] pb-10 flex flex-col md:flex-row text-white w-[90%] md:w-[700px] mx-auto"
            style={{
              background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
              backgroundBlendMode: "lighten"
            }}
          >
            <div className="py-2 px-6">
              <div className="text-[20px] md:text-[25px] mt-[24px] font-normal text-center mb-4">Your trading wallet address is</div>
              <div className="mb-4 text-[24px] md:text-[30px] font-bold flex justify-center mt-[16px]">
                {summarize(bbt_public_key)}
              </div>
              <div className="text-[18px] md:text-[25px] font-normal text-center mx-auto text-center">
                Click Generate to take control over your Trading wallet and private keys
              </div>
              <button
                onClick={handleGenerateClick}
                className="w-full md:w-[500px] mt-[36px] mx-auto items-center justify-center flex text-white text-[16px] md:text-[20px]
font-bold rounded-[42px] py-[12px] md:py-[20px] hover:opacity-85"
                style={{
                  background: "linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)"
                }}
              >
                Generate
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-[32px] xs:text-[25px] sm:text-[35px] md:text-[25px] font-normal text-center px-4 md:px-0">
            This is your
            <span className="text-[#A04BF5] pl-2"> Trading wallet</span>
          </div>
          <div
            className="rounded-[48px] mt-[30px] text-white w-full max-w-[800px] pb-10 mx-auto"
            style={{
              background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
              backgroundBlendMode: "lighten",
            }}
          >
            <div className="px-4 md:px-[75px] lg:px-[125px] pt-[30px]">
              <div className="text-[18px] md:text-[20px] font-bold mb-4 text-center md:text-left">
                BLOCKBIT TRADING WALLET
              </div>
              <div className="flex  md:flex-row justify-between bg-[#9292921A] rounded-[25px] py-[16px] px-[20px] mt-[22px] w-full md:w-[400px] sm:w-[400px] mx-auto md:mx-0">
                <div className="text-[14px] md:text-[15px] font-normal break-words">{bbt_public_key}</div>
                <Image
                  src={IMAGE_COPY}
                  width={20}
                  height={20}
                  alt="img"
                  className="cursor-pointer "
                  onClick={onCopyButton}
                />
              </div>
              <div className="mb-4 text-[16px] md:text-[18px] font-bold mt-[20px] text-center md:text-left">
                TRADING WALLET PRIVATE KEY
              </div>

              <div className="text-[16px] md:text-[18px] font-normal text-[#9F9F9F] text-center md:text-left">
                Please copy the below private key and add it to your wallet as a new account.
              </div>
              <div className="text-[16px] md:text-[18px] font-bold text-[#9F9F9F] text-center md:text-left">
                Your private key will NOT be shown again.
              </div>
            </div>

            <div className="  mt-[30px] py-[6px]   lg:px-[125px] md:px-[70px] mx-auto">
              <div className=" md:bg-[#9292921A] px-4 md:px-0   py-[6px] p-2 rounded-[42px]  flex flex-col md:flex-row justify-between items-center">
                <div className="text-[14px] md:text-[15px] font-bold text-center md:text-left pl-0 md:pl-6 mb-4 md:mb-0">
                  Double click to reveal your private key
                </div>
                <button
                  onDoubleClick={nextStep}
                  className="text-white font-bold py-[12px] rounded-[32px] text-[16px] md:text-[18px] w-full md:w-[200px] hover:opacity-85 mx-auto md:mx-[16px]"
                  style={{
                    background:
                      "linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 63.33%, #75CFD4 99.67%)",
                  }}
                >
                  Double click 2X
                </button>
              </div>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

// Card Content for Step 2 without buttons
const Step2 = (props: NextProps) => {
  const nextStep = props.nextStep;
  const [showPopup, setShowPopup] = useState(false);
  const bbt_private_key = props.bbt_private_key;
  const bbt_public_key = props.bbt_public_key;
  const [copied, setCopied] = useState(false);

  const handleContinue = () => {
    // Handle the next step
    console.log("Proceed to the next step");
    setShowPopup(false);
  };

  const onCopyPrivateButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_private_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  const onCopyPublicButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_public_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  return (
    <div className="relative">
       <div className="text-[32px] xs:text-[25px] sm:text-[35px] md:text-[25px] font-normal text-center px-4 md:px-0">
       This is your
            <span className="text-[#A04BF5] pl-2"> Trading wallet</span>
          </div>
      <div className="relative">
        <div

        >
          <div className="rounded-[48px] mt-[30px] text-white w-full max-w-[800px] pb-10 mx-auto"
            style={{
              background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
              backgroundBlendMode: "lighten",
            }}>

            <div className="px-6 sm:px-[80px] md:px-[130px] pt-[20px] ">
              <div className="text-[18px] sm:text-[20px] font-bold mb-4">BLOCKBIT TRADING WALLET</div>
              <div className="flex justify-between  bg-[#9292921A] rounded-[15px] sm:rounded-[25px] py-[12px] px-[20px] mt-[12px]">
                <div className="text-[14px] sm:text-[15px] font-normal break-words">{bbt_public_key}</div>
                <Image
                  src={IMAGE_COPY}
                  width={20}
                  height={20}
                  alt="Copy"
                  className="cursor-pointer"
                  onClick={onCopyPublicButton}
                />
              </div>

              <div className="mb-2 text-[16px] sm:text-[18px] font-bold mt-[12px]">TRADING WALLET PRIVATE KEY</div>

              <div className="text-[16px] sm:text-[18px] font-normal text-[#9F9F9F]">
                Please copy the below private key and add it to your wallet as a new account.
              </div>
              <div className="text-[16px] sm:text-[18px] font-bold text-[#9F9F9F]">
                Your private key will NOT be shown again.
              </div>
              <div className="flex justify-between  bg-[#9292921A] rounded-[15px] sm:rounded-[25px] py-[12px] px-[20px] mt-[12px]">
                <div className="text-[14px] sm:text-[15px] font-normal break-words">{bbt_private_key}</div>
                <Image
                  src={IMAGE_COPY}
                  width={20}
                  height={20}
                  alt="Copy"
                  className="cursor-pointer"
                  onClick={onCopyPublicButton}
                />
              </div>
            </div>

            <button
              onClick={() => setShowPopup(true)}
              className="w-full max-w-[90%] md:max-w-[400px]  sm:max-w-[300px] mt-[24px] mx-auto flex justify-center items-center text-white text-[16px] sm:text-[20px] font-bold rounded-[24px] sm:rounded-[42px] py-[12px] hover:opacity-85"
              style={{
                background: "linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)",
              }}
            >
              I copied, Continue
            </button>
          </div>

          {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div
      className="text-white items-center rounded-[24px] sm:rounded-[48px] p-6 sm:p-8 w-full max-w-[95%] sm:max-w-[90%] md:max-w-[760px] h-auto text-center"
      style={{
        background: "linear-gradient(102.61deg, #5522A9 7.76%, #6136A7 96.71%)",
      }}
    >
      <div className="text-[18px] sm:text-[24px] md:text-[32px] px-4 sm:px-10 md:px-20 pt-[20px] sm:pt-[30px] mb-4">
        Are you sure you saved your <strong>Private key?</strong>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 mt-6 sm:mt-10">
        {/* Dismiss button */}
        <button
          onClick={() => setShowPopup(false)}
          className="bg-[#360951] text-[14px] sm:text-[16px] md:text-[20px] text-white font-bold py-[10px] px-[30px] sm:px-[36px] md:px-[46px] rounded-[20px] sm:rounded-[24px] md:rounded-[42px] hover:opacity-85"
        >
          No! Take me back
        </button>

        {/* Continue button */}
        <button
          onClick={nextStep}
          className="bg-white text-purple-900 text-[14px] sm:text-[16px] md:text-[20px] font-bold py-[10px] px-[30px] sm:px-[36px] md:px-[64px] rounded-[20px] sm:rounded-[24px] md:rounded-[42px] hover:opacity-85"
        >
          Yes, I saved it
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>

    </div>

  );
};

// Card Content for Step 3 with some other functionalities (e.g., confirmation)
const Step3 = (props: RestartProps) => {
  // const restartSteps = props.restartSteps;
  // const bbt_private_key = props.bbt_private_key;
  const bbt_public_key = props.bbt_public_key;
  // const [showNextCard, setShowNextCard] = useState(false);
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const connection = new Connection('https://nd-326-444-187.p2pify.com/9de47db917d4f69168e3fed02217d15b');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getWalletBalance();
    const intervalId = setInterval(getWalletBalance, 1000);
    return () => clearInterval(intervalId);
  }, [bbt_public_key]);

  const getWalletBalance = async () => {
    if (bbt_public_key) {
      const balance = await connection.getBalance(new PublicKey(bbt_public_key));
      setBalance(balance / LAMPORTS_PER_SOL);
    }

    if (balance > 0) {
      setRefreshing(false);
    }
  }

  const getUpdateWalletCopied = async () => {
    const response = await apiService.post(
      apiRoutes.wallet.update_copied,
      {},
      bbt_public_key
    );

    // if (response.is_wallet_not_copied === 0) {
    //   await router.push('/settings?tab=general');
    //   return;
    // }
  }

  const onCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(bbt_public_key ?? '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }

    toast.success(
      <div className="text-[14px] font-bold text-white">
        Wallet Address Copied!
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: "#1a202c",
          top: "70px",
        },
      }
    );
  };

  const onRefreshBalance = async () => {
    setRefreshing(true);
    await getWalletBalance();
    await sleep(1000);
  };

  return (
    <div className="relative">
  <div className="text-[28px] xs:text-[25px] sm:text-[30px] md:text-[32px] font-normal text-center px-4 md:px-0">
    Deposit funds to your
    <span className="text-[#A04BF5] pl-2"> Trading wallet</span>
  </div>
  <div
    className="rounded-[48px] items-center mt-[30px] text-white w-full max-w-[800px] pt-10 pb-10 mx-auto"
    style={{
      background: "linear-gradient(180deg, rgba(207, 243, 255, 0.1) 0%, rgba(53, 53, 53, 0.1) 100%)",
      backgroundBlendMode: "lighten"
    }}
  >
    <div className="text-center p-10 ">
      <div className="text-[18px] sm:text-[20px] font-bold mb-2">Your current Balance</div>
      <div className="flex justify-center items-center">
        <div className="text-[32px] sm:text-[48px] font-normal">{balance}</div>
        <Image src={IMAGE_SOL} width={30} height={30} alt="img" className="w-[30px] h-[30px] ml-2 mt-[6px]" />
      </div>
      <div className="text-[12px] sm:text-[15px] font-bold text-[#9F9F9F]">PLEASE DEPOSIT FUNDS TO YOUR TRADING WALLET USING THIS ADDRESS</div>
    </div>
<div className="px-10">
    <div className=" flex justify-between w-full max-w-[545px] bg-[#9292921A] rounded-[25px] py-[16px] px-[20px] mt-[2px] mx-auto">
      <div className="text-[15px] font-normal">{bbt_public_key}</div>
      <Image
        src={IMAGE_COPY}
        width={20}
        height={20}
        alt="img"
        className="cursor-pointer"
        onClick={onCopyButton}
      />
    </div>

    {balance > 0 ? (
      <button
        className=" flex justify-center w-full max-w-[545px] text-center mt-[16px] text-white text-[18px] sm:text-[20px] font-bold rounded-[42px] py-[18px] hover:opacity-85 mx-auto"
        style={{
          background: "linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)"
        }}
        onClick={getUpdateWalletCopied}
      >
        Continue to the app
      </button>
    ) : (
      <button
  className="flex justify-center w-full max-w-[545px] text-center mt-[16px] text-white text-[18px] sm:text-[20px] font-bold rounded-[42px] py-[18px] hover:opacity-85 mx-auto"
  style={{
    background: "linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)"
  }}
  onClick={onRefreshBalance}
>
  Refresh / Check Balance
</button>

    )}
  </div>
  </div>

  {refreshing && balance === 0 ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        className="text-white items-center rounded-[32px] py-4 px-2 w-[80%] max-w-[500px] text-center"
        style={{
          background: "linear-gradient(102.61deg, #5522A9 7.76%, #6136A7 96.71%)"
        }}
      >
        <div className="text-[24px] sm:text-[30px] my-2 font-bold">
          Scanning the Blockchain...<br />
          Please Wait.
        </div>
      </div>
    </div>
  ) : null}
</div>

  );
};

export default function Page() {
  const router = useRouter();
  const wallet = useWallet();

  const [currentStep, setCurrentStep] = useState(1);
  const publicKey = wallet.publicKey?.toString();
  const [bbt_private_key, setBBTPrivateKey] = useState("");
  const [bbt_public_key, setBBTPublicKey] = useState("");

  // Auto-advance logic for step 2
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Restart the steps from the beginning
  const restartSteps = () => {
    setCurrentStep(1);
  };

  const loadWallet = async () => {
    const response = await apiService.get(
      apiRoutes.wallet.data,
      publicKey
    );

    // if (response.is_wallet_not_copied === 0) {
    //   await router.push('/settings?tab=general');
    //   return;
    // }

    setBBTPrivateKey(response.bbt_private_key);
    setBBTPublicKey(response.bbt_public_key)
  };

  useEffect(() => {
    if (publicKey) {
      loadWallet();
    }
  }, [publicKey]);

  // Automatically move from step 2 to step 3 after 5 seconds
  return (
    <div
      className="w-full h-full"
    // style={{
    //   background: `
    //       radial-gradient(177.06% 84.54% at 140% 15.46%, #063F69 20.1%, #1A0D40 40.1%, #0F0F0F 67.1%),
    //       radial-gradient(67.66% 67.66% at 10.18% 91.4%, rgba(5, 0, 235, 0.34) 0%, rgba(0, 179, 235, 0.104615) 32%, rgba(0, 38, 235, 0) 82.5%)
    //     `,
    //   backgroundBlendMode: 'overlay',
    // }}
    >
      <StepProgressBar
        currentStep={currentStep}
        bbt_public_key={bbt_public_key}
        bbt_private_key={bbt_private_key}
      />

      {/* Step Card with dynamic content */}
      <div className="px-8 text-white mt-4 items-center flex justify-center mx-auto">
        {currentStep === 1 &&
          <Step1
            nextStep={nextStep}
            bbt_public_key={bbt_public_key}
            bbt_private_key={bbt_private_key}
          />
        }
        {currentStep === 2 &&
          <Step2
            nextStep={nextStep}
            bbt_public_key={bbt_public_key}
            bbt_private_key={bbt_private_key}
          />
        }
        {currentStep === 3 &&
          <Step3
            restartSteps={restartSteps}
            bbt_public_key={bbt_public_key}
            bbt_private_key={bbt_private_key}
          />
        }
      </div>
    </div>
  )
}
