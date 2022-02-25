import { constants } from 'ethers';
import _ from 'lodash';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { TokenStore } from '~/types/store';
import { STORES } from '~/services/constants';
import { ASSETS } from '~/services/constants/asset-info';
import { Asset } from '~/types/web3';

@Module({
  // name: STORES.TOKEN,
  stateFactory: true,
  namespaced: true
})
export default class TokenModule extends VuexModule implements TokenStore {
  public assets: Asset[] = ASSETS;
  public degTokenAddress: string = constants.AddressZero;
  public fauTokenAddress: string = constants.AddressZero;
  public wethTokenAddress: string = constants.AddressZero;

  @Mutation
  private _SET_DEG_TOKEN(address: string) {
    this.degTokenAddress = address;
  }
  @Mutation
  private _SET_FAU_TOKEN(address: string) {
    this.fauTokenAddress = address;
  }
  @Mutation
  private _SET_WETH_TOKEN(address: string) {
    this.wethTokenAddress = address;
  }
  @Mutation
  private _SET_ASSETS(assets: Asset[]) {
    this.assets = assets;
  }

  @Action
  public setDegToken(address: string) {
    this.context.commit('_SET_DEG_TOKEN', address);
  }
  @Action
  public setFauToken(address: string) {
    this.context.commit('_SET_FAU_TOKEN', address);
  }
  @Action
  public setWethToken(address: string) {
    this.context.commit('_SET_WETH_TOKEN', address);
  }
  @Action
  public setAssets(assets: Asset[]) {
    this.context.commit('_SET_ASSETS', assets);
  }
}
