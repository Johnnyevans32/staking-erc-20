import WalletConnectProvider from '@walletconnect/web3-provider';
import { WalletLink } from 'walletlink';

export const STORES = {
  WEB3: 'web3',
  TOKEN: 'token'
};

export const WALLETPROVIDERS = [
  {
    name: 'MetaMask',
    id: 'injected',
    logoUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1024px-MetaMask_Fox.svg.png?20201112074605'
  },
  {
    name: 'Wallet Connect',
    id: 'walletconnect',
    logoUrl: 'https://docs.walletconnect.com/img/walletconnect-logo.svg'
  },
  {
    name: 'Wallet Link',
    id: 'walletlink',
    logoUrl: 'https://infinitywallet.io/images/coins/chainlink.svg'
  }
];

export const INFURA_ID = "675849285dfa4748868f4a19b72bfb50";

export const PROVIDERSOPTIONS = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_ID
    }
  },
  walletlink: {
    package: WalletLink,
    options: {
      infuraId: INFURA_ID
    }
  }
};

export const SUPPORTEDNETWORKS = ['kovan'];

export const POOLACTION = {
  STAKE: 'stake',
  UNSTAKE: 'unstake'
};

export enum APISTATES {
  IDLE = 'idle',
  PENDING = 'pending',
  REJECTED = 'rejected',
  RESOLVED = 'resolved'
}
