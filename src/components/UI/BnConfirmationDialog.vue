<template>
  <div v-if="open" class="bn-confirmation-dialog">
    <div class="bn-confirmation-dialog__card">
      <h1 class="bn-confirmation-dialog__title">Вы действительно хотите удалить заметку {{noteTitle}}</h1>
      <div class="bn-confirmation-dialog__buttons-block">
        <bn-button
          title="Да"
          bg-color="red"
          dark
          width="40%"
          @click="confirm"
        />
        <bn-button
          title="Нет"
          bg-color="green"
          dark
          width="40%"
          @click="reject"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BnButton from "@/components/Controls/BnButton.vue";

export default defineComponent({
  name: "BnConfirmationDialog",
  components: {BnButton},

  props: {
    isConfirm: {
      type: Boolean,
      default: () => false,
    },
    noteTitle: {
      type: String,
      required: true
    },
    open: {
      type: Boolean,
      default: () => false,
    }
  },

  emits: {
    'confirm': null,
    'reject': null,
  },

  methods: {
    confirm() {
      this.$emit('confirm')
    },

    reject() {
      this.$emit('reject');
    },
  }

})
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";

.bn-confirmation-dialog {
  background-color: rgba(255, 255, 255, 0.6);
  position: fixed;
  width: 100vw;
  height: 100dvh;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &__title {
    font-size: 28px;
  }

  &__card {
    background-color: $main-bg;
    padding: 24px;
    box-shadow: 0 4px 4px 2px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  &__buttons-block {
    display: flex;
    gap: 16px;
  }
}
</style>