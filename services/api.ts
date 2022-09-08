import { Method, AxiosResponse, AxiosRequestConfig } from 'axios';
import { ResponseResult } from '~/types';
import { $axios } from '~/services/axios';
export default class HttpRepository {
  private methods: Record<
    string,
    <T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig | undefined
    ) => Promise<R>
  >;

  private getMethod(methodName: string) {
    return this.methods[methodName];
  }

  constructor() {
    const methods = {
      POST: $axios.post,
      GET: $axios.get,
      PUT: $axios.put,
      DELETE: $axios.delete,
      PATCH: $axios.patch
    };

    this.methods = methods;
  }

  async call<T>(
    method: Method,
    url: string,
    data?: any,
    opts?: any
  ): Promise<T> {
    const Axios = this.getMethod(method);
    const { data: $res } = await Axios<ResponseResult<T>>(url, data, opts);

    return $res.data;
  }
}
