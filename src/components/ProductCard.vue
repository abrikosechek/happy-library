<template>
  <div class="card">
    <router-link :to="`/product/${id}`" class="card__logo" :style="`background-image: url(${avatar})`" />

    <router-link :to="`/product/${id}`" class="card__content">
      <Badge>
        {{ category }}
      </Badge>

      <h2 class="card__content__name">{{ title }}</h2>
      <p class="card__content__amount">Осталось: {{ count }}</p>
      <p class="card__content__price">$ {{ price }}</p>
    </router-link>

    <div class="card__footer">
      <button class="card__footer__button primary" @click="editProduct()">
        Изменить
      </button>
      <button class="card__footer__button remove" @click="removeProduct()">
        Удалить
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useModalsStore } from '@/store/modals';
import Badge from '@/components/Badge.vue';

const modalStore = useModalsStore()

interface Props {
  id?: number | string
  avatar: string
  gallery?: string[]
  title: string
  category: string
  count: number | string
  price: number | string
  description?: string
}

const props = defineProps<Props>()

const editProduct = () => {
  modalStore.setModal({
    name: "EditProduct",
    data: props,
  })
}

const removeProduct = () => {
  modalStore.setModal({
    name: "RemoveProduct",
    data: {
      id: props.id,
      title: props.title
    },
  })
}
</script>

<style scoped lang='scss'>
.card {
  width: 220px;
  height: 100%;
  background: white;
  border-radius: 6px;
  box-shadow: 0 0 6px rgba(0, 0, 0, .20);
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, .50);
  }

  &__logo {
    display: block;
    width: 100%;
    height: 200px;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 0 0 10px rgba(0, 0, 0, .10);
    text-decoration: unset;
    color: black;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 6px;
    text-decoration: unset;
    color: black;

    &__name {
      width: 100%;
      margin-top: 8px;
      font-size: 20px;
      line-height: 1em;
      text-wrap: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__amount {
      margin-top: 4px;
      opacity: 75%;
      font-size: 14px;
      line-height: 1em;
      font-weight: 600;
    }

    &__price {
      margin-top: 9px;
      font-size: 16px;
      line-height: 1em;
      font-weight: 700;
    }
  }

  &__footer {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    &__button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 28px;
      border: 0px;
      color: white;
      font-weight: 600;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s;

      // colors
      &.primary {
        background: var(--primary);

        &:hover {
          background: var(--primary-hover);
        }
      }

      &.remove {
        background: var(--error);

        &:hover {
          background: var(--error-hover);
        }
      }
    }
  }
}
</style>