// import React, { useEffect, useState } from "react";
// import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure, Input } from "@nextui-org/react";
// import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection } from "@nextui-org/table";
// import { coloriseValue, getReadableSmallNumber } from "@/utils/number";
// import Link from "next/link";
// import { $selOpenTrade } from "@/store/OpenTradeStore";
// import { apiRoutes } from "@/helpers/apiSlugs";
// import apiService from "@/helpers/apiService";
// import { confirm } from "@/utils/confirm";

// export default function CloseTradeModal(props: CloseTradeModalProps) {
//   const { isOpen, onOpenChange, onClose, loadOpenTrades } = props;
//   const open_trade: any = $selOpenTrade.get();
//   const [closeQuantityAmount, setCloseQuantityAmount]: any = useState();
//   let token: any = '';
//   if (typeof window !== "undefined") {
//     token = localStorage.getItem('accessToken');
//   }

//   useEffect(() => {
//     setCloseQuantityAmount(0);
//   }, [open_trade])

//   const onSetAmountPercent = (percent: any) => {
//     if (percent === 100) {
//       setCloseQuantityAmount(open_trade.quantity);
//       return;
//     }

//     const close_quantity: any = open_trade.quantity * percent / 100;
//     setCloseQuantityAmount(close_quantity);
//   };

//   const onCloseOpenTrade = async () => {
//     if (!closeQuantityAmount) {
//       alert("Please input quantity to close!");
//       return;
//     }

//     if (closeQuantityAmount! > open_trade.quantity) {
//       alert("Quantity to close must be less than the quantity you have!");
//       return;
//     }

//     if (closeQuantityAmount! <= 0) {
//       alert("Quantity to close must be greater than 0!");
//       return;
//     }

//     if (!await confirm('Are you sure to close this trades?')) {
//       return;
//     }

//     const close_url = `${apiRoutes.open_trades.close_trade}/${open_trade.id}/close`;
//     const response = await apiService.post(close_url,
//       {
//         quantity: closeQuantityAmount
//       },
//       token
//     );
//     // const message = response.message;
//     // alert(message);
//     loadOpenTrades();
//     onClose();
//   }

//   const classNames = React.useMemo(
//     () => ({
//       th: ["text-default-500", "border-b", "border-divider", "text-center"],
//       td: ["text-center", "py-3"],
//     }),
//     [],
//   );

//   const columns = [
//     {
//       key: "lp_name",
//       label: "Pair LP",
//     }, {
//       key: "open_price_usd",
//       label: "Opening Price",
//     }, {
//       key: "buy_price_usd",
//       label: "Buying Price",
//     }, {
//       key: "cur_price_usd",
//       label: "Current Price",
//     }, {
//       key: "buy_sol_amount",
//       label: "Buying Sol Amount",
//     }, {
//       key: "quantity",
//       label: "Quantity",
//     }, {
//       key: "roi",
//       label: "ROI",
//     }, {
//       key: "pnl",
//       label: "PNL",
//     }, {
//       key: "action",
//       label: ""
//     }
//   ];

//   const renderCell = (open_trade: any, columnKey: any) => {
//     const cellValue = open_trade[columnKey];

//     switch (columnKey) {
//       case "lp_name":
//         return (
//           <>
//             <Link target="_blank" href={open_trade.lp_url}>{open_trade.lp_name}</Link>
//             {/* <br />
//             {open_trade.lp_id} */}
//           </>
//         );
//       case "open_price_usd":
//         return (
//           <>
//             $ {getReadableSmallNumber(open_trade.open_price_usd)}
//           </>
//         );
//       case "buy_price_usd":
//         return (
//           <>
//             $ {getReadableSmallNumber(open_trade.buy_price_usd)}
//           </>
//         );
//       case "cur_price_usd":
//         return (
//           <>
//             $ {getReadableSmallNumber(open_trade.cur_price_usd)}
//           </>
//         );
//       case "quantity":
//         return (
//           <>
//             {open_trade.quantity.toFixed(4)}
//           </>
//         );
//       case "roi":
//         return (
//           <>
//             {coloriseValue(open_trade.roi.toFixed(2) + '%', open_trade.roi)}
//           </>
//         );
//       case "pnl":
//         return (
//           <>
//             {coloriseValue(open_trade.pnl.toFixed(2) + '$', open_trade.pnl)}
//           </>
//         );
//       default:
//         return cellValue;
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       size="5xl"
//       isDismissable={false}
//       isKeyboardDismissDisabled={true}
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalBody>
//               <div className="pt-4">
//                 <Table
//                   aria-label="Open Trades"
//                   color="primary"
//                   isStriped
//                   removeWrapper
//                   classNames={classNames}
//                 >
//                   <TableHeader columns={columns}>
//                     {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
//                   </TableHeader>

//                   <TableBody>
//                     <TableRow key={open_trade.id}>
//                       {(columnKey) => <TableCell>{renderCell(open_trade, columnKey)}</TableCell>}
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </div>

//               <div>
//                 <div className="text-[18px] mb-2 text-center font-semibold">
//                   Close Trades
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <div className="">
//                     <Input
//                       type="Number"
//                       label="Quantity"
//                       labelPlacement="outside-left"
//                       classNames={{
//                         label: "font-semibold mr-2",
//                         input: "w-[200px] text-center",
//                       }}
//                       value={closeQuantityAmount}
//                       onValueChange={(value: any) => { setCloseQuantityAmount(value) }}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-center items-centerm mt-4 space-x-4">
//                   <Button
//                     color="success"
//                     className="text-white font-semibold"
//                     onPress={() => { onSetAmountPercent(25) }}
//                   >25%</Button>
//                   <Button
//                     color="success"
//                     className="text-white font-semibold"
//                     onPress={() => { onSetAmountPercent(50) }}
//                   >50%</Button>
//                   <Button
//                     color="success"
//                     className="text-white font-semibold"
//                     onPress={() => { onSetAmountPercent(100) }}
//                   >100%</Button>
//                 </div>
//               </div>
//             </ModalBody>
//             <ModalFooter className="justify-center">
//               <Button color="primary" onPress={onCloseOpenTrade}>
//                 Close Trade
//               </Button>
//               <Button color="danger" onPress={onClose}>
//                 Cancel
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// }
