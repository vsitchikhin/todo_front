<template>
  <div
    :class="checkboxClasses"
    class="bn-todo-item"
  >
    <input
      type="checkbox"
      :id="`check-${todo.id}`"
      :checked="todo.isComplete"
      class="bn-todo-item__checkbox"
      @change="onChangeTodo"
    />
    <label
      :for="`check-${todo.id}`"
      class="bn-todo-item__label"
    >
      {{todo.title}}
    </label>
    <img
      src="@/assets/icons/cross.svg"
      alt="delete"
      @click="onDeleteTodo"
      class="bn-todo-item__delete-icon"
    >
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
    'change': null,
    'delete': null,
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
      this.$emit('change', event, this.todo)
    },

    onDeleteTodo(event: Event) {
      this.$emit('delete', event, this.todo)
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
    cursor: pointer;

    &:checked {
      width: 12px;
      transform: rotate(-135deg);
      margin-left: 10px;
      margin-right: 5px;
      margin-bottom: 8px;
      border-bottom: 0;
      border-right: 0;
      border-radius: 0;
    }
  }

  &__label {
    font-size: 1.5rem;
    font-weight: 500;
    padding-left: 8px;
    cursor: pointer;

    &:checked {
      color: grey;
    }
  }

  &__delete-icon {
    width: 20px;
    height: 20px;
    padding-left: 8px;
  }
}
</style>