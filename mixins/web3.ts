import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { UtilsModule } from '~/services/utils';
import { mapState, mapGetters, mapActions } from 'vuex';
import { constants, ethers } from 'ethers';

import _ from 'lodash';

import 'reflect-metadata';
import { container, inject } from 'inversify-props';

import { IERC20Contract, IPoolContract } from '~/types/services';

import { ERC20Contract } from '~/services/web3/erc20contract';
import { PoolContract } from '~/services/web3/poolcontract';

container.bind<IERC20Contract>('ERC20Contract').to(ERC20Contract);
container.bind<IPoolContract>('PoolContract').to(PoolContract);

@Component({
  computed: {
    ...mapState('web3', ['web3Modal', 'chainId', 'account', 'signer']),
    ...mapGetters('web3', [
      'shortenedAddress',
      'isConnected',
      'networkName',
      'getWeb3Modal',
      'getWeb3Provider'
    ]),
    ...mapState('token', [
      'degTokenAddress',
      'fauTokenAddress',
      'wethTokenAddress'
    ]),
    ...mapState(['refreshAction', 'storeNoticationObj', 'appTheme'])
  },
  methods: mapActions([
    'updateRefreshAction',
    'openOrCloseNotification',
    'toggleAppTheme'
  ])
})
class Web3Mixin extends Vue {
  public $vs!: {
    notification: Function;
    loading: Function;
    setTheme: (theme: string) => Function;
    setColor: (colorName: string, color: string) => Function;
  };

  public web3Modal!: any;
  public chainId!: number;
  public account!: string;
  public signer!: any;

  public refreshAction!: boolean;
  public storeNoticationObj!: any;
  public appTheme!: string;

  public shortenedAddress!: string;
  public isConnected!: boolean;
  public networkName!: string;
  public getWeb3Modal!: any;
  public getWeb3Provider!: string;

  public degTokenAddress!: string;
  public fauTokenAddress!: string;
  public wethTokenAddress!: string;

  public connectionLoaded: boolean = false;

  public loader: any = null;
  public loadingState: boolean = false;
  public loadingText: string = '';

  public updateRefreshAction!: () => void;
  public openOrCloseNotification!: (storeNoticationObj: any) => void;
  public toggleAppTheme!: (theme: string) => void;

  @inject('ERC20Contract') public readonly erc20Service!: IERC20Contract;

  @inject('PoolContract') public readonly poolService!: IPoolContract;

  get pageLoader() {
    this.loader = this.$vs.loading({
      text: this.loadingText,
      color: '#000000',
      type: 'square'
    });

    return this.loader;
  }

  get darkMode() {
    return this.appTheme === 'dark';
  }

  get computedTheme() {
    return {
      'dark:bg-vuesax-grey dark:text-white': true
    };
  }

  @Watch('loadingState')
  unsetPageLoader(newLoaderState: boolean) {
    if (newLoaderState) {
      this.pageLoader;
    } else {
      this.loader.close();
      this.loader = null;
    }
  }

  @Watch('storeNoticationObj', {
    immediate: true,
    deep: true
  })
  openStoreNotification(storeNoticationObj: any, hmm: any) {
    console.log('loading mixinnnn', storeNoticationObj, hmm);
    const { text, color, status } = storeNoticationObj;
    if (status) {
      console.log('loading mixinnnn oyyyyaaa', storeNoticationObj, hmm);
      this.openNotification(color, text);

      this.openOrCloseNotification({
        text: '',
        color: '',
        status: false
      });
    }
  }

  setPageLoader(text = 'loading') {
    this.loadingText = text;
    this.loadingState = true;
  }

  openNotification(color: string, text: string): void {
    UtilsModule.openNotification(this.$vs, color, text);
  }

  formatTokenBal(tokenBalance: ethers.BigNumberish): string {
    // Format the DAI for displaying to the user
    return ethers.utils.formatUnits(tokenBalance, 18);
  }
  getAssetAddress(assetAddressKey: string): string {
    return this[assetAddressKey] || constants.AddressZero;
  }
}

export default Web3Mixin;
