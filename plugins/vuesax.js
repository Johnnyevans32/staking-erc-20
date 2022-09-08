import Vue from 'vue';

import { Component } from 'nuxt-property-decorator';
import Vuesax from 'vuesax';

import 'vuesax/dist/vuesax.css';

Component.registerHooks(['middleware']);
// Vuesax styles
Vue.use(Vuesax, {});
