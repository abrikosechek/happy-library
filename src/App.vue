<template>
  <Header />
  <Router-view />

  <Transition name="opacitytransition">
    <component :is="modalsList[modal.name]" v-if="modal !== null" />
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalsStore } from '@/store/modals';
import { useProductsStore } from '@/store/products';
import { modalsList } from '@/components/modals';
import Header from '@/components/Header.vue';

const modalStore = useModalsStore()
const productsStore = useProductsStore()

const { modal } = storeToRefs(modalStore)

onBeforeMount(() => {
  toggleScroll(modal.value == null)

  productsStore.loadProducts()
  productsStore.loadCategories()
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

<style scoped>
.opacitytransition-enter-active,
.opacitytransition-leave-active {
  transition: opacity 0.3s ease;
}

.opacitytransition-enter-from,
.opacitytransition-leave-to {
  opacity: 0;
}
</style>
