import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import React, { useState } from "react";
import IMG_LOGO from '@/assets/images/logo.png';
import Image from "next/image";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/store/AuthStore";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  const onUpdateSetting = () => {
    apiService.post(
      apiRoutes.user.signin,
      {
        username: username,
        password: password
      }
    ).then((res: any) => {
      if (res.message) {
        alert(res.message);
        return;
      }

      if (typeof window !== "undefined") {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('loggedInUser', JSON.stringify(res));
      }
      setAccessToken(res.accessToken);

      // router.push('/trades/pending');
    })
  }

  return (
    <>
      <div className="mt-20">
        <div className="mt-10 mb-20 text-center flex items-center justify-center">
          <Image src={IMG_LOGO} alt="Logo" className="relative mr-10 w-[150px]" />
        </div>

        <div
          className="text-[36px] font-semibold text-center text-white"
        >Welcome, Please Login</div>

        <div className="flex space-x-4 w-[500px] mx-auto mt-10">
          <Input
            label="Username"
            type="text"
            onChange={(e: any) => setUsername(e.target.value)}
            value={username}
            labelPlacement="outside"
          />

          <Input
            label="Password"
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            value={password}
            labelPlacement="outside"
          />
        </div>

        <div className="text-center mt-10">
          <Button
            disableRipple
            color="primary"
            className="rounded-md hover:-translate-y-1 px-12 shadow-md font-semibold"
            onClick={onUpdateSetting}
            size="lg"
          >
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;