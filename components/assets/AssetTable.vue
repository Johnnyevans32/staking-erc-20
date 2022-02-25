<template>
  <div>
    <vs-table class="dark:text-white">
      <template #header>
        <vs-input
          v-model="search"
          border
          :dark="appTheme === `light`"
          :danger="appTheme === `dark`"
          placeholder="Search token assets.."
        />
      </template>
      <template #thead>
        <vs-tr>
          <vs-th
            sort
            @click="assetsData = $vs.sortData($event, assetsData, 'name')"
          >
            Tokens
          </vs-th>
          <vs-th> Img </vs-th>
          <vs-th
            sort
            @click="assetsData = $vs.sortData($event, assetsData, 'pool')"
          >
            Pool %
          </vs-th>
          <vs-th> </vs-th>
        </vs-tr>
      </template>
      <template #tbody>
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getSearch(assetsData, search)"
          :data="tr"
        >
          <vs-td>
            {{ tr.name }}
          </vs-td>
          <vs-td>
            <img width="15" :src="`${tr.logo}`" />
          </vs-td>
          <vs-td>
            {{ tr.pool }}
          </vs-td>
          <vs-td>
            <PoolDialog :addressName="tr.addressName" :name="tr.name" />
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script lang="ts">
import PoolDialog from '~/components/tokenpool/PoolDialog.vue';
import { Component, mixins } from 'nuxt-property-decorator';
import { Asset } from '~/types/web3';
import { mapActions, mapState } from 'vuex';
import Web3Mixin from '~/mixins/web3';

@Component({
  computed: mapState('token', ['assets']),
  methods: mapActions('token', ['setAssets']),
  components: {
    PoolDialog
  }
})
export default class AssetTable extends mixins(Web3Mixin) {
  search: string = '';

  public assets!: Array<Asset>;

  public setAssets!: (assets: Asset[]) => void;

  get assetsData() {
    return this.assets;
  }

  set assetsData(newArray: Asset[]) {
    console.log('k', newArray);
    this.setAssets(newArray);
  }
}
</script>

<style></style>
