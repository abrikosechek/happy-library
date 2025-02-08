<template>
  <div class="container">
    <section class="list">
      <div class="list__header">
        <h1>Список товаров</h1>

        <Button @click="addProduct()">+ добавить</Button>
      </div>

      <div class="list__grid">
        <ProductCard v-for="index in 89" :key="index" :id="index"
          logo="https://storage.googleapis.com/cdn-activ-inside-site-20/production/2023/02/Grape-pomace.png"
          name="ВиноградикВиноградикВиноградик" category="еда" :amount="724" :price="299.99" />
      </div>
    </section>
  </div>
</template>

<script setup lang='ts'>
import { useModalsStore } from '@/store/modals';
import Button from '@/components/Button.vue';
import ProductCard from '@/components/ProductCard.vue';

const modalStore = useModalsStore()

const addProduct = () => {
  modalStore.setModal({
    name: "EditProduct"
  })
}
</script>

<style scoped lang='scss'>
.list {
  margin-top: 18px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;

    &>h1 {
      font-size: 32px;
      line-height: 1em;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(5, auto);
    gap: 8px;
    margin: 18px 0 12px;
  }
}
</style>