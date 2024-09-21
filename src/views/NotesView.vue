<template>
  <div class="notes-page">
    <header class="notes-page__header">
      <h1 class="notes-page__header-title">Список заметок</h1>
      <bn-button title="Создать заметку" bg-color="green" dark @click="gotoNote(true)" />
    </header>
    <bn-divider />
    <div class="notes-page__list">
      <bn-note-card
        v-for="note in noteList"
        :key="note.id"
        :note="note"
        :circle-color="HEADER_CIRCLE_COLORS[note.id % HEADER_CIRCLE_COLORS.length]"
        @delete="deleteNote"
      />
    </div>
    <bn-loader :loading="isLoading" />
    <bn-confirmation-dialog
      :is-confirm="isConfirm"
      :open="isConfirmationOpen"
      :note-title="noteList?.find(note => note.id === deleteNoteId)?.title || ''"
      @reject="isConfirmationOpen = false"
      @confirm="onDeleteNote"
    />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {deleteNote, loadNoteList} from "@/utils/fetching.utils";
import BnNoteCard from "@/components/UI/BnNoteCard.vue";
import BnLoader from "@/components/Controls/BnLoader.vue";
import BnButton from "@/components/Controls/BnButton.vue";
import BnDivider from "@/components/UI/BnDivider.vue";
import {HEADER_CIRCLE_COLORS} from "@/consts/notes.consts";
import BnConfirmationDialog from "@/components/UI/BnConfirmationDialog.vue";
import {NoteDto} from "@/types/notes.types";

export default defineComponent({
  name: "Notes",
  components: {BnConfirmationDialog, BnDivider, BnButton, BnLoader, BnNoteCard},

  data() {
    return {
      isLoading: false,
      noteList: null as NoteDto[] | null,
      HEADER_CIRCLE_COLORS,

      isConfirmationOpen: false,
      isConfirm: false,
      deleteNoteId: null as number | null,
    }
  },

  methods: {
    gotoNote(isCreate: boolean, noteId: number) {
      if (isCreate) {
        this.$router.push({name: 'note'})
        return
      }
      this.$router.push({name: 'note', params: {id: noteId.toString()}})
    },

    deleteNote(noteId: number) {
      this.deleteNoteId = noteId;
      this.isConfirmationOpen = true
    },

    onDeleteNote() {
      this.isConfirmationOpen = false
      this.isConfirm = true
    }
  },

  async created() {
    try {
      this.isLoading = true;
      this.noteList = await loadNoteList()
      this.isLoading = false;
    } catch (error) {
      console.error(error)
      this.isLoading = false;
    }
  },

  watch: {
    async isConfirm(value) {
      if (!value || !this.deleteNoteId) {
        return
      }

      try {
        this.isLoading = true
        await deleteNote(this.deleteNoteId)
        this.noteList = await loadNoteList()
        this.isLoading = false
      } catch (e) {
        this.isLoading = false
        console.error(e)
      }
      this.isConfirm = false
    }
  }
})
</script>

<style scoped lang="scss">
.notes-page {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__list {
    display: flex;
    gap: 20px;
    padding-top: 12px;
    flex-wrap: wrap;
  }
}
</style>