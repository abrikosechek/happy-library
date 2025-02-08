<template>
  <div class="modal-wrapper" @click.self="closeModal()">
    <div class="modal">
      <slot />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useModalsStore } from '@/store/modals';

const modalStore = useModalsStore()

const closeModal = () => {
  modalStore.setModal(null)
}
</script>

<style scoped lang='scss'>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100dvh;
  padding: 24px;
  background: rgba(0, 0, 0, .4);
  backdrop-filter: blur(10px);
}

.modal {
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
}
</style>