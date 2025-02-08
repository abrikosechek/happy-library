<template>
  <Header />
  <Router-view />

  <component :is="modalsList[modal.name]" v-if="modal !== null" />
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalsStore } from '@/store/modals';
import { modalsList } from '@/components/modals';
import Header from '@/components/Header.vue';

const modalStore = useModalsStore()

const { modal } = storeToRefs(modalStore)

onBeforeMount(() => {
  toggleScroll(modal.value == null)
})

watch(modal, (newValue) => {
  toggleScroll(newValue == null)
})

const toggleScroll = (state: boolean) => {
  if (state) {
    const bodyElement = document.body
    bodyElement.style.overflow = ""
  } else {
    const bodyElement = document.body
    bodyElement.style.overflow = "hidden"
  }
}
</script>

<style scoped></style>
