import { Plugin } from '@nuxt/types';

import { UtilsModule } from '~/services/utils';

declare module 'vue/types/vue' {
  interface Vue {
    $util: UtilsModule;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $util: UtilsModule;
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $util: UtilsModule;
  }
}

const utilPlugin: Plugin = (_ctx, inject) => {
  inject('util', new UtilsModule());
};

export default utilPlugin;
