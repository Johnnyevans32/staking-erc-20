<template>
  <div
    class="barner grid grid-cols-2 gap-4 bg-purple text-white rounded-2xl px-10 py-10 text-4xl"
  >
    <h1>
      {{ this.title }}<br /><br />
      <a class="underline decoration-red-600">DeFi</a>
    </h1>

    <!-- ... -->
    <!-- <vue-css-doodle>
      :doodle { @grid: 50x1 / 80%; } @place-cell: center; @size: calc(100% /
      @size * @i); transform: rotate(calc(@i * 5deg)); border-radius: 30%;
      border: 1px solid hsla( calc(10 + 4 * @i), 70%, 68%, @r.8 );
    </vue-css-doodle> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component
export default class BarnerOne extends Vue {
  @Prop({ required: true, type: String }) readonly title!: string;
}
</script>
