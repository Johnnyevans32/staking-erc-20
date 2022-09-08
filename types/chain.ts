import { Contract } from 'ethers';
export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
}

export interface ITokenCrt extends Contract {
  stakeTokens(amount: any, tokenAddress: string): Promise<any>;
  tokenIsAllowed(tokenAddress: string): boolean;

  unstakeTokens(token: string): Promise<any>;

  getUserSingleTokenValue(accountAddress: string, tokenAddress: string): Promise<any>;

  getUserTotalValue(accountAddress: string): Promise<any>;
}
