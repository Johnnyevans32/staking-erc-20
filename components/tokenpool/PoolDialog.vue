<template>
  <div>
    <vs-button
      upload
      color="dark"
      icon
      animation-type="scale"
      size="mini"
      @click="isConnected ? (dialogOne = !dialogOne) : (dialogOne = !dialogOne)"
    >
      <!-- openNotification('danger', `connect your wallet`) -->
      action
      <template #animate>
        <i class="bx bxs-paper-plane"></i>
      </template>
    </vs-button>
    <vs-dialog overflow-hidden v-model="dialogOne">
      <div
        class="md:grid md:grid-cols-4 md:gap-10 grid-flow-col grid-cols-1 gap-0 p-10"
      >
        <div class="md:col-span-2">
          <h1>Strategy</h1>
          <p>
            When depositing tokens in the pool you provide liquidity to earn
            trading fees. As a liquidity provider, you receive LP tokens
            representing your share of the pool. LPs earn trading fees generated
            on every trade through the Curve pool proportional to the liquidity
            you provided. The APY of the pool is an estimated rate of the fee
            income.
          </p>
        </div>
        <div class="md:col-span-2 md:border-l-2 md:px-6">
          <div class="mb-4">
            <ul class="flex flex-wrap -mb-px">
              <li
                @click="switchDialogTab(item)"
                role="tab"
                class="mr-4 inline-block py-4 rounded-t-lg text-sm text-gray-400 border-b-2 border-b-transparent hover:text-black dark:hover:text-white"
                v-bind:class="{ active: activePoolAction === item }"
                v-for="item in items"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
          <div v-for="item in items" :key="item">
            <div v-bind:class="{ hidden: activePoolAction !== item }">
              <div v-if="item === `unstake`">
                Staked Value: {{ dialogOne ? stakedAssetValue : 0 }}
              </div>

              <div v-else>
                Balance : {{ dialogOne ? getTokenBal : 0 }} {{ name }}
              </div>

              <div class="con-form">
                <vs-input
                  type="number"
                  v-model="stakeAmount"
                  :placeholder="`${item} amount`"
                  :danger="!stakeAmountFieldValid"
                  :dark="stakeAmountFieldValid"
                  icon-after
                  @click-icon="setMaxAsStakeAmount()"
                >
                  <template #icon><p class="text--tiny">max</p></template>

                  <template #message-danger> {{ errorMsg }} </template>
                </vs-input>
              </div>

              <div class="footer-dialog">
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="col-span-1 block"
                    v-bind:class="{ hidden: item != POOLACTION.STAKE }"
                  >
                    <vs-button
                      upload
                      block
                      v-if="item == POOLACTION.STAKE"
                      class="web3-button"
                      @click="approvePoolStake()"
                    >
                      approve
                    </vs-button>
                  </div>
                  <div v-bind:class="{ 'col-span-2': item == 'unstake' }">
                    <vs-button
                      upload
                      block
                      class="web3-button"
                      @click="validateAction"
                      :disabled="!stakeAmountFieldValid"
                    >
                      {{ item }} assets
                    </vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </vs-dialog>
    <vs-dialog not-center v-model="dialogTwo">
      <template #header>
        <h4 class="not-margin">Confirm {{ activePoolAction }}</h4>
      </template>

      <div class="con-content">
        <p>Your details of {{ activePoolAction }} are</p>
        <p>{{ stakeAmount }} {{ name }}</p>
      </div>

      <template #footer>
        <div class="con-footer">
          <vs-button
            @click="acceptOrRejectStakeAction('accept')"
            icon
            color="#11e435"
            border
          >
            <i class="bx bxs-check-square" style="color: #11e435"></i>
          </vs-button>
          <vs-button
            @click="acceptOrRejectStakeAction('reject')"
            icon
            color="#f70505"
            border
          >
            <i class="bx bxs-x-square" style="color: #f70505"></i>
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import { providers, Signer } from 'ethers';
import { Component, Prop, mixins, Watch } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';
import { AsyncComputed } from '~/services/async-computed';
import { POOLACTION } from '~/services/constants';
import { UtilsModule } from '~/services/utils';

@Component
export default class PoolDialog extends mixins(Web3Mixin) {
  dialogOne: boolean = false;
  dialogTwo: boolean = false;
  stakeAmount: number = 0;
  errorMsg: string = '';
  tokenBalance: number = 0;
  stakedAssetValue: any = '0';

  activePoolAction = POOLACTION.STAKE;

  items = [POOLACTION.STAKE, POOLACTION.UNSTAKE];

  switchDialogTab(tab: string) {
    this.activePoolAction = tab;
  }

  @Prop({ required: true, type: String }) readonly addressName!: string;
  @Prop({ required: true, type: String }) readonly name!: string;

  get stakeAmountFieldValid() {
    return this.errorMsg === '';
  }

  @AsyncComputed()
  async getTokenBal(): Promise<any> {
    if (!this.isConnected) {
      this.tokenBalance = 0;
      return null;
    }
    this.refreshAction;
    const assetAddress = this.getAssetAddress(this.addressName);

    const tokenBalance = await this.erc20Service.getErcTokenBalance(
      assetAddress,
      this.account,
      this.getWeb3Provider as unknown as providers.Web3Provider
    );

    const amount = this.formatTokenBal(tokenBalance);
    this.tokenBalance = Number(amount);
    return new Promise(resolve =>
      setTimeout(() => {
        resolve(amount);
      }, 1000)
    );
  }

  @Watch('stakeAmount')
  stakeAmountValidation(newVal: number) {
    this.$emit('my-custom-event');
    newVal <= 0 || !newVal
      ? (this.errorMsg = 'invalid amount')
      : newVal > this.tokenBalance && this.activePoolAction === POOLACTION.STAKE
      ? (this.errorMsg = 'amount is more than you can stake')
      : (this.errorMsg = '');
  }

  setMaxAsStakeAmount() {
    this.stakeAmount = this.tokenBalance;
  }

  validateAction(): void {
    this.stakeAmountValidation(this.stakeAmount);
    if (this.errorMsg === '') {
      this.dialogOne = false;
      this.dialogTwo = true;
    }
  }

  acceptOrRejectStakeAction(decision: string): void {
    this.dialogTwo = false;

    switch (decision) {
      case 'accept':
        this.initiatePoolAction();
        break;

      case 'reject':
      default:
        this.openNotification('warn', `${this.activePoolAction} cancelled`);
        break;
    }
  }

  async initiatePoolAction() {
    switch (this.activePoolAction) {
      case POOLACTION.STAKE:
        await this.stakeToken();
        break;

      case POOLACTION.UNSTAKE:
        await this.unstakeToken();
        break;

      default:
        break;
    }
  }

  @AsyncComputed()
  async getStakedAssetValue() {
    if (!this.isConnected) {
      this.stakedAssetValue = '0';
      return null;
    }
    this.refreshAction;
    try {
      const assetAddress = this.getAssetAddress(this.addressName);

      const stakedAssetValue = Number(
        this.formatTokenBal(
          await this.poolService.getStakedBalance(
            this.account,
            this.chainId,
            this.getWeb3Provider,
            assetAddress
          )
        )
      );

      this.stakedAssetValue = UtilsModule.nFormatter(stakedAssetValue, 1);

      console.log({
        stakedAssetValue: this.stakedAssetValue,
        name: this.addressName
      });
    } catch (err) {
      console.log({ err });
      this.stakedAssetValue = '0';
    }
  }

  async approvePoolStake() {
    const loading = this.$vs.loading({
      text: 'sending approval request...',
      color: '#000000',
      type: 'square'
    });
    try {
      const amountInWei = UtilsModule.parseEtherValue(this.stakeAmount);
      const tokenFarmContract = UtilsModule.getTokenFarmContract(
        this.chainId,
        this.signer as unknown as Signer
      );
      const erc20AssetAddress = this.getAssetAddress(this.addressName);
      await this.erc20Service.approveErcTxn(
        erc20AssetAddress,
        this.signer,
        amountInWei,
        tokenFarmContract.address
      );
      this.openNotification('success', 'token transfer approved');
    } catch (err) {
      const errReason = UtilsModule.getRevertedReason(err);
      this.openNotification('danger', errReason);
    } finally {
      loading.close();
    }
  }

  async stakeToken(): Promise<void> {
    const loading = this.$vs.loading({
      text: `staking ${this.name.toLowerCase()} tokens`,
      color: '#000000',
      type: 'square'
    });
    try {
      const amountInWei = UtilsModule.parseEtherValue(this.stakeAmount);

      const erc20AssetAddress = this.getAssetAddress(this.addressName);

      await this.poolService.stakeAsset(
        this.chainId,
        this.signer,
        amountInWei,
        erc20AssetAddress
      );

      this.openNotification('success', 'stake successfully confirmed');
    } catch (err) {
      const errReason = UtilsModule.getRevertedReason(err);
      this.openNotification('danger', errReason);
    } finally {
      this.updateRefreshAction();
      loading.close();
    }
  }

  async unstakeToken(): Promise<void> {
    const loading = this.$vs.loading({
      text: `unstaking ${this.name.toLowerCase()} tokens`,
      color: '#000000',
      type: 'square'
    });
    try {
      const amountInWei = UtilsModule.parseEtherValue(this.stakeAmount);
      const assetAddress = this.getAssetAddress(this.addressName);

      await this.poolService.unstakeAsset(
        this.chainId,
        this.signer,
        amountInWei,
        assetAddress
      );

      this.openNotification('success', 'token successfully unstaked');
    } catch (err) {
      const errReason = UtilsModule.getRevertedReason(err);
      this.openNotification('danger', errReason);
    } finally {
      this.updateRefreshAction();
      loading.close();
    }
  }
}
</script>

<style>
.center button {
  background-color: black;
  color: white;
}
.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
  padding-bottom: 0px;
}
.con-form {
  width: 100%;
}
.con-footer .vs-button .vs-button__content {
  padding: 10px 10px;
}
.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-form .flex a {
  font-size: 0.8rem;
  opacity: 0.7;
}
.con-form .flex a:hover {
  opacity: 1;
}
.con-form .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-form .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-form .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}
.con-content p {
  font-size: 0.8rem;
  padding: 0px 10px;
}
.con-content .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-content .vs-input-parent {
  width: 100%;
}
.con-content .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-content .vs-input-content .vs-input {
  width: 100%;
}
[role='tab'].active {
  @apply text-black border-b-black dark:text-white dark:border-b-white;
}
</style>
