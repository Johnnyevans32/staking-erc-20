import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';

export class WalletConnectModule {
  static async setup(): Promise<any> {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      infuraId: process.env.INFURA_ID
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();
  }

  static async wrapProvider(provider: WalletConnectProvider): Promise<any> {
    //  Wrap with Web3Provider from ethers.js
    const web3Provider = new providers.Web3Provider(provider);
  }
}
