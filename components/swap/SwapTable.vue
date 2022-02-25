<template>
  <div></div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator';

import Web3Mixin from '~/mixins/web3';

@Component({
  components: {}
})
export default class SwapTable extends mixins(Web3Mixin) {}
</script>
