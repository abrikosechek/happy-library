<template>
  <Modal>
    <div class="modal">
      <p>Удалить продукт <span> {{ modalStore.modal.data.name }} </span>?</p>

      <div class="modal__buttons">
        <Button color="error">Удалить</Button>
        <Button color="primary-outline" @click="closeModal()">Отмена</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang='ts'>
import { useModalsStore } from '@/store/modals';
import Button from '@/components/Button.vue';
import Modal from "@/components/Modal.vue";

const modalStore = useModalsStore()

const closeModal = () => {
  modalStore.setModal(null)
}
</script>

<style scoped lang='scss'>
.modal {
  min-width: 250px;
  max-width: 450px;

  &>p {
    font-size: 18px;

    &>span {
      color: var(--primary)
    }
  }

  &__buttons {
    display: flex;
    gap: 6px;
    margin-top: 24px;
  }
}
</style>