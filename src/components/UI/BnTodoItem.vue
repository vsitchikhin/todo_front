<template>
  <div
    @click="onChangeTodo"
    :class="checkboxClasses"
    class="bn-todo-item"
  >
    <input
      type="checkbox"
      :id="`check-${todo.id}`"
      :value="todo.isComplete"
      class="bn-todo-item__checkbox"

    />
    <label
      :for="`check-${todo.id}`"
      class="bn-todo-item__label"
    >
      {{todo.title}}
    </label>

  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {TodoDto} from "@/types/todos.types";

export default defineComponent({
  name: "BnTodoItem",

  props: {
    todo: {
      type: Object as PropType<TodoDto>,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },

  emits: {
    'click': null,
  },

  data() {
    return {
      checkboxClasses: {
        'bn-todo-item--disabled': this.disabled,
      }
    }
  },

  methods: {
    onChangeTodo(event: Event) {
      this.$emit('click', event, this.todo)
    }
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";
.bn-todo-item {
  cursor: pointer;
  display: flex;
  align-items: center;

  &--disabled {
    cursor: default;
    pointer-events: none;
    opacity: 0.3;
  }

  &__checkbox {
    border-radius: 50%;
    appearance: none;
    outline: none;
    border: 2px solid $main-border;
    width: 20px;
    height: 20px;

    &:checked {
      // todo: сделать галочку
    }
  }

  &__label {
    font-size: 1.5rem;
    padding-left: 8px;
  }
}
</style>