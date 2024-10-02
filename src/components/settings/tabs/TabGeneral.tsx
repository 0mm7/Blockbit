import { Info, Lock } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
// import MemberShipCard from "./MemberShipCard";
import IMG_PROFILE from '@/assets/images/user_icon.jpg';
import InfoCard from "@/components/InfoCard";
import { SettingProps } from "@/types/setting";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import { useWallet } from "@solana/wallet-adapter-react";
import { useUpdateSetting } from "../UpdateSettingProvider";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { toast } from "react-toastify";

const TabGeneral = (props: SettingProps) => {
  const setting = props.setting;
  const setProfileIamgeData = props.setProfileIamgeData;
  const onChangeSettingValue = props.onChangeSettingValue;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString()

  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const [imagePreview, setImagePreview] = useState("");
  const { updateSetting, triggerUpdateSetting } = useUpdateSetting();

  const isOn = setting?.is_bot_on;
  const [confirmRemove, setConfirmRemove] = useState(false);
  const [profileImageSrc, setProfileImageSrc] = useState("");

  const options = Array.from({ length: 24 }, (_, index) => {
    const value_hour = index.toString().padStart(2, '0');
    const label_hour = (index % 24).toString().padStart(2, '0');
    return {
      value: `${value_hour}:00`,
      label: `${label_hour}:00`
    };
  });

  const options1 = Array.from({ length: 24 }, (_, index) => {
    const value_hour = (index + 1).toString().padStart(2, '0');
    const label_hour = ((index + 1) % 24).toString().padStart(2, '0');
    return {
      value: `${value_hour}:00`,
      label: `${label_hour}:00`
    };
  });

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleDropdown1 = () => setIsOpen1(!isOpen1);

  const onClickRemoveImage = async () => {
    setConfirmRemove(true);
  }

  const removeProfileImage = async () => {
    await apiService.post(
      apiRoutes.settings.remove_profile_image,
      {},
      publicKey
    );

    triggerUpdateSetting();
    toast.success(
      <div className="text-[14px] font-bold text-white">
        Profile image removed successfully!
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
  }

  const onClickSelectIamge = () => {
    fileInputRef.current!.click();
  }

  const handleImageChange = (event: any) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // For previewing image
      setProfileIamgeData(file);
    }
  };

  const handleSelect = (e: any, option: any) => {
    onChangeSettingValue(e, 'run_started_at', option.value);
    setIsOpen(false);
  };

  const handleSelect1 = (e: any, option: any) => {
    onChangeSettingValue(e, 'run_ended_at', option.value);
    setIsOpen1(false);
  };

  useEffect(() => {
    const image_src = `/profile_image/${publicKey}?t=${Date.now()}`;
    setProfileImageSrc(image_src)
  }, [updateSetting]);

  return (
    <>
      <div className="mt-[20px]">
        <div>
          <ConfirmDialog
            title="Remove Profile Image"
            open={confirmRemove}
            onClose={() => setConfirmRemove(false)}
            onConfirm={removeProfileImage}
          >
            Are you sure you want to delete this image?
          </ConfirmDialog>
        </div>

        <div className="flex items-center gap-3">
          <input type="file" accept="image/*"
            ref={fileInputRef}
            className="hidden" onChange={handleImageChange} />


          {imagePreview ?
            <Image src={imagePreview} alt="Image Preview" width={50} height={50}
              className="rounded-full cursor-pointer"
            />
            :
            profileImageSrc ?
              <Image src={profileImageSrc} alt="" width={50} height={50}
                className="rounded-full cursor-pointer"
              /> :
              <Image src={IMG_PROFILE} alt="" width={50} height={50}
                className="rounded-full cursor-pointer"
              />
          }

          <button
            type="button"
            className="w-[130px] h-[35px] rounded-[52px] flex justify-center
                items-center text-[12px] font-bold text-[#FFFFFF] bg-[#17C654]"
            onClick={onClickSelectIamge}
          >
            Upload Image
          </button>

          <button
            type="button"
            className="w-[100px] h-[35px] text-[12px] font-bold
                bg-[#202020] text-[#FFFFFF] rounded-[52px]"
            onClick={onClickRemoveImage}
          >
            Remove
          </button>
        </div>

        <div className="w-[335px] mt-[8px]">
          <p className="text-[10px] font-normal text-[#7A7A7A] leading-[14px]">
            Max file size 5MB. This is the image that would show on your
            collection profile page. Profile picture size (500x500px)
          </p>
        </div>

        <div className="flex items-center gap-1 py-1 mt-[55px]">
          <p className="text-[14px] font-bold text-[#FFFFFF]">
            Bot running time
          </p>
          <div className="relative group">
            <Info size={20} color="white" className="cursor-pointer" />
            <div className="absolute left-5 bottom-2 hidden group-hover:block z-[1]">
              <InfoCard
                title="Bot running time"
                content="Sets the duration for which the bot will operate."
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative inline-block text-left mt-2">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="inline-flex justify-between w-[120px] rounded-md shadow-sm px-4 py-2 bg-[#0F0F0F] text-sm font-medium text-[#7A7A7A] focus:outline-none border border-[#7A7A7A]"
              >
                {setting?.run_started_at}
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
              <div className="origin-top-right absolute mt-2 w-[120px] rounded-md shadow-lg bg-[#333333] text-[#C0C0C0]
                ring-1 ring-black ring-opacity-5 z-[1]">
                <div className="py-1">
                  {options.map((option: any) => (
                    <button
                      key={option.label}
                      onClick={(e) => handleSelect(e, option)}
                      className={`${option.locked ? "text-[#C0C0C0]" : "text-[#C0C0C0]"
                        } group flex justify-between items-center px-4 py-2 text-sm w-full`}
                      disabled={option.locked}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <p className="text-[14px] font-bold text-[#858686]">to</p>
          <div className="relative inline-block text-left mt-2">
            <div>
              <button
                type="button"
                onClick={toggleDropdown1}
                className="inline-flex justify-between w-[120px] rounded-md shadow-sm px-4 py-2 bg-[#0F0F0F] text-sm font-medium text-[#7A7A7A] focus:outline-none border border-[#7A7A7A]"
              >
                {setting?.run_ended_at === '24:00' ? '00:00' : setting?.run_ended_at}
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

            {isOpen1 && (
              <div className="origin-top-right absolute mt-2 w-[120px] rounded-md shadow-lg
                bg-[#333333] text-[#C0C0C0] ring-1 ring-black ring-opacity-5 z-[1]"
              >
                <div className="py-1">
                  {options1.map((option: any) => (
                    <button
                      key={option.label}
                      onClick={(e) => handleSelect1(e, option)}
                      className={`${option.locked ? "text-[#C0C0C0]" : "text-[#C0C0C0]"
                        } group flex justify-between items-center px-4 py-2 text-sm w-full`}
                      disabled={option.locked}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-[20px]">
          <p className="text-[10px] font-normal text-[#7A7A7A] leading-[14px]">
            *Times are in UTC +0
          </p>
        </div>

        <div className="mt-[38px] flex items-center gap-3">
          <p className="text-[12px] font-bold text-[#FFFFFF]">
            Turn the Bot On\Off
          </p>
          <div className="flex items-center">
            <div
              className={`relative w-14 h-6 rounded-full cursor-pointer ${isOn ? "bg-green-500" : "bg-[#FF3A3A]"
                }`}
              onClick={(e: any) => { onChangeSettingValue(e, 'is_bot_on'); }}
            >
              <span
                className={`absolute top-1/2 transform -translate-y-1/2 text-xs font-bold ${isOn ? "left-2 text-white" : "right-2 text-white"
                  }`}
              >
                {isOn ? "ON" : "OFF"}
              </span>
              <div
                className={`absolute w-5 h-5 bg-white top-0.5 left-0.5 rounded-full shadow-md transform transition-transform duration-300 ${isOn ? "translate-x-8" : "translate-x-0"
                  }`}
              ></div>
            </div>
          </div>
        </div>


      </div >
    </>
  );
};

export default TabGeneral;
