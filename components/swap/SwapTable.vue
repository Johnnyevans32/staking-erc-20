<template>
  <div class="grid md:grid-cols-3 grid-cols-1 gap-4 text-center text-black">
    <div class="md:col-start-2 col-span-1 p-5 rounded-xl">
      <div class="border-b-2 border-black my-5 py-5">
        <div class="flex justify-between">
          <h1 class="text-base">Swap Tokens</h1>
          <vs-button icon class="web3-button">
            <i class="bx bxs-cog"></i>
          </vs-button>
        </div>
      </div>
      <div class="con-form text-sm">
        <div class="flex justify-between">
          <span>You Send</span>
          <span>Balance: 40 ETH</span>
        </div>
        <vs-input type="number" icon-after>
          <template #icon><p class="text--tiny">max</p></template>
        </vs-input>
        <div class="flex justify-center my-5">
          <vs-button icon class="web3-button">
            <i class="bx bx-transfer bx-spin bx-rotate-90"></i>
          </vs-button>
        </div>
        <div class="flex justify-between">
          <span>You Get</span>
        </div>
        <vs-input type="number" icon-after>
          <template #icon><p class="text--tiny">max</p></template>
        </vs-input>
      </div>

      <div class="footer-dialog mt-5">
        <vs-button block class="web3-button"> Swap </vs-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';

@Component({
  components: {}
})
export default class SwapTable extends mixins(Web3Mixin) {}
</script>
