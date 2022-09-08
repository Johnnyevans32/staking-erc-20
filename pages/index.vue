<template>
  <div
    class="grid grid-cols-4 md:grid-cols-8 h-screen dark:bg-vuesax-grey dark:text-white"
  >
    <div
      class="col-span-4 my-auto md:col-start-2 md:col-span-6 hidden md:block"
    >
      <BarnerOne title="Stake and Unstake assets" />
    </div>
    <div
      class="col-span-4 my-auto md:col-start-2 md:col-span-6 hidden md:block"
    >
      <PoolDashboard />
    </div>
    <div
      class="container col-span-4 my-auto md:col-start-2 md:col-span-6 hidden md:block"
    >
      <AssetTable />
    </div>
  </div>
</template>

<script lang="ts">
import BarnerOne from '~/components/BarnerOne.vue';
import AssetTable from '~/components/assets/AssetTable.vue';
import PoolDashboard from '~/components/tokenpool/PoolDashboard.vue';
import { Component, mixins } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';

@Component({
  components: {
    BarnerOne,
    AssetTable,
    PoolDashboard
  }
})
export default class HomePage extends mixins(Web3Mixin) {
  layout() {
    return 'defi';
  }
}
</script>
