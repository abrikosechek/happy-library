<template>
  <Modal>
    <div class="modal">
      <div class="modal__form">
        <input v-model="inputs.title" type="text" placeholder="Название">
        <select v-model="inputs.category">
          <option :value="null">Категория</option>
          <option v-for="category in productsStore.categories" :key="category">{{ category.title }}</option>
        </select>
        <input v-model="inputs.price" type="number" inputmode="numeric" placeholder="Цена">
        <input v-model="inputs.count" type="number" inputmode="numeric" placeholder="Количество">
        <textarea v-model="inputs.description" type="text" placeholder="Название" maxlength="255" />

        <div class="modal__form__images">
          <p class="modal__form__images__title">Картиночки:</p>

          <div class="modal__form__images__form">
            <input v-model="addImageInput" placeholder="Ссылка на изображение" type="text">
            <button @click="addImage()">Добавить</button>
          </div>

          <div class="modal__form__images__list">
            <div v-if="inputs.avatar" class="modal__form__images__list__item active"
              :style="`background-image: url(${inputs.avatar})`">
              <button class="modal__form__images__list__item__remove" @click="inputs.avatar = null">
                <CloseIcon />
              </button>
            </div>
            <div v-for="image in inputs.gallery" :key="image" class="modal__form__images__list__item"
              :style="`background-image: url(${image})`" @click.self="setImageAsLogo(image)">

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
        <Button v-if="modal.data" class="modal__buttons__remove" color="error" @click="deleteProduct()">
          Удалить
        </Button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang='ts'>
import DOMPurify from 'dompurify';
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalsStore } from '@/store/modals';
import { useProductsStore } from '@/store/products';
import { CloseIcon } from '@/assets/icons';
import Button from '@/components/Button.vue';
import Modal from "@/components/Modal.vue";

const modalStore = useModalsStore()
const productsStore = useProductsStore()

const { modal } = storeToRefs(modalStore)

const closeModal = () => {
  modalStore.setModal(null)
}

// copy not by reference with the spread operator
const modalObjectDataCopy = { ...modal.value?.data }

const inputs = reactive({
  title: modalObjectDataCopy.title || null as string | null,
  category: modalObjectDataCopy.category || null as string | null,
  price: modalObjectDataCopy.price || null as number | null,
  count: modalObjectDataCopy.count || null as number | null,
  description: modalObjectDataCopy.description || null as string | null,
  avatar: modalObjectDataCopy.avatar || null as string | null,
  gallery: modalObjectDataCopy.gallery || [] as string[],
})

const addImageInput = ref(null)

const setImageAsLogo = (imageUrl: string) => {
  if (inputs.avatar) {
    inputs.gallery.unshift(inputs.avatar)
  }

  inputs.avatar = imageUrl
  inputs.gallery = inputs.gallery.filter((item: string) => item != imageUrl)
}

const addImage = () => {
  const inputValue = addImageInput.value

  if (inputs.gallery.length >= 12) {
    return alert("Достигнут максимум изображений")
  }
  if (inputs.gallery.includes(inputValue)) {
    return alert("Уже есть такое изображение")
  } else if (inputValue) {
    inputs.gallery.push(inputValue)
    addImageInput.value = null
  }
}

const removeImage = (imageUrl: string) => {
  if (imageUrl === inputs.avatar) {
    inputs.avatar = null
  }

  inputs.gallery = inputs.gallery.filter((item: string) => item !== imageUrl)
}

const submit = () => {
  if (!inputs.title || inputs.title.length < 3 || /^\d+$/.test(inputs.title) || [""].includes(inputs.title)) {
    return alert("Неправильное название товара")
  } else if (!inputs.category) {
    return alert("Выберите категорию")
  } else if (!inputs.price || inputs.price <= 0) {
    return alert("Неправильная цена")
  } else if (!inputs.count || inputs.price <= 0) {
    return alert("Добавьте количество товаров")
  } else if (!inputs.avatar) {
    return alert("Выберите основное фото, оно будет отображаться в карточке товара")
  }

  // XSS 
  const descriptionText = `${inputs.description}`
  inputs.description = DOMPurify.sanitize(descriptionText);

  // submit request
  if (modal.value.data) {
    productsStore.editProduct(modal.value.data.id, inputs)
      .then(() => closeModal())
      .catch((err: any) => alert(err))
  } else {
    productsStore.createProduct(inputs)
      .then(() => closeModal())
      .catch((err: any) => alert(err))
  }
}

const deleteProduct = () => {
  modalStore.setModal({
    name: "RemoveProduct",
    data: {
      id: modal.value.data.id,
      title: modal.value.data.title
    },
  })
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
          cursor: pointer;
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
          justify-content: flex-end;
          width: 100%;
          aspect-ratio: 1/1;
          padding: 6px;
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          border-radius: 4px;
          cursor: pointer;
          overflow: hidden;

          &.active {
            border: 2px solid var(--primary);
            cursor: default;
          }

          &:not(.active):hover {
            border: 1px solid var(--primary-hover);
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