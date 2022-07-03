import { storage, u128, PersistentMap, context } from "near-sdk-as";

// Class and vector holding donations
@nearBindgen
export class LiffUser {
  private userLiffId: string;
  private walletAddresses: string[] = [];
  constructor(
    userLiffId: string,
    walletAddress: string
  ) {
    this.userLiffId = userLiffId;
    if (walletAddress) {
      this.addWalletAddress(walletAddress)
    }
  }

  get userWalletAddresses(): string[] {
    return this.walletAddresses;
  }

  addWalletAddress(address: string): void {
    if (this.walletAddresses.includes(address)) return;
    this.walletAddresses.push(address)
  }

  removeWalletAddress(address: string): void {
    const indexWallet = this.walletAddresses.indexOf(address)
    if (indexWallet < 0) return;
    this.walletAddresses.splice(indexWallet, 1);
  }
}
