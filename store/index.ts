import Vuex, { MutationTree, ActionTree } from 'vuex';

import Web3Module from '~/store/modules/web3';
import TokenModule from '~/store/modules/token';
import { RootState } from '~/types/store';
import UserModule from './modules/user';

const state = () => ({
  refreshAction: false,

  appTheme: 'light'
});

const mutations = {
  SET_REFRESH_ACTION(state: RootState, refreshAction: boolean) {
    state.refreshAction = refreshAction;
  },

  SET_APP_THEME(state: RootState, theme: string) {
    state.appTheme = theme;
  }
};
const actions: ActionTree<RootState, RootState> = {
  updateRefreshAction({ commit, state }) {
    commit('SET_REFRESH_ACTION', !state.refreshAction);
  },
  toggleAppTheme({ commit }, theme: string) {
    commit('SET_APP_THEME', theme);
  }
};
const getters = {};

export default () =>
  new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
      web3: Web3Module,
      token: TokenModule,
      user: UserModule
    }
  });
