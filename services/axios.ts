import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { Method } from 'axios';
import { ResponseResult } from '~/types';

class HttpRepository {
  private methods: any;

  private getMethod(methodName: string) {
    return this.methods[methodName];
  }

  constructor($axios: NuxtAxiosInstance) {
    const methods: any = {
      POST: $axios.$post,
      GET: $axios.$get,
      PUT: $axios.$put,
      DELETE: $axios.$delete
    };

    this.methods = methods;
  }

  async call<T>(
    method: Method,
    url: string,
    data?: any,
    opts?: any
  ): Promise<ResponseResult<T>> {
    const Axios = this.getMethod(method);
    const $res: ResponseResult<T> = await Axios(url, data, opts);
    return $res;
  }
}

export default HttpRepository;
