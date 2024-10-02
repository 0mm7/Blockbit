const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiRoutes = {
  settings: {
    list: "/settings",
    update_setting: "/settings",
    remove_profile_image: "/settings/remove_profile_image",
  },
  pending_pools: {
    list: "/pending_pools",
    buy: "/pending_pools/buy/",
    delete: "/pending_pools/",
  },
  open_pools: {
    list: "/open_pools",
    sell: "/open_pools/sell/",
    delete: "/open_pools/",
  },
  closed_pools: {
    list: "/closed_pools",
    delete: "/closed_pools/",
  },
  user: {
    signin: "/auth/signin",
    update_password: "/auth",
    update_private_key: "/auth",
    dashboard_info: "/users",
  },
  admin: {
    data: "/admin/",
  },
  wallet: {
    data: "/wallet/",
    update_copied: "/wallet/update_copied",
  },
};

export default baseURL;
