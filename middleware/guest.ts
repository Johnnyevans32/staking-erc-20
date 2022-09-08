import { Middleware } from '@nuxt/types';
import { isNil } from 'lodash';

const guest: Middleware = function ({ store, redirect, query }) {
  const { userData } = store.state.user;

  if (userData) {
    return redirect('/wallet');
  }
};

export default guest;
