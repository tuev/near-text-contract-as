/*
 * Example smart contract written in AssemblyScript
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://near-docs.io/develop/welcome
 *
 */

import { logging, PersistentMap } from 'near-sdk-as'

import { LiffUser } from './model';


const persistentLiffUSerMap = new PersistentMap<string, LiffUser>("liff-user-map");


export const get_wallet_addresses = (liffId: string): string[] | null => {
  if (!persistentLiffUSerMap.contains(liffId)) return [];
  return (persistentLiffUSerMap.get(liffId) as LiffUser).userWalletAddresses || [];
}

export const set_wallet_address = (liffId: string, walletAddress: string): void => {
  const liffUser = persistentLiffUSerMap.get(liffId);
  if (liffUser) {
    liffUser.addWalletAddress(walletAddress)
  } else {
    persistentLiffUSerMap.set(liffId, new LiffUser(liffId, walletAddress))
  }
}

export const delete_wallet_address = (liffId: string, walletAddress: string): void => {
  if (!persistentLiffUSerMap.contains(liffId)) return;
  const userWalletAddresses = persistentLiffUSerMap.get(liffId) as LiffUser;
  userWalletAddresses.removeWalletAddress(walletAddress)
}

export const delete_wallet_liffIf = (liffId: string): void => {
  if (!persistentLiffUSerMap.contains(liffId)) return;
  persistentLiffUSerMap.delete(liffId);
}
