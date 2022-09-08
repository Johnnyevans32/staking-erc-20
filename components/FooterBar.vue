<template>
  <div class="container-fluid px-2 w-full" v-bind:class="computedTheme">
    <hr class="mb-6 w-full border-gray-700" />

    <div class="w-full md:w-4/12 px-0">
      <div class="text-sm font-semibold py-1">
        <a href="#" class="hover:text-gray-400 text-sm font-semibold py-1">
          jevan 🪐</a
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, mixins, Vue } from 'nuxt-property-decorator';
import VueMixin from '~/mixins/vue';

@Component
export default class FooterBar extends mixins(VueMixin) {}
</script>
