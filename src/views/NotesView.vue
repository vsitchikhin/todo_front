<template>
  <div class="notes-page">
    <header class="notes-page__header">
      <h1 class="notes-page__header-title">Список заметок</h1>
      <bn-button title="Создать заметку" bg-color="green" dark @click="gotoNote(true)" />
    </header>
    <bn-divider />
    <div class="notes-page__list">
      <bn-note-card v-for="(note, index) in noteList" :key="note.id" :note="note" :circle-color="HEADER_CIRCLE_COLORS[index % HEADER_CIRCLE_COLORS.length]" />
    </div>
    <bn-loader :loading="isLoading" />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {loadNoteList} from "@/utils/fetching.utils";
import BnNoteCard from "@/components/UI/BnNoteCard.vue";
import BnLoader from "@/components/Controls/BnLoader.vue";
import BnButton from "@/components/Controls/BnButton.vue";
import BnDivider from "@/components/UI/BnDivider.vue";
import {HEADER_CIRCLE_COLORS} from "@/consts/notes.consts";

export default defineComponent({
  name: "Notes",
  components: {BnDivider, BnButton, BnLoader, BnNoteCard},

  data() {
    return {
      isLoading: false,
      noteList: null,
      HEADER_CIRCLE_COLORS,
    }
  },

  methods: {
    gotoNote(isCreate: boolean, noteId: number) {
      console.log('click')
      if (isCreate) {
        this.$router.push({name: 'note'})
        return
      }
      this.$router.push({name: 'note', params: {id: noteId.toString()}})
    },

    async deleteNote(noteId: number) {

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
    flex-wrap: wrap;
    gap: 20px;
    padding-top: 12px;
  }
}
</style>