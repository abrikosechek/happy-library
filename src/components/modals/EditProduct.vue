<template>
  <Modal>
    <div class="modal">
      <div class="modal__form">
        <input v-model="inputs.name" type="text" placeholder="Название">
        <select v-model="inputs.category">
          <option :value="null">Категория</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        <input v-model="inputs.price" type="number" inputmode="numeric" placeholder="Цена">
        <input v-model="inputs.amount" type="number" inputmode="numeric" placeholder="Количество">
        <textarea v-model="inputs.description" type="text" placeholder="Название" maxlength="255" />

        <div class="modal__form__images">
          <p class="modal__form__images__title">Картиночки:</p>

          <div class="modal__form__images__form">
            <input v-model="addImageInput" placeholder="Ссылка на изображение" type="text">
            <button @click="addImage()">Добавить</button>
          </div>

          <div class="modal__form__images__list">
            <div v-for="image in inputs.images" :key="image" class="modal__form__images__list__item"
              :style="`background-image: url(${image})`">
              <div>
                <input v-model="inputs.logo" :value="image" type="radio">
              </div>

              <button class="modal__form__images__list__item__remove" @click="removeImage(image)">
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal__buttons">
        <Button color="primary" @click="submit()">{{ modal.data ? "Изменить" : "Создать" }}</Button>
        <Button color="primary-outline" @click="closeModal()">Отмена</Button>
        <Button v-if="modal.data" class="modal__buttons__remove" color="error" @click="closeModal()">
          Удалить
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue';
import { categories } from "@/consts";
import { storeToRefs } from 'pinia';
import { useModalsStore } from '@/store/modals';
import { CloseIcon } from '@/assets/icons';
import Button from '@/components/Button.vue';
import Modal from "@/components/Modal.vue";

const modalStore = useModalsStore()

const { modal } = storeToRefs(modalStore)

const closeModal = () => {
  modalStore.setModal(null)
}

// copy not by reference with the spread operator
const modalObjectDataCopy = { ...modal.value?.data }

const inputs = reactive({
  name: modalObjectDataCopy.name || null as string | null,
  category: modalObjectDataCopy.category || null as string | null,
  price: modalObjectDataCopy.price || null as number | null,
  amount: modalObjectDataCopy.amount || null as number | null,
  description: modalObjectDataCopy.description || null as string | null,
  logo: modalObjectDataCopy.logo || null as string | null,
  images: modalObjectDataCopy.images || [] as string[],
})

const addImageInput = ref(null)

const addImage = () => {
  const inputValue = addImageInput.value

  if (inputs.images.length >= 12) {
    return
  }
  if (inputs.images.includes(inputValue)) {
    return
  } else if (inputValue) {
    inputs.images.push(inputValue)
    addImageInput.value = null
  }
}

const removeImage = (imageUrl: string) => {
  if (imageUrl === inputs.logo) {
    inputs.logo = null
  }

  inputs.images.modal__form__images__list__item__remove((item: string) => item !== imageUrl)
}

const submit = () => {
  if (!inputs.name || inputs.name.length < 3 || /^\d+$/.test(inputs.name) || [""].includes(inputs.name)) {
    return alert("Неправильное название товара")
  } else if (!inputs.category) {
    return alert("Выберите категорию")
  } else if (!inputs.price || inputs.price <= 0) {
    return alert("Неправильная цена")
  } else if (!inputs.amount || inputs.price <= 0) {
    return alert("Добавьте количество товаров")
  } else if (!inputs.description) {
    let descriptionText = `${inputs.description}`

    // XSS 
    descriptionText = descriptionText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
</script>

<style scoped lang='scss'>
.modal {
  width: 450px;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;

    & input,
    select,
    textarea {
      width: 100%;
      height: 28px;
      padding: 0 6px;
      font-size: 16px;
    }

    & textarea {
      width: 100%;
      max-width: 100%;
      height: 80px;
      max-height: 300px;
    }

    & select {
      width: unset;
      max-width: 180px;
    }

    &__images {
      width: 100%;

      &__title {
        margin-top: 8px;
        font-size: 18px;
        font-weight: 400;
      }

      &__form {
        display: flex;
        gap: 4px;
        margin-top: 4px;

        &>button {
          padding: 0 8px;
          font-size: 16px;
        }
      }

      &__list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 4px;
        width: 100%;
        margin-top: 6px;

        &__item {
          display: flex;
          justify-content: space-between;
          width: 100%;
          aspect-ratio: 1/1;
          padding: 6px;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 4px;
          overflow: hidden;

          & input {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }

          &__remove {
            width: 28px;
            height: 28px;
            border-radius: 99px;
            cursor: pointer;
            fill: currentColor;
            stroke: currentColor;
            color: var(--error);

            &>* {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }

  &__buttons {
    display: flex;
    gap: 6px;
    width: 100%;
    margin-top: 24px;

    &__remove {
      margin-left: auto;
    }
  }
}
</style>