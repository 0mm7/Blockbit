import React, { useEffect, useState } from "react";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";

interface IProfileInfo {
  password: string,
  confirm_password: string,
  private_key: string,
}

const defaultProfileInfo: IProfileInfo = {
  password: "",
  confirm_password: "",
  private_key: "",
};

const Settings = () => {
  let token: any = '';
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }
  const [profileInfo, setProfileInfo] = useState(defaultProfileInfo);

  const onChangeSettingValue = (e: any, key: string) => {
    const value = e.target.value;
    const newProfileInfo: any = { ...profileInfo };
    newProfileInfo[key] = value;
    setProfileInfo(newProfileInfo);
  }

  const onUpdatePassword = () => {
    if (profileInfo.password !== profileInfo.confirm_password) {
      alert('Confirm password does not match');
      return;
    }

    apiService.post(
      `${apiRoutes.user.update_password}/1/update_password`,
      profileInfo,
      token
    ).then(() => {
      alert("Password is updated successfully");
    })
  }

  const onUpdatePrivatekey = () => {
    apiService.post(
      `${apiRoutes.user.update_password}/1/update_private_key`,
      profileInfo,
      token
    ).then(() => {
      alert("Private key is updated successfully");
      // toast("Setting is updated successfully", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   hideProgressBar: true,
      //   theme: "dark",
      // });
    })
  }


  const clsasNames = {
    label: "font-semibold",
    input: "text-center",
    inputWrapper: "text-center border-2 mt-2",
  };

  return (
    <div className="lg:px-10">
      <div className="text-[30px] pt-4 pb-3 font-bold">Profile</div>
      <div className="grid grid-cols-2 gap-x-10">
        <div className="flex flex-col space-y-2">
          <div className="text-[24px] font-bold">Password</div>
          <div>
            <Input
              type="password"
              label="New Password"
              onChange={(e: any) => onChangeSettingValue(e, "password")}
              value={profileInfo.password}
              labelPlacement="outside"
              classNames={clsasNames}
            />
          </div>
          <div>
            <Input
              label="Confirm Password"
              type="password"
              onChange={(e: any) => onChangeSettingValue(e, "confirm_password")}
              value={profileInfo.confirm_password}
              labelPlacement="outside"
              classNames={clsasNames}
            />
          </div>

          <div className="text-center pt-4">
            <Button
              disableRipple
              color="primary"
              className="rounded-md hover:-translate-y-1 px-12 shadow-md font-semibold"
              onClick={onUpdatePassword}
              size="lg"
            >
              Update Password
            </Button>
          </div>
        </div>

        {/* ***************************************************************** */}
        <div className="flex flex-col space-y-2">
          <div className="text-[24px] font-bold">Wallet</div>
          <div>
            <Input
              label="Private Key"
              type="password"
              onChange={(e: any) => onChangeSettingValue(e, "private_key")}
              value={profileInfo.private_key}
              labelPlacement="outside"
              classNames={clsasNames}
            />

            <div className="text-center pt-4">
              <Button
                disableRipple
                color="primary"
                className="rounded-md hover:-translate-y-1 px-12 shadow-md font-semibold"
                onClick={onUpdatePrivatekey}
                size="lg"
              >
                Update Private Key
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;