<template>
  <div
    class="grid grid-cols-3 gap-4 h-screen dark:bg-vuesax-grey dark:text-white"
  >
    <div class="col-span-3">
      <div class="container mx-auto"><SwapTable /></div>
    </div>
  </div>
</template>

<script lang="ts">
import BarnerOne from '~/components/BarnerOne.vue';
import SwapTable from '~/components/swap/SwapTable.vue';
import { Component, mixins } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';

@Component({
  components: {
    BarnerOne,
    SwapTable
  }
})
export default class SwapPage extends mixins(Web3Mixin) {}
</script>
