import { atom } from "nanostores";

export const $selOpenTrade = atom();

export function setSelOpenTrade(selOpenTrade: any) {
  $selOpenTrade.set(selOpenTrade);
}
