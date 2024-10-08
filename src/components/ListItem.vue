<template>
  <!-- All Notes -->
  <div
    role="button"
    tabindex="0"
    class="h-16 px-2.5"
    :class="itemContainerClass"
    @click="toEdit"
    @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            toEdit()
          }
        }"
  >
    <div class="flex items-center justify-between pt-2">
      <p class="truncate">{{ note.title ? note.title : 'Untitled' }}</p>
      <div
        v-if="note.deletableFlag"
        role="button"
        tabindex="0"
        class="hover:border-1 hover:scale-105 hover:cursor-pointer hover:rounded-full hover:border-gray-dark hover:bg-gray-dark"
        @click.stop="modalVisibilityHandler(true)"
        @keydown="(e: KeyboardEvent) => { 
          if (e.key === 'Enter' || e.key === ' ') {
            modalVisibilityHandler(true)
          }
        }"
      >
        <IconLoader
          class="shrink-0"
          name="trash"
        />
      </div>
    </div>
    <p class="truncate text-base opacity-20">{{ note.contents }}</p>
  </div>
  <BaseModal
    :open="isOpen"
    dialog-class="rounded-3xl drop-shadow-2xl"
    wrapper-class="p-4 h-80 rounded-3xl w-130 bg-gray-light"
    :on-close="() => modalVisibilityHandler(false)"
  >
    <div class="mt-6 flex border-b border-gray-dark">
      <IconLoader
        class="mr-2"
        name="alert-triangle"
      />
      <p class="text-xl font-bold">Delete this note?</p>
    </div>
    <p class="mt-10 text-lg">You're going to delete the...</p>
    <p class="mt-10 truncate text-center text-lg font-bold">{{ note.title ? note.title : 'Untitled' }}</p>
    <div class="mt-12 flex justify-end">
      <BaseSquareButton
        class="mr-2"
        width-num="w-32"
        size="md"
        color="purple"
        @on-click="() => modalVisibilityHandler(false)"
      >
        <template #text>No, Keep it</template>
      </BaseSquareButton>
      <BaseSquareButton
        width-num="w-32"
        size="md"
        color="pink"
        @on-click="() => deleteNoteHandler(note.id)"
      >
        <template #text>Yes, Delete!</template>
      </BaseSquareButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useNoteStore } from '../stores/useNoteStore'
  import { PreviewNoteResponse } from '../types/api/response/types'
  import BaseModal from './base/BaseModal.vue'
  import BaseSquareButton from './base/BaseSquareButton.vue'
  import IconLoader from './svg/IconLoader.vue'

  const store = useNoteStore()
  const router = useRouter()
  const route = useRoute()

  const props = defineProps<{
    note: PreviewNoteResponse
  }>()

  const isOpen = ref(false)
  const modalVisibilityHandler = (value: boolean) => {
    isOpen.value = value
  }

  const itemContainerClass = computed(() => {
    return Number.parseInt(Array.isArray(route.params.noteId) ? '' : route.params.noteId) === props.note.id
      ? 'border-2 border-blue bg-gray-dark'
      : 'border-b border-r border-gray-dark hover:bg-gray-light'
  })

  const deleteNoteHandler = (userId: number) => {
    store.deleteNote(userId)
    modalVisibilityHandler(false)
  }

  const toEdit = () =>
    router.push({
      name: 'edit',
      params: {
        noteId: props.note.id
      }
    })
</script>
