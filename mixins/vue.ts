import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { UtilsModule } from '~/services/utils';
import { mapState, mapGetters, mapActions } from 'vuex';

import _ from 'lodash';

import 'reflect-metadata';

@Component({
  computed: {
    ...mapState(['refreshAction', 'storeNoticationObj', 'appTheme'])
  },
  methods: mapActions(['updateRefreshAction', 'toggleAppTheme'])
})
class VueMixin extends Vue {
  public $vs!: {
    notification: Function;
    loading: Function;
    setTheme: (theme: string) => Function;
    setColor: (colorName: string, color: string) => Function;
  };
  public $router!: any;
  public $route!: any;

  public refreshAction!: boolean;
  public storeNoticationObj!: any;
  public appTheme!: string;

  public updateRefreshAction!: () => void;
  public toggleAppTheme!: (theme: string) => void;

  get darkMode() {
    return this.appTheme === 'dark';
  }

  get computedTheme() {
    return {
      'dark:bg-vuesax-grey dark:text-white': true
    };
  }

  openNotification(color: string, text: string): void {
    UtilsModule.openNotification(this.$vs, color, text);
  }

  routeTo(route: string, query = {}) {
    this.$router.push({ path: route, query });
  }
}

export default VueMixin;
