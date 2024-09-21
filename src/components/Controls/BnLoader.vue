<template>
  <div v-if="loading" class="bn-loader">
    <bn-loading-sircle />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BnLoadingSircle from "@/components/Controls/BnLoadingSircle.vue";

export default defineComponent({
  name: "bn-loader",
  components: {BnLoadingSircle},

  props: {
    loading: {
      type: Boolean,
      default: () => false,
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/css/variables';

.bn-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: $main-bg;
  opacity: 0.5;
}
</style>