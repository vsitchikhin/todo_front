<template>
  <div class="bn-note-card" @click="onNoteClick">
    <div class="bn-note-card__header">
      <div class="bn-note-card__header-circle" :style="circleStyles" />
      <h1 class="bn-note-card__header-title">
        {{note.title}}
      </h1>
    </div>
    <div class="bn-note-card__todo-list">
      <bn-todo-list :todos="note.todos" disabled />
    </div>
    <div class="bn-note-card__activity-buttons">
      <bn-button title="Удалить" bg-color="red" dark width="100%" />
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {NoteDto} from "@/types/notes.types";
import BnTodoList from "@/components/UI/BnTodoList.vue";
import BnButton from "@/components/Controls/BnButton.vue";

export default defineComponent({
  name: "BnNoteCard",
  components: {BnButton, BnTodoList},

  props: {
    note: {
      type: Object as PropType<NoteDto>,
      required: true,
    },
    circleColor: {
      type: String,
      required: true,
    }
  },

  data() {
    return {
      circleStyles: {
        'background-color': this.circleColor,
      }
    }
  },

  methods: {
    onNoteClick() {
      if (!this.note.id) {
        return
      }
      this.$router.push({name: 'note', params: {id:  this.note.id.toString()}});
    }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/css/variables.scss';

.bn-note-card {
  width: 20%;
  height: 400px;
  background-color: $main-bg;
  box-shadow: 4px 4px 4px rgba(0,0,0,0.2);
  border-radius: 12px;
  transition: 0.3s;
  cursor: pointer;
  padding: 0 16px 16px;

  &:hover {
    box-shadow: 12px 12px 8px rgba(0,0,0,0.2);
    transition: 0.3s;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 20px
  }

  &__header-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
  }

  &__activity-buttons {
    display: flex;
    gap: 12px;
  }
}
</style>