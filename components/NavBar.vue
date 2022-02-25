<template>
  <div class="container mx-auto">
    <div class="flex z-20">
      <div class="grow h-14">
        <vs-navbar
          target-scroll="#padding-scroll-content"
          padding-scroll
          square
          center-collapsed
          v-model="active"
        >
          <template #left> DEG-X </template>

          <template #right>
            <vs-switch
              @click="toggleDarkMode"
              :dark="appTheme === `dark`"
              square
              v-model="themeSwitch"
            >
              <template #circle>
                <i v-if="darkMode" class="bx bxs-moon"></i>
                <i v-else class="bx bxs-sun"></i>
              </template>
            </vs-switch>

            <vs-button
              icon
              class="refresh-button"
              @click="updateRefreshAction"
              :disabled="!refreshButton"
            >
              <i :class="resfreshClassAtr"></i
            ></vs-button>

            <vs-button
              v-if="isConnected"
              shadow
              @click="activeSidebar = !activeSidebar"
            >
              <v-avatar size="24">
                <img
                  src="https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/241238798_107781481640846_1137921738041142533_n.png?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGiUOsWb-Hyar41-HzLgvG2eBYopYISYMF4FiilghJgwYoR4gAEOO-OpHOln0TGghjKRoPU6Lgaa4VF8tQ4N98Z&_nc_ohc=2Qr6PrFBCZoAX_W2-4C&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AT98yD9OEi4OVteeBkizokW06b4xVw9MZtFTUUha8jZUWQ&oe=6207718C"
                />
              </v-avatar>
              <span class="text-tiny ml-2">
                {{ shortenedAddress }}
              </span>
              <v-icon right> mdi-chevron-down </v-icon>
            </vs-button>
            <vs-button
              upload
              icon
              class="web3-button"
              v-else
              animation-type="scale"
              @click="walletModalEnable = !walletModalEnable"
            >
              Connect Wallet
              <template #animate>
                <i class="bx bxs-wallet" style="color: #ffffff"></i>
              </template>
            </vs-button>
            <vs-dialog overflow-hidden v-model="walletModalEnable">
              <template #header>
                <h4 class="not-margin">Connect your wallet</h4>
              </template>
              <div
                class="wallet-providers"
                v-for="walletProvider in walletProviders"
                :key="walletProvider.id"
              >
                <vs-button
                  upload
                  color="dark"
                  block
                  @click="connectWallet(walletProvider.id)"
                  :disabled="providerWalletConnectionInit"
                >
                  <v-avatar size="20" class="mr-2">
                    <img
                      :src="walletProvider.logoUrl"
                      alt="wallet-provider-logo"
                    />
                  </v-avatar>
                  {{ walletProvider.name }}
                </vs-button>
              </div>
            </vs-dialog>
          </template>
        </vs-navbar>
      </div>
    </div>
    <vs-sidebar
      class="z-10"
      v-model="sideBarMenu"
      right
      square
      :open.sync="activeSidebar"
    >
      <template #logo>
        <v-avatar size="24">
          <img
            src="https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/241238798_107781481640846_1137921738041142533_n.png?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGiUOsWb-Hyar41-HzLgvG2eBYopYISYMF4FiilghJgwYoR4gAEOO-OpHOln0TGghjKRoPU6Lgaa4VF8tQ4N98Z&_nc_ohc=2Qr6PrFBCZoAX_W2-4C&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AT98yD9OEi4OVteeBkizokW06b4xVw9MZtFTUUha8jZUWQ&oe=6207718C"
          />
          <!-- <span class="white--text headline"> U8 </span> -->
        </v-avatar>
        <span class="text-tiny ml-2">
          {{ shortenedAddress }}
        </span>
      </template>
      <vs-sidebar-item to="/">
        <!-- <template #icon>
          <i class="bx bx-home"></i>
        </template> -->
        stake assets
      </vs-sidebar-item>
      <vs-sidebar-item to="/swap">
        <!-- <template #icon>
          <i class="bx bx-home"></i>
        </template> -->
        swap
      </vs-sidebar-item>

      <template #footer>
        <vs-row justify="space-between">
          <vs-avatar>
            <img
              src="https://scontent.flos1-2.fna.fbcdn.net/v/t39.30808-6/241238798_107781481640846_1137921738041142533_n.png?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGiUOsWb-Hyar41-HzLgvG2eBYopYISYMF4FiilghJgwYoR4gAEOO-OpHOln0TGghjKRoPU6Lgaa4VF8tQ4N98Z&_nc_ohc=2Qr6PrFBCZoAX_W2-4C&_nc_zt=23&_nc_ht=scontent.flos1-2.fna&oh=00_AT98yD9OEi4OVteeBkizokW06b4xVw9MZtFTUUha8jZUWQ&oe=6207718C"
              alt=""
            />
          </vs-avatar>
          <vs-button class="web3-button" @click="disconnectWallet()">
            Log out <i class="bx bx-log-out"></i>
          </vs-button>
        </vs-row>
      </template>
    </vs-sidebar>
  </div>
</template>

<script lang="ts">
import Web3Modal from 'web3modal';
import _ from 'lodash';

import { UtilsModule } from '~/services/utils';

import PoolDialog from '~/components/tokenpool/PoolDialog.vue';
import { Component, mixins } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';
import { mapActions } from 'vuex';
import {
  PROVIDERSOPTIONS,
  SUPPORTEDNETWORKS,
  WALLETPROVIDERS
} from '~/services/constants';

@Component({
  methods: mapActions('web3', ['setWeb3Modal', 'connectWeb3Modal', 'resetApp']),
  components: {
    PoolDialog
  }
})
export default class NavBar extends mixins(Web3Mixin) {
  active: number = 0;
  themeSwitch: boolean = true;
  activeSidebar: boolean = false;
  sideBarMenu: string = 'NFT';
  walletModalEnable: boolean = false;
  walletProviders: any[] = WALLETPROVIDERS;
  providerWalletConnectionInit: boolean = false;
  refreshButton: boolean = true;

  public connectWeb3Modal!: (providerId: string) => Promise<void>;
  public setWeb3Modal!: (web3modal: any) => void;
  public resetApp!: () => Promise<void>;

  get resfreshClassAtr() {
    return this.refreshButton ? 'bx bx-refresh bx-spin' : 'bx bx-refresh ';
  }

  toggleDarkMode(): any {
    const themeToSet = !this.darkMode ? 'dark' : 'light';
    this.$vs.setTheme(themeToSet);
    this.toggleAppTheme(themeToSet);
  }
  async disconnectWallet(): Promise<any> {
    this.activeSidebar = !this.activeSidebar;
    try {
      await this.resetApp();
      this.connectionLoaded = false;
    } catch (err) {
      this.openNotification('danger', JSON.stringify(err));
    } finally {
      this.updateRefreshAction();
    }
  }

  async connectWallet(providerId: string): Promise<void> {
    this.active = 1;
    this.providerWalletConnectionInit = true;
    try {
      if (!this.web3Modal) {
        const newWeb3Modal = new Web3Modal({
          network: SUPPORTEDNETWORKS[0], // optional
          cacheProvider: true, // optional
          providerOptions: PROVIDERSOPTIONS // required
        });
        const clonedModal = _.cloneDeep(newWeb3Modal);
        this.setWeb3Modal(clonedModal);
      }
      await this.connectWeb3Modal(providerId);
      this.walletModalEnable = false;
    } catch (err) {
      console.log({ err });
      this.openNotification('danger', UtilsModule.getRevertedReason(err));
    }
    this.providerWalletConnectionInit = false;
  }
}
</script>
