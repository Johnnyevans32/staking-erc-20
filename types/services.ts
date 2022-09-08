import { providers, Signer } from 'ethers';
import { ERC20Contract } from '~/services/web3/erc20contract';
import { PoolContract } from '~/services/web3/poolcontract';

export interface IPoolContract {
  stakeAsset: (
    chainId: number,
    signer: Signer,
    amountInWei: string,
    assetAddress: string
  ) => Promise<void>;

  unstakeAsset: (
    chainId: number,
    signer: Signer,
    amountInWei: string,
    assetAddress: string
  ) => Promise<void>;

  getStakedBalance: (
    accountAddress: string,
    chainId: number,
    provider: any,
    tokenAddress?: string
  ) => Promise<any>;
}

export interface IERC20Contract {
  approveErcTxn: (
    erc20AssetAddress: string,
    signer: Signer,
    amountInWei: any,
    spenderAddress: string
  ) => Promise<void>;

  getErcTokenBalance: (
    ercTokenAddress: string,
    account: string,
    signerOrProvider: Signer | providers.Web3Provider
  ) => Promise<string>;
}
