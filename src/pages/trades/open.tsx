import React, { useEffect, useRef, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection } from "@nextui-org/table";
import apiService from "@/helpers/apiService";
import { apiRoutes } from "@/helpers/apiSlugs";
import Link from "next/link";
import { coloriseValue, getReadableSmallNumber } from "@/utils/number";
import { getDiffTimeInFormat } from "@/utils/time";

import Image from "next/image";
import IMG_SETTING from '@/assets/images/setting.svg';
import IMG_SOL from '@/assets/images/sol.png';
import IMG_OPENING from '@/assets/images/opening.png';
import IMG_EAGLE from '@/assets/images/eagle.png';
import IMG_CLOSE from '@/assets/images/close.png';
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectComponent from "@/components/wallet/connect";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { useRouter } from "next/router";

const OpenTrades = () => {
  const router = useRouter();

  const [openPools, setOpenPools] = useState([]);
  const [selectedPoolID, setSelectedPoolID] = useState(0);
  const [confirmQuickSell, setConfirmQuickSell] = useState(false);
  const [confirmDeleteOpenPool, setConfirmDeleteOpenPool] = useState(false);

  const [checkedLogin, setCheckedLogin] = useState(false);
  const wallet = useWallet();
  const publicKey = wallet.publicKey?.toString();
  const publicKeyRef = useRef(publicKey);
  const [bbt_public_key, setBBTPublicKey]: any = useState("");

  const totalInvestedSol = openPools ? parseFloat(openPools.reduce((initial, open_pool: any) => {
    return initial + parseFloat(open_pool.invested_sol);
  }, 0).toFixed(9)) : 0;

  const totalCurrentSol = openPools ? parseFloat(openPools.reduce((initial, open_pool: any) => {
    return initial + parseFloat(open_pool.current_sol);
  }, 0).toFixed(9)) : 0;

  let token: any = '';
  if (typeof window !== "undefined") {
    token = localStorage.getItem('accessToken');
  }
  const columns = [
    {
      key: "pool_name",
      label: "Pair LP",
    },
    {
      key: "time_live",
      label: "Created",
    },
    {
      key: "invested_sol",
      label: "Invested",
    },
    {
      key: "current_sol",
      label: "Current",
    },
    {
      key: "roi",
      label: "ROI",
    },
    {
      key: "pnl",
      label: "PNL",
    },
    {
      key: "status",
      label: "Status"
    },
    {
      key: "action",
      label: ""
    }
  ];

  const loadOpenPools = async () => {
    const response = await apiService.get(
      apiRoutes.open_pools.list,
      publicKey
    );

    // if (response.bbt_key_not_exist || response.is_wallet_not_copied) {
    //   await router.push('/wallet');
    // }

    if (response === 401) {
      // await router.push('');
      return;
    }

    if (response.open_pools) {
      setOpenPools(response.open_pools);
    }

    setBBTPublicKey(response.bbt_public_key);
  };

  const quickSellPool = async () => {
    const sell_url = `${apiRoutes.open_pools.sell}${selectedPoolID}`;
    await apiService.post(sell_url, {}, publicKey).then((response) => {
      if (response.error) {
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

      loadOpenPools();
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

  const onDeleteOpenPool = async (pool_id: number) => {
    setSelectedPoolID(pool_id);
    setConfirmDeleteOpenPool(true);
  }

  const deleteOpenPool = async () => {
    const delete_url = `${apiRoutes.open_pools.delete}${selectedPoolID}`;
    await apiService.delete(delete_url, publicKey).then((response) => {
      if (response.error) {
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

      loadOpenPools();
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

  const onQuickSellOpenPool = async (pool_id: number) => {
    setSelectedPoolID(pool_id);
    setConfirmQuickSell(true);
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
    publicKeyRef.current = publicKey!;
    if (publicKey) {
      loadOpenPools();
      const intervalId = setInterval(loadOpenPools, 1000);
      return () => clearInterval(intervalId);
    } else {
      if (checkedLogin) {
        // router.push('/');
      }
    }
  }, [publicKey]);

  const renderCell = (open_pool: any, columnKey: any) => {
    const cellValue = open_pool[columnKey];
    const pubKeySlug = bbt_public_key ? `?maker=${bbt_public_key}` : '';
    const pool_url = `${open_pool.open_pool.pool_url}${pubKeySlug}`;
    const buy_tx_url = `https://solscan.io/tx/${open_pool.buy_tx_id}`;

    switch (columnKey) {
      case "pool_name":
        return (
          <>
            <Link target="_blank" href={pool_url}>
              <div className="flex items-center gap-2">
                <img src={open_pool.open_pool.token_logo_url} alt="" width="24" className="rounded-full" />
                {open_pool.open_pool.pool_name}
              </div>
            </Link>
          </>
        );
      case "time_live":
        return (
          <>
            {getDiffTimeInFormat(open_pool.open_pool.pool_open_time)}
          </>
        );
      case "created_at":
        return (
          <>
            {getDiffTimeInFormat(open_pool.open_pool.createdAt)}
          </>
        );

      case "invested_sol":
        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={IMG_SOL} alt="Solana Icon" width={20} height={20} />
              {getReadableSmallNumber(parseFloat(open_pool.invested_sol))}
            </div>
          </>
        );
      case "current_sol":
        return (
          <>
            <div className="flex items-center gap-2">
              <Image src={IMG_SOL} alt="Solana Icon" width={20} height={20} />
              {getReadableSmallNumber(parseFloat(open_pool.current_sol))}
            </div>
          </>
        );
      case "roi":
        return (
          <>
            {coloriseValue(open_pool.roi.toFixed(2) + '%', open_pool.roi)}
          </>
        );
      case "pnl":
        return (
          <>
            {coloriseValue(open_pool.pnl.toFixed(2) + '$', open_pool.pnl)}
          </>
        );
      case "status":
        return (
          <>
            {
              open_pool.status === 0 ?
                <p className="font-bold text-[#D9A900]">
                  Waiting...
                </p>
                : open_pool.status === 1 ?
                  <p className="font-bold text-[#17C654]">TP Selling!</p>
                  : open_pool.status === 2 ?
                    <p className="font-bold text-[#FF3A3A]">SL Selling!</p>
                    : <p className="font-bold text-[#FF3A3A]">TSL Selling!</p>
            }
          </>
        );
      case "action":
        return (
          <>
            <div className="flex items-center justify-center">
              <Link target="_blank" href={buy_tx_url} className="mr-6">
                <Image src={IMG_OPENING} alt="" width={19} height={19}
                  className="w-[19px] h-[19px]"
                />
              </Link>
              <Link target="_blank" href={pool_url} className="mr-6">
                <Image src={IMG_EAGLE} alt="" width={19}
                  height={24} className="w-[19px] h-[24px]"
                />
              </Link>

              <button className="bg-[#2B2B2B] rounded-[52px] py-[6px]
                px-[24px] text-[#FFFFFF] mr-2"
                onClick={() => onQuickSellOpenPool(open_pool.id)}
              >Quick Sell</button>

              {/* <Image
                src={IMG_CLOSE}
                alt=""
                width={19}
                height={19}
                className="w-[24px] h-[24px] mt-[2px] ml-3"
                onClick={() => onDeleteOpenPool(open_pool.id)}
              /> */}
            </div>
          </>
        );
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
  let col_index = 1;

  return (
    <>
      {/* {publicKey ? */}
        <div className="z-[1] h-full flex flex-col">
          <div className="mx-8 mt-10">
            <div>
              <ConfirmDialog
                title="Sell Trade"
                open={confirmQuickSell}
                onClose={() => setConfirmQuickSell(false)}
                onConfirm={quickSellPool}
              >
                Are you sure you want to sell this pool?
              </ConfirmDialog>
            </div>

            <div>
              <ConfirmDialog
                title="Delete Trade"
                open={confirmDeleteOpenPool}
                onClose={() => setConfirmDeleteOpenPool(false)}
                onConfirm={deleteOpenPool}
              >
                Are you sure you want to delete this pool?
              </ConfirmDialog>
            </div>

            <h1 className="text-lg font-bold text-white uppercase">
              Open positions
            </h1>

            <p className="text-sm font-bold text-white mt-2 opacity-[0.57]">
              Presenting your current open positions, updated in real-time
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

                <div className="flex items-center gap-4 text-[#FFFFFF91]">
                  {/* <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                    />
                    <div
                      className="relative w-9 h-3 bg-gray-200 rounded-[14px] peer dark:bg-gray-700 
                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] 
                    after:absolute after:-top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all 
                     peer-checked:bg-[#28DEAF]"
                    ></div>
                    <span className="text-sm font-medium text-grfay-900 dark:text-gray-300 pl-3">
                      Show hidden
                    </span>
                  </label> */}
                  <p className="text-[13px] font-bold">
                    Open position: {openPools.length}
                  </p>
                  <p className="text-[13px] font-bold">
                    Total Invested SOL: {totalInvestedSol}
                  </p>
                  <p className="text-[13px] font-bold">
                    Total Current SOL: {totalCurrentSol}
                  </p>
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
            {openPools ?
              <Table
                aria-label="Open Trades"
                color="primary"
                isStriped
                removeWrapper
                classNames={classNames}
              >
                <TableHeader columns={columns}>
                  {(column) =>
                    <TableColumn
                      key={column.key}
                      className={`text-[#858686] leading-3 border-t border-[#515151]
                    text-left bg-[#121212] h-[45px] text-[13px] font-bold
                    ${col_index++ === columns.length ? "w-[300px]" : ""}`}
                    >{column.label}</TableColumn>
                  }
                </TableHeader>

                <TableBody items={openPools}>
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
              : null
            }
          </div>
        </div>
        {/* :
        //<ConnectComponent />
        null
      } */}
    </>
  );
};

export default OpenTrades;