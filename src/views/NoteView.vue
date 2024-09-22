<template>
  <div class="note-page">
    <header class="note-page__header">
      <div v-if="isShowHeaderInput" class="note-page__header-title-block">
        <input
          v-model="newNoteTitle"
          type="text"
          placeholder="Введите название заметки"
          class="note-page__header-title-input"
          @blur="onUpdateNote"
          @keydown="onNoteEnterPressed"
        >
      </div>
      <div v-else class="note-page__header-title-block">
        <div class="note-page__header-circle" :style="circleStyles" />
        <h1 class="note-page__header-title">
          {{note.title}}
        </h1>
      </div>
    </header>
    <div class="note-page__buttons">
      <bn-button :title="headerTitle" @click="onHeaderButtonClick" class="note-page__header-button" />
      <bn-button
        v-if="note"
        title="Удалить заметку"
        bg-color="red"
        dark
        @click="onDeleteNote"
        class="note-page__header-button"
      />
      <bn-button title="Отменить изменения" bg-color="orange" dark @click="cancelChanges" />
    </div>
    <div class="note-page__list" v-if="note">
      <bn-todo-list
        :todos="note.todos"
        @change="onChangeTodo"
        @delete="onDeleteTodo"
        @update-title="onUpdateTodoTitle"
      />
    </div>
    <div v-if="note" class="note-page__add-block">
      <input
        v-model="newTodoTitle"
        type="text"
        placeholder="Введите задачу"
        class="note-page__add-input"
        @blur="onCreateTodo"
        @keydown="onTodoEnterPressed"
      >
    </div>
    <bn-loader :loading="isLoading" />
    <bn-confirmation-dialog
      :is-confirm="isConfirm"
      :open="isConfirmationOpen"
      :note-title="note?.title"
      @reject="isConfirmationOpen = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {
  createNote,
  createTodo,
  deleteNote,
  deleteTodo,
  loadNoteById,
  patchNote,
  patchTodo
} from "@/utils/fetching.utils";
import BnTodoList from "@/components/UI/BnTodoList.vue";
import {TodoDto} from "@/types/todos.types";
import BnLoader from "@/components/Controls/BnLoader.vue";
import {HEADER_CIRCLE_COLORS} from "@/consts/notes.consts";
import BnButton from "@/components/Controls/BnButton.vue";
import {NoteDto} from "@/types/notes.types";
import BnConfirmationDialog from "@/components/UI/BnConfirmationDialog.vue";

export default defineComponent({
  name: "Note",
  components: {BnConfirmationDialog, BnButton, BnLoader, BnTodoList},

  data() {
   return {
     isLoading: false,
     note: null as NoteDto | null,
     circleStyles: {
       'background-color': HEADER_CIRCLE_COLORS[parseInt(this.$route.params.id) % HEADER_CIRCLE_COLORS.length],
     },

     newTodoTitle: '',
     newNoteTitle: '',

     isShowHeaderInput: !this.$route.params.id,

     isConfirm: false,
     isConfirmationOpen: false,
   }
  },

  methods: {
    async onChangeTodo(event: Event, todo: TodoDto) {
      if (!todo.id) {
        return
      }
      this.isLoading = true
      await patchTodo(todo?.id, {...todo, isComplete: !todo.isComplete})
      localStorage.setItem('note', JSON.stringify(this.note))
      this.note = await loadNoteById(parseInt(this.$route.params.id))
      this.isLoading = false
    },

    async onDeleteTodo(event: Event, todo: TodoDto) {
      if (!todo.id) {
        return
      }
      this.isLoading = true

      await deleteTodo(todo.id)
      localStorage.setItem('note', JSON.stringify(this.note))
      this.note = await loadNoteById(parseInt(this.$route.params.id))
      this.isLoading = false
    },

    async onCreateTodo() {
      if (!this.newTodoTitle) {
        return
      }
      this.isLoading = true
      const todo: TodoDto = {
        title: this.newTodoTitle,
        isComplete: false,
        noteId: parseInt(this.$route.params.id),
      }
      this.newTodoTitle = ''
      await createTodo(todo)
      localStorage.setItem('note', JSON.stringify(this.note))
      this.note = await loadNoteById(parseInt(this.$route.params.id))
      this.isLoading = false
    },

    async onTodoEnterPressed(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        await this.onCreateTodo()
      }
    },

    async onHeaderButtonClick() {
      this.isShowHeaderInput = !this.isShowHeaderInput
    },

    async onUpdateNote() {
      if (!this.newNoteTitle) {
        return
      }

      if (this.$route.params.id && this.note) {
        this.isLoading = true
        const newNote = {
          ...this.note,
          title: this.newNoteTitle,
        }
        await patchNote(parseInt(this.$route.params.id), newNote)
        localStorage.setItem('note', JSON.stringify(this.note))
        this.note = await loadNoteById(parseInt(this.$route.params.id))
        this.newNoteTitle = ''
      }

      if (!this.$route.params.id) {
        this.isLoading = true
        const noteId = await createNote({title: this.newNoteTitle})
        await this.$router.push({params: {id: noteId}})
        localStorage.setItem('note', JSON.stringify(this.note))
        this.note = await loadNoteById(parseInt(this.$route.params.id))
        this.newNoteTitle = ''
      }

      this.isLoading = false
      this.isShowHeaderInput = false;
    },

    async onNoteEnterPressed(event: KeyboardEvent) {
      if (event.key === 'Enter') {
        await this.onUpdateNote()
      }
    },

    async cancelChanges() {
      try {
        this.isLoading = true
        const oldNote = JSON.parse(localStorage.getItem('note') || '')
        await patchNote(parseInt(this.$route.params.id), oldNote)

        if (this.note?.todos) {
          await Promise.all(this.note?.todos?.map(async (todo: TodoDto) => await deleteTodo(todo?.id || -1)))
        }

        if (oldNote?.todos) {
          await Promise.all(oldNote?.todos?.map(async (todo: TodoDto) => await createTodo(todo)))
        }

        this.note = await loadNoteById(parseInt(this.$route.params.id))
        this.isLoading = false
      } catch (error) {
        console.error(error)
      }
    },

    async onUpdateTodoTitle(todo: TodoDto) {
      try {
        console.log(todo.title)
        this.isLoading = true
        localStorage.setItem('note', JSON.stringify(this.note))
        await patchTodo(todo?.id || -1, todo)
        this.note = await loadNoteById(parseInt(this.$route.params.id))
        this.isLoading = false
      } catch (error) {
        console.error(error)
      }
    },

    onDeleteNote() {
      this.isConfirmationOpen = true
    },

    confirmDelete() {
      this.isConfirmationOpen = false
      this.isConfirm = true
    }
  },

  watch: {
    async isConfirm(value) {
      if (!value) {
        return
      }

      try {
        this.isLoading = true
        await deleteNote(parseInt(this.$route.params.id))
        await this.$router.push({name: 'notes'})
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.error(e)
      }

      this.isConfirm = false
    }
  },

  computed: {
    headerTitle() {
      return this.$route.params.id ? 'Изменить название' : 'Создать заметку';
    }
  },

  async created() {
    try {
      this.isLoading = true;
      this.note = await loadNoteById(parseInt(this.$route.params.id))
      localStorage.setItem('note', JSON.stringify(this.note))
      this.isLoading = false
    } catch(error) {
      console.error(error)
      this.isLoading = false
    }

  },

  async beforeDestroy() {
    localStorage.removeItem('note')
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/css/variables";

.note-page {
  &__header {
    display: flex;
    align-items: center;
  }

  &__header-title-block {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  &__header-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  &__add-block {
    display: flex;
  }

  &__add-input,
  &__header-title-input {
    outline: none;
    border: 2px solid $main-border;
    border-radius: 8px;
    padding: 8px 12px;
    width: 440px;
    font-size: 16px;
    line-height: 1rem;
    font-weight: 600;
    color: $main-font;
  }

  &__header-title-input {
    font-size: 24px;
  }

  &__buttons {
    display: flex;
    gap: 12px;
    padding-top: 24px;
    padding-bottom: 32px;
  }
}
</style>