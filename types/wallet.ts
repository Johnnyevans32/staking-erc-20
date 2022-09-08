export interface WalletTokenAsset {
  address: string;
  tokenasset: TokenAsset;
}

export interface TokenAsset {
  name: string;
  code: string;
  coinType: CoinType;
  contractAddress?: string;
  image?: string;
}

export enum CoinType {
  ERC_20 = 'erc_20',
  BEP_20 = 'bep_20',
  ETH = 'eth',
  BNB = 'bnb',
  BTC = 'btc'
}
