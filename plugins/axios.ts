export default function ({ $axios, redirect, store, route }) {
  $axios.onRequest((config: { url: string }) => {
    console.log('Making request to ' + config.url);
  });

  $axios.onError((error: { response: { status: any } }) => {
    const code = parseInt(error.response && error.response.status);

    if (code === 401) {
      const { path } = route;
      if (path === '/auth') {
        return;
      }

      store.commit('user/_SET_USER_TOKEN', null);
      store.commit('user/_SET_USER_DATA', null);
      $axios.setToken(false);

      return redirect('/auth');
    }
  });
}
