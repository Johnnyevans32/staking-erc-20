// access $axios from the app context

import { ERC20Contract } from '~/services/web3/erc20contract';
import { PoolContract } from '~/services/web3/poolcontract';

// https://nuxtjs.org/docs/2.x/internals-glossary/context/

export default (
  { app: {} }: any,
  inject: (
    arg0: string,
    arg1: { erc20Crt: typeof ERC20Contract; poolCrt: typeof PoolContract }
  ) => void
) => {
  // pass $axios as a dependency to the RecommendationsService constructor
  const web3 = { erc20Crt: ERC20Contract, poolCrt: PoolContract };

  // inject the service, making it available in the context, component, store, etc.
  inject('web3', web3);
};
