<template>
  <div :class="appTheme">
    <NavBar />
    <div
      id="padding-scroll-content"
      class="grid grid-cols-3 gap-4 h-screen dark:bg-vuesax-grey dark:text-white"
    >
      <div class="col-span-3">
        <div class="container mx-auto hidden md:block">
          <BarnerOne title="Stake and Unstake assets" />
        </div>
        <div class="container mx-auto">
          <PoolDashboard />
        </div>
        <div class="container mx-auto"><AssetTable /></div>
      </div>
    </div>
    <!-- <div class="container mx-auto">
        <BarnerOne />
      </div> -->
    <FooterBar />
  </div>
</template>

<script lang="ts">
import BarnerOne from '~/components/BarnerOne.vue';
import AssetTable from '~/components/assets/AssetTable.vue';
import NavBar from '~/components/NavBar.vue';
import PoolDashboard from '~/components/tokenpool/PoolDashboard.vue';
import { Component, mixins } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';

@Component({
  components: {
    BarnerOne,
    NavBar,
    AssetTable,
    PoolDashboard
  }
})
export default class HomePage extends mixins(Web3Mixin) {
  active: string = '';
}
</script>

<style>
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
