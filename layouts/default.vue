<template>
  <div :class="appTheme">
    <NavBar />
    <div id="padding-scroll-content">
      <Nuxt />
    </div>
    <FooterBar />
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';
import Web3Mixin from '~/mixins/web3';
import NavBar from '~/components/NavBar.vue';
import FooterBar from '~/components/FooterBar.vue';

@Component({
  components: {
    NavBar,
    FooterBar
  }
})
export default class DefaultLayout extends mixins(Web3Mixin) {}
</script>
<style>
@font-face {
  font-family: 'U8';
  src: url('~assets/fonts/U8Bold.woff2') format('woff2');
}

html {
  font-family: 'U8';
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /* color: black; */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.center {
  text-align: center;
}

.web3-button,
.refresh-button,
.barner {
  background: #12c2e9; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f64f59,
    #c471ed,
    #12c2e9
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
