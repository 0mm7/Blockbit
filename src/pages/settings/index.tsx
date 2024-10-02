import AutoBuyText from "@/components/settings/description/AutoBuyText";
import FeesText from "@/components/settings/description/FeesText";
import GeneralText from "@/components/settings/description/GeneralText";
import PendingPoolText from "@/components/settings/description/PendingPoolText";
import TpSlText from "@/components/settings/description/TpSlText";

import TabAutoBuy from "@/components/settings/tabs/TabAutoBuy";
import TabFees from "@/components/settings/tabs/TabFees";
import TabGeneral from "@/components/settings/tabs/TabGeneral";
import TabPendingPool from "@/components/settings/tabs/TabPendingPool";
import TabTpSl from "@/components/settings/tabs/TabTpSl";
import { useUpdateSetting } from "@/components/settings/UpdateSettingProvider";
import ConnectComponent from "@/components/wallet/connect";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import { defaultSettingInfo } from "@/types/setting";
import { useWallet } from "@solana/wallet-adapter-react";

import { Copy } from "lucide-react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Settings = () => {
  const router = useRouter();

  const [dynamicCategory, setDynamicCategory] = useState(router.query.tab === 'general' ? "general" : "pending");
  const [settingInfo, setSettingInfo]: any = useState(defaultSettingInfo);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");
  const [settingBackupInfo, setSettingBackupInfo]: any = useState(defaultSettingInfo);
  // const [loadedSetting, setLoadedSetting] = useState(false);
  const [profileImageData, setProfileIamgeData] = useState();
  const { triggerUpdateSetting } = useUpdateSetting();
  const [checkedLogin, setCheckedLogin] = useState(false);

  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString();
  const publicKeyRef = useRef(publicKey);
  const [copied, setCopied] = useState(false);

  let token: any = '';
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }

  const onCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(publicKey ?? '');
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

  const onCopyBBTButton = async () => {
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

  const loadSetting = async () => {
    const response = await apiService.get(
      apiRoutes.settings.list,
      publicKey
    );

    // if (response.bbt_key_not_exist || response.is_wallet_not_copied) {
    //   await router.push('/wallet');
    // }

    if (response === 401) {
      // await router.push('');
      return;
    }

    setSettingInfo(response.setting);
    setBBTPublicKey(response.bbt_public_key);
    setSettingBackupInfo(response.setting);
    // setLoadedSetting(true);
  };

  useEffect(() => {
    if (publicKey) {
      loadSetting();
    }
  }, [publicKey]);

  const onChangeSettingValue = (e: any, key: string, changedValue = null) => {
    let value = changedValue ? changedValue : e.target.value;
    if (value === 'on'
      || key === 'is_bot_on'
    ) {
      value = settingInfo[key] === 1 ? 0 : 1;
    }

    if (value === '') {
      value = 0;
    }

    const newSettingInfo: any = { ...settingInfo };
    newSettingInfo[key] = value;
    setSettingInfo(newSettingInfo);
  }

  // const CustomCloseButton = ({ closeToast }) => (
  //   <X size={12} color="white" className="text-white " onClick={closeToast} />
  // );

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckedLogin(true);
      if (!publicKeyRef.current) {
        // router.push('/');
      }
    }, 1000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    publicKeyRef.current = publicKey!;
    if (publicKey) {
      loadSetting();
      const intervalId = setInterval(loadSetting, 5000);
      return () => clearInterval(intervalId);
    } else {
      if (checkedLogin) {
        // router.push('/');
      }
    }
  }, [publicKey]);

  const onCancelSetting = () => {
    const newSettingInfo: any = { ...settingBackupInfo };
    setSettingInfo(newSettingInfo);
  }

  const onUpdateSetting = () => {
    const settingFormData = new FormData();

    for (const key in settingInfo) {
      const value = settingInfo[key];
      settingFormData.append(key, value);
    }

    if (profileImageData) {
      settingFormData.append('profile_image_data', profileImageData);
    }

    apiService.putFormData(
      apiRoutes.settings.update_setting,
      settingFormData,
      publicKey
    ).then((response) => {
      if (response.message) {
        toast.error(
          <div className="text-[14px] font-bold text-white">
            {response.message}
          </div>,
          {
            position: "top-right",
            // padding: "0px",
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
        return;
      }

      setSettingInfo(response.setting);
      setBBTPublicKey(response.bbt_public_key);
      setSettingBackupInfo(response.setting);
      triggerUpdateSetting();

      toast.success(
        <div className="text-[14px] font-bold text-white">
          Setting is updated successfully
        </div>,
        {
          position: "top-right",
          // padding: "0px",
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
    })
  }

  return (
    <>
      {publicKey ?
        <div>
          <div className="mx-8 mt-4 relative">
            <div className="text-lg font-bold text-white uppercase">Settings</div>
           

            <div className="flex flex-col lg:flex-row items-center gap-5 mt-3">
  <div className="text-base font-bold text-white uppercase w-full lg:w-[150px]">
    Trading wallet
  </div>
  <div className="bg-[#23242D] rounded-full p-2 flex items-center justify-between w-full lg:w-1/2 px-4">
    <span className="p-1 text-white">
      {bbt_public_key}
    </span>
    <Copy size={24} color="white" className="cursor-pointer" onClick={onCopyBBTButton} />
  </div>
</div>

          </div>

          <div className="mt-5 mx-4 lg:mx-8 py-5 z-40 relative h-full">
  <div className="h-auto lg:h-[350px] flex flex-col lg:flex-row custom-scrollbar">
    
    {/* First Section: Dynamic Navbar and Content */}
    <div className="w-full lg:w-[60%] h-auto lg:h-[350px] flex flex-col">
      {/* Dynamic Navbar */}
      <div className="flex flex-wrap items-center gap-8">
        <div
          className={`flex items-center gap-1 cursor-pointer ${dynamicCategory === "pending" && "border-b-2 border-white"} py-1`}
          onClick={() => setDynamicCategory("pending")}
        >
          <p className={`text-[14px] font-bold ${dynamicCategory === "pending" ? "text-[#FFFFFF]" : "text-[#858686]"}`}>
            Pending Pool
          </p>
        </div>
        <div
          className={`flex items-center gap-1 cursor-pointer ${dynamicCategory === "buy" && "border-b-2 border-white"} py-1`}
          onClick={() => setDynamicCategory("buy")}
        >
          <p className={`text-[14px] font-bold ${dynamicCategory === "buy" ? "text-[#FFFFFF]" : "text-[#858686]"}`}>
            Auto-Buy
          </p>
        </div>
        <div
          className={`flex items-center gap-1 cursor-pointer ${dynamicCategory === "sl_tp" && "border-b-2 border-white"} py-1`}
          onClick={() => setDynamicCategory("sl_tp")}
        >
          <p className={`text-[14px] font-bold ${dynamicCategory === "sl_tp" ? "text-[#FFFFFF]" : "text-[#858686]"}`}>
            SL/TP
          </p>
        </div>
        <div
          className={`flex items-center gap-1 cursor-pointer ${dynamicCategory === "fees" && "border-b-2 border-white"} py-1`}
          onClick={() => setDynamicCategory("fees")}
        >
          <p className={`text-[14px] font-bold ${dynamicCategory === "fees" ? "text-[#FFFFFF]" : "text-[#858686]"}`}>
            Fees
          </p>
        </div>
        <div
          className={`flex items-center gap-1 cursor-pointer ${dynamicCategory === "general" && "border-b-2 border-white"} py-1`}
          onClick={() => setDynamicCategory("general")}
        >
          <p className={`text-[14px] font-bold ${dynamicCategory === "general" ? "text-[#FFFFFF]" : "text-[#858686]"}`}>
            General Settings
          </p>
        </div>
      </div>

      {/* Content Section */}
      {dynamicCategory === "pending" && (
        <TabPendingPool setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
      )}
      {dynamicCategory === "buy" && (
        <TabAutoBuy setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
      )}
      {dynamicCategory === "sl_tp" && (
        <TabTpSl setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
      )}
      {dynamicCategory === "fees" && (
        <TabFees setting={settingInfo} onChangeSettingValue={onChangeSettingValue} />
      )}
      {dynamicCategory === "general" && (
        <TabGeneral
          setting={settingInfo}
          setProfileIamgeData={setProfileIamgeData}
          onChangeSettingValue={onChangeSettingValue}
        />
      )}
    </div>

    {/* Second Section */}
    <div className="w-full lg:w-[40%] h-auto lg:h-[350px] ml-0 lg:ml-20">
  {dynamicCategory === "pending" && (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-6 md:p-12 rounded-lg flex flex-col gap-3 md:gap-5">
        <span className="text-[20px] md:text-[32px] font-bold text-white text-center md:text-left">
          What is a Pending Pool?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          The Pending Pool serves as the initial filter for all tokens emerging
          from the Solana blockchain. Upon a token's launch on the blockchain, the bot conducts a scan based on the predefined criteria within the Pending Pool settings. Tokens that satisfy these criteria are listed in the Pending Pool, awaiting the conditions necessary for an automatic purchase.
        </p>
      </div>
    </div>
  )}

  {dynamicCategory === "buy" && (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          What is Auto-Buy?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          The Auto Buy functionality is configured to determine the precise conditions under which tokens from the Pending Pool are purchased. Once the specified criteria are fulfilled, the bot will automatically execute the purchase, and the token will be reflected in the open positions.
        </p>
      </div>
    </div>
  )}

  {dynamicCategory === "sl_tp" && (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          What is SL/TP?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          TP/SL, which stands for Take Profit and Stop Loss, enables you to establish predefined thresholds for realizing profits or limiting losses on your open positions.
        </p>
      </div>
    </div>
  )}

  {dynamicCategory === "fees" && (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          What are Fees?
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          This section allows you to configure fee limits that will be applied to every transaction executed by the bot, ensuring optimal cost management.
        </p>
      </div>
    </div>
  )}

  {dynamicCategory === "general" && (
    <div className="w-full md:w-[650px] h-auto p-4 md:p-6">
      <div className="bg-black p-8 md:p-12 rounded-lg flex flex-col gap-5">
        <span className="text-[24px] md:text-[32px] font-bold text-white text-center md:text-left">
          General Settings
        </span>
        <p className="text-[#858686] text-[14px] md:text-[16px] font-medium leading-6 md:leading-8">
          In the General Settings section, you have the ability to personalize your profile picture, define the operating hours of the application, and manage the primary on/off switch for the Bot.
        </p>
      </div>
    </div>
  )}

  <div className="flex flex-col sm:flex-row justify-start gap-5 mt-4 lg:mt-16 ml-0 lg:ml-4">
    <button
      onClick={onUpdateSetting}
      className="hover:border border-[#17C654] bg-[#17C654] border rounded-[7px] px-6 py-3 text-white text-base font-bold hover:border-[#3ba04e] hover:bg-[#28DB66] w-full sm:w-auto"
    >
      Update
    </button>
    <button
      onClick={onCancelSetting}
      className="bg-[#202020] hover:border hover:bg-[#2c2c2c] border rounded-[7px] px-6 py-3 text-white text-base font-bold w-full sm:w-auto"
    >
      Cancel
    </button>
  </div>
</div>

  </div>
</div>

        </div>
        :
        //<ConnectComponent />
        null
      }
    </>
  );
};

export default Settings;