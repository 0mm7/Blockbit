import { useEffect } from "react";
import { useRouter } from "next/router";
import { setAccessToken } from "@/store/AuthStore";

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    setAccessToken('');
    if (typeof window !== "undefined") {
      localStorage.setItem('accessToken', '');
      localStorage.setItem('loggedInUser', '');
    }
    // router.push('');
  }, [])

  return null;
};

export default Logout;

