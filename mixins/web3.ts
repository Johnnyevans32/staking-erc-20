import { Component, Vue } from 'nuxt-property-decorator';
import { mapState, mapGetters } from 'vuex';
import { constants, ethers } from 'ethers';

import _ from 'lodash';

import 'reflect-metadata';
import { container, inject } from 'inversify-props';

import { IERC20Contract, IPoolContract } from '~/types/services';

import { ERC20Contract } from '~/services/web3/erc20contract';
import { PoolContract } from '~/services/web3/poolcontract';
container.bind<IERC20Contract>('ERC20Contract').to(ERC20Contract);
container.bind<IPoolContract>('PoolContract').to(PoolContract);

@Component({
  computed: {
    ...mapState('web3', ['web3Modal', 'chainId', 'account', 'signer']),
    ...mapGetters('web3', [
      'shortenedAddress',
      'isConnected',
      'networkName',
      'getWeb3Modal',
      'getWeb3Provider'
    ]),
    ...mapState('token', [
      'degTokenAddress',
      'fauTokenAddress',
      'wethTokenAddress'
    ])
  }
})
class Web3Mixin extends Vue {
  public web3Modal!: any;
  public chainId!: number;
  public account!: string;
  public signer!: any;

  public shortenedAddress!: string;
  public isConnected!: boolean;
  public networkName!: string;
  public getWeb3Modal!: any;
  public getWeb3Provider!: string;

  public degTokenAddress!: string;
  public fauTokenAddress!: string;
  public wethTokenAddress!: string;

  @inject('ERC20Contract') public readonly erc20Service!: IERC20Contract;

  @inject('PoolContract') public readonly poolService!: IPoolContract;

  formatTokenBal(tokenBalance: ethers.BigNumberish): string {
    // Format the DAI for displaying to the user
    return ethers.utils.formatUnits(tokenBalance, 18);
  }
  getAssetAddress(assetAddressKey: string): string {
    return this[assetAddressKey] || constants.AddressZero;
  }
}

export default Web3Mixin;
