import { createDecorator, VueDecorator } from 'vue-class-component';
// import { IAsyncComputedProperty } from 'vue-async-computed';
// import IAsyncComputedProperty from 'vue-async-computed';

type AsyncComputedGetter<T> = () => Promise<T> | T;
export interface IAsyncComputedProperty<T> {
  default?: T | (() => T);
  get?: AsyncComputedGetter<T>;
  watch?: () => void;
  shouldUpdate?: () => boolean;
  lazy?: boolean;
}

export function AsyncComputed<T>(
  computedOptions?: IAsyncComputedProperty<T>
): VueDecorator {
  return createDecorator((_options, key) => {
    // TODO: Not use any casting
    const options: any = _options as any;
    options.asyncComputed = options.asyncComputed || {};
    const method = options.methods![key];
    options.asyncComputed![key] = <IAsyncComputedProperty<T>>{
      get: method,
      ...computedOptions
    };
    delete options.methods![key];
  });
}
