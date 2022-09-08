export default function ({ $axios, redirect, store, route }) {
  $axios.onRequest((config: { url: string }) => {
    console.log('Making request to ' + config.url);
  });

  $axios.onError((error: { response: { status: any } }) => {
    const code = parseInt(error.response && error.response.status);
  });
}
