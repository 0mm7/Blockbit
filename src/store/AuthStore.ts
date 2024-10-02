import { atom } from "nanostores";

export const $accessToken = atom('');

export function setAccessToken(accessToken: any) {
  $accessToken.set(accessToken);
}
