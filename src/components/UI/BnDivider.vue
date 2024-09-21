<template>
  <div class="bn-divider" />
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "bn-divider",

  props: {
    vertical: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dividerStyles: {
        width: this.vertical ? '1px' : '100%',
        height: this.vertical ? '100%' : '1px',
      }
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/css/variables.scss';

.bn-divider {
  border-bottom: 1px solid $border-light;
}
</style>