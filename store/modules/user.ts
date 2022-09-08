import { constants } from 'ethers';
import _ from 'lodash';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { LoginResponse, User } from '~/types/auth';
import { UserStore } from '~/types/store';
import { $axios } from '~/services/axios';

@Module({
  // name: STORES.TOKEN,
  stateFactory: true,
  namespaced: true
})
export default class UserModule extends VuexModule implements UserStore {
  public accessToken!: string;
  public refreshToken!: string;
  public userData!: User;

  @Mutation
  private _SET_USER_ACCESS_TOKEN(token: string) {
    this.accessToken = token;
  }
  @Mutation
  private _SET_USER_REFRESH_TOKEN(token: string) {
    this.refreshToken = token;
  }
  @Mutation
  private _SET_USER_DATA(userData: User) {
    this.userData = userData;
  }

  @Action
  public setUserData(loginRes: LoginResponse) {
    $axios.setToken(loginRes.accessToken, 'Bearer');
    this.context.commit('_SET_USER_DATA', loginRes.user);
    this.context.commit('_SET_USER_ACCESS_TOKEN', loginRes.accessToken);
    this.context.commit('_SET_USER_REFRESH_TOKEN', loginRes.refreshToken);
  }
  @Action
  public setUserToken(token: string) {
    this.context.commit('_SET_USER_TOKEN', token);
  }

  @Action
  public unsetUserData(loginRes: LoginResponse) {
    $axios.setToken(false);
    this.context.commit('_SET_USER_DATA', null);
    this.context.commit('_SET_USER_ACCESS_TOKEN', null);
    this.context.commit('_SET_USER_REFRESH_TOKEN', null);
  }

  get name(): string {
    return `${this.userData.name.first} ${this.userData.name.last}`;
  }

  get username(): string {
    return this.userData.username;
  }
}
