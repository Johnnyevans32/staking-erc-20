import { Plugin } from '@nuxt/types';
import { initializeAxios } from '~/services/axios';

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
};

export default accessor;
