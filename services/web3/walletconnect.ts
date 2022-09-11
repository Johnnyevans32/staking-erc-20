import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers } from 'ethers';

export class WalletConnectModule {
  static async setup(): Promise<any> {
    //  Create WalletConnect Provider
    const provider = new WalletConnectProvider({
      infuraId: "675849285dfa4748868f4a19b72bfb50"
    });

    //  Enable session (triggers QR Code modal)
    await provider.enable();
  }

  static async wrapProvider(provider: WalletConnectProvider): Promise<any> {
    //  Wrap with Web3Provider from ethers.js
    const web3Provider = new providers.Web3Provider(provider);
  }
}
