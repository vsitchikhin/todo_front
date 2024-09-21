<template>
  <div class="bn-button" :style="propStyles" @click="onButtonClick">
    {{title}}
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "bn-button",

  props: {
    title: {
      type: String,
    },
    bgColor: {
      type: String,
      default: '#9ee666' // Рандомный зеленый
    },
    dark: {
      type: Boolean,
      default: () => false,
    },
    width: {
      type: String,
      default: () => null,
    }
  },

  emits: {
    'click': null,
  },

  data() {
    return {
      propStyles: {
        width: this.width ? this.width : 'fit-content',
        color: this.dark ? 'white' : '#2c3e50',
        'background-color': this.bgColor,
      }
    }
  },

  methods: {
    onButtonClick() {
      this.$emit('click');
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/css/variables';

.bn-button {
  cursor: pointer;
  transition: 0.3s;
  padding: 8px 24px;
  border: 2px solid $main-border;
  border-radius: 8px;
  font-size: 1.2rem;
  line-height: 1rem;
  font-weight: 600;

  &:hover {
    opacity: 0.8;
    transition: 0.3s;
  }
}
</style>