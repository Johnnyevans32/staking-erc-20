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
    logoUrl:
      'https://lh3.googleusercontent.com/3pwxYyiwivFCYflDJtyWDnJ3ZgYuN_wBQBHqCXbKh9tJTdTL1uOrY1VyxeC_yXLTNZk'
  }
];

export const PROVIDERSOPTIONS = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '675849285dfa4748868f4a19b72bfb50' // https://mainnet.infura.io/v3/
    }
  },
  walletlink: {
    package: WalletLink,
    options: {
      infuraId: '675849285dfa4748868f4a19b72bfb50' // https://mainnet.infura.io/v3/
    }
  }
};

export const SUPPORTEDNETWORKS = ['kovan'];

export const POOLACTION = {
  STAKE: 'stake',
  UNSTAKE: 'unstake'
};
