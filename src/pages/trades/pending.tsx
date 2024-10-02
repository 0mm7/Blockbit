/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection } from "@nextui-org/table";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import Link from "next/link";
import { getDiffTimeInFormat } from "@/utils/time";
import { coloriseValue } from "@/utils/number";
import { Button } from "@nextui-org/react";

import Image from "next/image";

import IMG_SETTING from '@/assets/images/setting.svg';
import IMG_SOL from '@/assets/images/sol.png';
import IMG_CHECK from '@/assets/images/check.png';
import IMG_CROSS from '@/assets/images/cross.png';
import IMG_EAGLE from '@/assets/images/eagle.png';
import { useWallet } from "@solana/wallet-adapter-react";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { toast } from "react-toastify";
import ConnectComponent from "@/components/wallet/connect";
import { useRouter } from "next/router";

const PendingPools = () => {
  const router = useRouter();
  const [pendingPools, setPendingPools] = useState([]);
  const [setting, setSetting]: any = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [selectedPoolID, setSelectedPoolID] = useState(0);
  const [confirmBuy, setConfirmBuy] = useState(false);
  const [selectedBuyPoolID, setSelectedBuyPoolID] = useState(0);
  const [quick_buy_amount, setQuickBuyAmount] = useState(0.1);

  const [checkedLogin, setCheckedLogin] = useState(false);

  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString();
  const publicKeyRef = useRef(publicKey);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");

  let token: any = '';
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }

  const columns = [
    {
      key: "pool_name",
      label: "Pair",
    },
    {
      key: "time_live",
      label: "Created",
    },
    {
      key: "audit",
      label: "Contract Audit",
    },
    {
      key: "pooled_sol",
      label: "Pooled SOL",
    },
    {
      key: "pooled_token",
      label: "Pooled Token",
    },
    {
      key: "price_24h",
      label: "24H Change (%)",
    },
    {
      key: "lp_burned",
      label: "LP Burned",
    },
    {
      key: "status",
      label: "Status",
    },
    {
      key: "action",
      label: ""
    }
  ];

  const loadPendingPools = async () => {
    const response = await apiService.get(
      apiRoutes.pending_pools.list,
      publicKey
    );

    // if (response.bbt_key_not_exist || response.is_wallet_not_copied) {
    //   await router.push('/wallet');
    // }

    if (response === 401) {
      // await router.push('');
      return;
    }

    if (response.pending_pools) {
      setPendingPools(response.pending_pools);
    }

    if (response.setting) {
      setSetting(response.setting);
    }

    setBBTPublicKey(response.bbt_public_key);
  };

  const cancelPool = async () => {
    const delete_url = `${apiRoutes.pending_pools.delete}${selectedPoolID}`;
    await apiService.delete(delete_url, publicKey).then((response) => {
      if (!response.success) {
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
      }
      // loadPendingPools();
      toast.success(
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
    });
  }

  const onCancelPendingPool = async (pool_id: number) => {
    setSelectedPoolID(pool_id);
    setConfirmDelete(true);
  }

  const buyPool = async () => {
    // const buy_url = `${apiRoutes.pending_pools.buy}${selectedBuyPoolID}`;
    // await apiService.post(
    //   buy_url,
    //   { buy_amount: quick_buy_amount },
    //   publicKey
    // ).then((response) => {
    //   if (response.error) {
    //     toast.error(
    //       <div className="text-[14px] font-bold text-white">
    //         {response.message}
    //       </div>,
    //       {
    //         position: "top-right",
    //         // padding: "0px",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         style: {
    //           backgroundColor: "#1a202c",
    //           top: "70px",
    //         },
    //       }
    //     );
    //     return;
    //   }

    //   loadPendingPools();
    //   toast.success(
    //     <div className="text-[14px] font-bold text-white">
    //       {response.message}
    //     </div>,
    //     {
    //       position: "top-right",
    //       // padding: "0px",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       style: {
    //         backgroundColor: "#1a202c",
    //         top: "70px",
    //       },
    //     }
    //   );
    // });
  }

  const onQuickBuyPendingPool = async (pool_id: number) => {
    setSelectedBuyPoolID(pool_id);
    setConfirmBuy(true);
  }

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
    // publicKeyRef.current = publicKey!;
    // if (publicKey) {
    //   loadPendingPools();
    //   const intervalId = setInterval(loadPendingPools, 1000);
    //   return () => clearInterval(intervalId);
    // } else {
    //   if (checkedLogin) {
    //     router.push('/');
    //   }
    // }
  }, [publicKey]);

  const renderCell = (pending_pool: any, columnKey: any) => {
    const cellValue = pending_pool[columnKey];
    const pubKeySlug = bbt_public_key ? `?maker=${bbt_public_key}` : '';
    const pool_url = `${pending_pool.pending_pool.pool_url}${pubKeySlug}`;

    switch (columnKey) {
      case "pool_name":
        return (
          <>
            <Link target="_blank" href={pool_url}>
              <div className="flex items-center gap-2">
                <img src={pending_pool.pending_pool.token_logo_url} alt="" width="24" className="rounded-full" />
                {pending_pool.pending_pool.pool_name}
              </div>
            </Link>
          </>
        );
      case "time_live":
        return (
          <>
            {getDiffTimeInFormat(pending_pool.pending_pool.pool_open_time)}
          </>
        );

      case "price_24h":
        return (
          <>
            {
              coloriseValue(
                pending_pool.pending_pool.price_24h.toFixed(2) + '%',
                pending_pool.pending_pool.price_24h,
              )
            }
          </>
        );
      case "lp_burned":
        return (
          <>
            {
              pending_pool.pending_pool.lp_burned_percent > 95
                ?
                <div className="flex items-center gap-1">
                  <p className="font-bold text-[#FFFFFF]">
                    Burned
                  </p>
                  <Image src={IMG_CHECK} alt="" className="w-[12px] h-[12px]" />
                </div>
                :
                <div className="flex items-center gap-1">
                  <p className="font-bold text-[#FFFFFF]">
                    Not burned
                  </p>
                  <Image src={IMG_CROSS} alt="" className="w-[12px] h-[12px]" />
                </div>
            }
          </>
        );
      case "pooled_sol":
        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={IMG_SOL} alt="Solana Icon" width={20} height={20} />
              {pending_pool.pending_pool.pooled_sol.toFixed(4)}
            </div>
          </>
        );
      case "pooled_token":
        return (
          <>
            {`${pending_pool.pending_pool.pooled_token_percent.toFixed(2)} %`}
          </>
        );
      case "action":
        return (
          <>
            <div className="flex items-center justify-end">
              <Link target="_blank" href={pool_url} className="mr-6">
                <Image src={IMG_EAGLE} alt="" width={19} height={24} className="w-[19px] h-[24px]" />
              </Link>
              <Button
                size="sm"
                color="success"
                className="bg-[#2B2B2B] rounded-[52px] text-[13px]
                py-[6px] px-[24px] text-[#FFFFFF] mr-2"
                onClick={() => onQuickBuyPendingPool(pending_pool.id)}
              >Quick Buy</Button>
              <Button
                size="sm"
                color="danger"
                className="bg-[#2B2B2B] rounded-[52px] text-[13px]
                py-[6px] px-[24px] text-[#FFFFFF]"
                onClick={() => onCancelPendingPool(pending_pool.id)}
              >Cancel</Button>
            </div>
          </>
        );
      case "status":
        return (
          <>
            {
              pending_pool.status === 0 ?
                <p className="font-bold text-[#D9A900]">
                  Waiting...
                </p>
                :
                <p className="font-bold text-[#17C654]">
                  Buying!
                </p>
            }
          </>
        );
      case "audit":
        return (
          <>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <p className="font-medium text-[12px]">Can Freeze</p>

                <Image
                  src={pending_pool.pending_pool.can_freeze ? IMG_CROSS : IMG_CHECK}
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>

              <div className="flex items-center gap-1">
                <p className="font-medium text-[12px]">Can Mint</p>
                <Image
                  src={pending_pool.pending_pool.can_mint ? IMG_CROSS : IMG_CHECK}
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>

              <div className="flex items-center gap-1">
                <p className="font-medium text-[12px]">Whale Check</p>

                <Image
                  src={pending_pool.pending_pool.top_10_percent > setting.buy_whale_check_percent ? IMG_CROSS : IMG_CHECK}
                  alt=""
                  width={10}
                  height={10}
                  className="w-[10px] h-[10px] rounded-full"
                />
              </div>
            </div>
          </>
        )
      default:
        return cellValue;
    }
  };

  const classNames = React.useMemo(
    () => ({
      th: ["text-default-500", "border-b", "border-divider", "text-center"],
      td: ["text-center", "py-3"],
    }),
    [],
  );

  let row_index = 0;

  return (
    <>
      {/* {publicKey ? */}
        <div className="z-[1] h-full flex flex-col">
          <div>
            <ConfirmDialog
              title="Cancel Trade"
              open={confirmDelete}
              onClose={() => setConfirmDelete(false)}
              onConfirm={cancelPool}
            >
              Are you sure you want to cancel this pool?
            </ConfirmDialog>
          </div>

          <div>
            <ConfirmDialog
              title="Buy Trade"
              open={confirmBuy}
              onClose={() => setConfirmBuy(false)}
              onConfirm={buyPool}
            >
              Are you sure you want to buy this pool?
            </ConfirmDialog>
          </div>

          <div className="mx-8 mt-10 z-10">
            <h1 className="text-lg font-bold text-white uppercase" >
              PENDING POOL
            </h1>

            <p className="text-sm font-bold text-white mt-2 opacity-[0.57]">
              Scanning tokens from the Solana blockchain based on your settings and preferences.
            </p>

            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2">
                {/* <div className="relative">
                  <div
                    className="border rounded-[48px] flex justify-between gap-2 items-center px-3 py-1.5 cursor-pointer mr-6"
                  // onClick={handleButtonClick}
                  >
                    <Image
                      src={IMG_FILTER}
                      alt="Filter"
                      className="w-[16px] h-[16px]"
                    />
                    <span className="text-white font-bold text-[13px]">Filter</span>
                    <Image
                      src={IMG_DROPDOWN}
                      alt="Dropdown"
                      className="mt-1 w-[10px] h-[10px]"
                    />
                  </div>
                </div> */}

                <div className="flex items-center">
                  <div className="text-white text-[14px] text-bold mr-2">Quick Buy :</div>
                  <div className="bg-[#0F0F0F] border  border-[#7A7A7A] flex w-[150px] h-[34px] gap-1
                    rounded-[20px] items-center px-1">
                    <div className="flex items-center gap-1 px-2 w-fit">
                      <Image src={IMG_SOL} width={25} height={25} alt="image" />
                    </div>
                    <div className="h-6 w-[2px] bg-[#404040]"></div>

                    <div className="w-full px-1">
                      <input
                        type="number"
                        className=" text-white text-[14px] bg-transparent border-none outline-none hover:border-none p-1.5 w-full"
                        step="0.1"
                        min="0"
                        value={quick_buy_amount}
                        onChange={(e) => setQuickBuyAmount(parseFloat(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Link href="/settings">
                <div
                  className="border cursor-pointer rounded-[48px] flex
                  justify-between gap-2 items-center px-3 py-1.5"
                >
                  <Image src={IMG_SETTING} alt="" className="w-[24px] h-[24px]" />
                  <span className="text-white text-[13px] font-bold">Settings</span>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-5 mx-4 h-full flex-1 relative overflow-auto z-40  custom-scrollbar">
            <Table
              aria-label="Pending Pools"
              color="primary"
              isStriped
              removeWrapper
              classNames={classNames}
            >
              <TableHeader
                columns={columns}
              >
                {(column) =>
                  <TableColumn
                    key={column.key}
                    className="text-[#858686] leading-3
                      border-t border-[#515151] text-left
                      bg-[#121212] h-[45px] text-[13px] font-bold"
                  >{column.label}</TableColumn>
                }
              </TableHeader>

              <TableBody items={pendingPools}>
                {(item: any) => (
                  <TableRow
                    key={item.id}
                    className={`leading-6 cursor-pointer h-[70px]
                      ${row_index++ % 2 == 0 ? "bg-[#141414]" : "bg-[#0F0F0F]"}
                      `}
                  >
                    {(columnKey) =>
                      <TableCell
                        className="text-white text-[13px] font-bold
                          uppercase gap-1 text-left"
                      >{renderCell(item, columnKey)}</TableCell>
                    }
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* :
        //<ConnectComponent />
        null
      } */}
    </>
  );
};

export default PendingPools;