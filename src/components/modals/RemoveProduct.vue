<template>
  <Modal>
    <div class="modal">
      <p>Удалить продукт <span> {{ modalStore.modal?.data.title }} </span>?</p>

      <div class="modal__buttons">
        <Button color="error" @click="submit()">Удалить</Button>
        <Button color="primary-outline" @click="closeModal()">Отмена</Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang='ts'>
import { useProductsStore } from '@/store/products';
import { useModalsStore } from '@/store/modals';
import Button from '@/components/Button.vue';
import Modal from "@/components/Modal.vue";

const productsStore = useProductsStore()
const modalStore = useModalsStore()

const closeModal = () => {
  modalStore.setModal(null)
}

const submit = () => {
  productsStore.deleteProduct(modalStore.modal?.data.id)
    .then(() => closeModal())
    .catch((err: any) => alert(err))
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