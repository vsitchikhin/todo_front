<template>
  <div class="bn-todo-list">
    <template v-if="atCard">
      <bn-todo-item
        v-for="item in todos"
        :key="item.id"
        :disabled="disabled"
        :todo="item"
        @click="onChangeTodo"
      />
    </template>
    <template v-else>
      <bn-todo-item
        v-for="item in completedTodos"
        :key="item.id"
        :disabled="disabled"
        :todo="item"
        @click="onChangeTodo"
      />
      <bn-divider />
      <bn-todo-item
        v-for="item in todosInProgress"
        :key="item.id"
        :disabled="disabled"
        :todo="item"
        @click="onChangeTodo"
      />
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {TodoDto} from "@/types/todos.types";
import BnTodoItem from "@/components/UI/BnTodoItem.vue";
import BnDivider from "@/components/UI/BnDivider.vue";

export default defineComponent({
  name: "BnTodoList",
  components: {BnDivider, BnTodoItem},

  props: {
    todos: {
      type: Array as PropType<TodoDto[]>,
      required: true
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
    atCard: {
      type: Boolean,
      default: () => false,
    }
  },

  emits: {
    'click': null,
  },

  data() {
    return {
      completedTodos: this.todos.filter(todo => todo.isComplete),
      todosInProgress: this.todos.filter(todo => !todo.isComplete),
    }
  },

  methods: {
    onChangeTodo(event: Event, todo: TodoDto) {
      this.$emit('click', event, todo)
    }
  }
})
</script>

<style scoped lang="scss">
.bn-todo-list {
  display: flex;
  flex-direction: column;
  align-content: center;
  gap: 12px;
  padding-bottom: 16px;
}
</style>