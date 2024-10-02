import { ISettingInfo, defaultSettingInfo } from "@/types/setting";
import { atom } from "nanostores";

export const $setting = atom<ISettingInfo>(defaultSettingInfo);

export function setSetting(setting: ISettingInfo) {
  $setting.set(setting);
}
