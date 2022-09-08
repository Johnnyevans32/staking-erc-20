<template>
  <div
    class="md:grid md:grid-cols-3 md:gap-10 grid-flow-col grid-cols-1 gap-0 md:text-right text-dark dark:text-white text-left"
  >
    <div
      class="md:grid md:grid-cols-4 md:gap-0 grid-flow-col grid-cols-1 gap-0"
    >
      <div class="md:col-span-1">
        <i class="bx bx-wallet-alt bx-lg hidden md:block"></i>
      </div>
      <div class="md:col-span-3">
        <p class="text-base">Staked token balance</p>
        <h2 class="text-xl">${{ stakedTotalAssetValue }}</h2>
      </div>
    </div>

    <div
      class="md:grid md:grid-cols-4 md:gap-0 md:border-l-2 grid-flow-col grid-cols-1 gap-0 hidden"
    >
      <div class="md:col-span-1">
        <i class="bx bx-coin-stack bx-lg hidden md:block"></i>
      </div>
      <div class="md:col-span-3">
        <p class="text-base">Risk</p>
        <h2 class="text-lg">Moderate</h2>
      </div>
    </div>

    <div
      class="md:grid md:grid-cols-4 md:gap-0 md:border-l-2 grid-flow-col grid-cols-1 gap-0 hidden"
    >
      <div class="md:col-span-1">
        <i class="bx bx-gas-pump bx-lg hidden md:block"></i>
      </div>
      <div class="md:col-span-3">
        <p class="text-base">Gas fees</p>
        <h2 class="text-lg">Moderate</h2>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Inject, mixins, Prop, Vue } from 'nuxt-property-decorator';
import Web3Mixin from '~/mixins/web3';
import VueMixin from '~/mixins/vue';
import { AsyncComputed } from '~/services/async-computed';

import { UtilsModule } from '~/services/utils';
import { IPoolContract } from '~/types/services';

@Component
export default class PoolDashboard extends mixins(Web3Mixin, VueMixin) {
  stakedTotalAssetValue: any = '0';

  @AsyncComputed()
  async getStakedTotalAssetBalance() {
    console.log('gettting staked value');
    if (!this.isConnected) {
      this.stakedTotalAssetValue = '0';
      return null;
    }

    this.refreshAction;

    try {
      this.stakedTotalAssetValue = UtilsModule.nFormatter(
        Number(
          this.formatTokenBal(
            await this.poolService.getStakedBalance(
              this.account,
              this.chainId,
              this.getWeb3Provider
            )
          )
        ),
        1
      );

      console.log('this.stakedTokenBalance', this.stakedTotalAssetValue);
    } catch (err) {
      console.log('errr gettting staked value', err);
      this.stakedTotalAssetValue = '0';
    }
  }
}
</script>
