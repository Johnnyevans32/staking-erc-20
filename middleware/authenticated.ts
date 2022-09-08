import { Middleware } from '@nuxt/types';
import { isEmpty } from 'lodash';

const authenticated: Middleware = function ({ store, redirect }) {
  const { userData } = store.state.user;

  if (isEmpty(userData)) {
    return redirect('/auth');
  }
};

export default authenticated;
