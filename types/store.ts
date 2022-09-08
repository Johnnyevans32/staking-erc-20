export interface Web3Store {
  web3Modal: any;
  web3Provider: any;
  active: boolean;
  account: string;
  signer?: any;
  chainId: number;
  // networkId?: number;
  // provider?: any;

  setWeb3Modal(web3Modal: any): void;
  connectWeb3Modal(providerId: string): Promise<void>;
  handleChainChanging(chainId: number): void;
  resetApp(): Promise<void>;
}

export interface TokenStore {
  degTokenAddress: string;
  fauTokenAddress: string;
  wethTokenAddress: string;

  setFauToken(address: string): void;
  setDegToken(address: string): void;
  setWethToken(address: string): void;
}

export interface RootState {
  refreshAction: boolean;

  appTheme: string;
}
