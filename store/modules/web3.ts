import { UtilsModule } from '~/services/utils';
import { constants, ethers, Signer } from 'ethers';
import _ from 'lodash';
import { parseInt } from 'lodash';
import {
  DEGTOKEN_CONTRACT,
  FAU_CONTRACT,
  WETH_CONTRACT
} from '~/services/constants/asset-info';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { Web3Store } from '~/types/store';
import { STORES, SUPPORTEDNETWORKS } from '~/services/constants';

@Module({
  // name: STORES.WEB3,
  stateFactory: true,
  namespaced: true
})
export default class Web3Module extends VuexModule implements Web3Store {
  public web3Modal: any = null;

  public web3Provider: any = null;
  public active: boolean = false;

  public account: string = constants.AddressZero;
  public signer: any = null;

  public chainId: number = 0;
  // public networkId: number = 0;

  public provider: any = null;

  @Mutation
  private _SET_WEB3_MODAL(web3Modal: any) {
    this.web3Modal = web3Modal;
  }
  @Mutation
  private _SET_WEB3_PROVIDER(web3Provider: any) {
    this.web3Provider = web3Provider;
  }
  @Mutation
  private _SET_ACTIVE(active: boolean) {
    this.active = active;
  }
  @Mutation
  private _SET_ACCOUNT(account: string) {
    this.account = account;
  }
  @Mutation
  private _SET_CHAINID(chainId: number) {
    this.chainId = chainId;
  }
  // @Mutation
  // private _SET_NETWORKID(networkId: number) {
  //   this.networkId = networkId;
  // }
  @Mutation
  private _SET_PROVIDER(provider: any) {
    this.provider = provider;
  }
  @Mutation
  private _SET_SIGNER(signer) {
    this.signer = signer;
  }

  @Action
  public setWeb3Modal(web3Modal: any): void {
    this.context.commit('_SET_WEB3_MODAL', web3Modal);
  }
  @Action({ rawError: true })
  public async connectWeb3Modal(providerId: string) {
    try {
      const provider = await (this.web3Modal as any).connectTo(providerId);

      provider.on('disconnect', async () => {
        await this.context.dispatch('resetApp');
      });
      provider.on('connect', (info: { chainId: string }) => {
        const chainId = parseInt(info.chainId, 10);
        this.context.dispatch('handleChainChanging', chainId);
      });
      provider.on('accountsChanged', async (accounts: any[]) => {
        this.context.commit('_SET_ACCOUNT', accounts[0]);
      });
      provider.on('chainChanged', async (chainId: any) => {
        try {
          const formattedChainId = UtilsModule.intChainId[chainId];
          await this.context.dispatch('checkIfNetworkIsNotSupportedAndFail', {
            chainId: formattedChainId
          });
          this.context.dispatch('handleChainChanging', formattedChainId);
        } catch (err) {
          console.log({ errrfromPro: err });
          this.context.dispatch(
            'openOrCloseNotification',
            { status: true, text: 'network not supported', color: 'danger' },
            { root: true }
          );
        }
      });
      provider.on('message', (message: any) => {
        console.log('message provider msg is', message);
      });
      provider.on('network', (network: any, oldNetwork: any) => {
        console.log('network chaangiinnnhghhh', network, oldNetwork);
        this.context.dispatch('handleChainChanging', network.chainId);
      });

      await provider.enable();

      const web3Provider = new ethers.providers.Web3Provider(provider, 'any');

      // await web3Provider.send('eth_requestAccounts', []);

      const signer = web3Provider.getSigner();

      const address = await signer.getAddress();
      const network = await web3Provider.getNetwork();

      await this.context.dispatch('checkIfNetworkIsNotSupportedAndFail', {
        chainId: network.chainId
      });

      web3Provider.pollingInterval = 12000;

      this.context.commit('_SET_ACCOUNT', address);

      this.context.dispatch('handleChainChanging', network.chainId);

      this.context.commit('_SET_PROVIDER', provider);

      this.context.commit('_SET_SIGNER', signer);
      this.context.commit('_SET_WEB3_PROVIDER', web3Provider);

      this.context.commit('_SET_ACTIVE', true);

      // const accounts = await signer.listAccounts();
    } catch (err) {
      console.log({ errrrfromvuex: err });
      throw err;
    }
  }
  @Action
  public handleChainChanging(chainId: number) {
    this.context.commit('_SET_CHAINID', chainId);

    const degTokenAddress = chainId
      ? DEGTOKEN_CONTRACT[chainId]?.address || constants.AddressZero
      : constants.AddressZero;

    const fauTokenAddress = chainId
      ? FAU_CONTRACT[chainId]?.address || constants.AddressZero
      : constants.AddressZero;

    const wethTokenAddress = chainId
      ? WETH_CONTRACT[chainId]?.address || constants.AddressZero
      : constants.AddressZero;

    this.context.dispatch('token/setDegToken', degTokenAddress, { root: true });
    this.context.dispatch('token/setFauToken', fauTokenAddress, { root: true });
    this.context.dispatch('token/setWethToken', wethTokenAddress, {
      root: true
    });
  }
  @Action
  public async resetApp() {
    try {
      await (this.web3Modal as any).clearCachedProvider();
    } catch (error) {
      console.error(error);
    }
    this.context.commit('_SET_ACCOUNT', constants.AddressZero);
    this.context.commit('_SET_ACTIVE', false);
    this.context.dispatch('handleChainChanging', 0);
    this.context.commit('_SET_WEB3_PROVIDER', UtilsModule.getLibrary());
  }
  @Action({ rawError: true })
  public async checkIfNetworkIsNotSupportedAndFail(options: {
    chainId: number;
    openNotification: boolean;
  }) {
    const { chainId } = options;
    if (!SUPPORTEDNETWORKS.includes(UtilsModule.getNetworkName(chainId))) {
      await this.context.dispatch('resetApp');
      throw new Error('network not supported');
    }
  }

  get shortenedAddress(): string {
    const address = this?.account;
    return address
      ? `${address.substring(0, 6)}...${address.slice(address.length - 4)}`
      : '';
  }
  get isConnected(): boolean {
    return this.active;
  }
  get networkName(): string {
    return UtilsModule.getNetworkName(this.chainId);
  }
  get getWeb3Modal(): string {
    return this.web3Modal;
  }

  get getWeb3Provider(): any {
    return this.web3Provider;
  }
}
// type RootState = ReturnType<typeof state>;
