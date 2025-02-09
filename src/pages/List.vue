<template>
  <div class="container">
    <section class="list">
      <div class="list__header">
        <h1>Список товаров</h1>

        <Button @click="addProduct()">+ добавить</Button>
      </div>

      <Pagination v-model="currentPage" :pages="pagesCount" />

      <div v-if="products" class="list__grid">
        <ProductCard v-for="product in displayedProducts" :key="product.id" v-bind="product" />
      </div>

      <Pagination v-model="currentPage" :pages="pagesCount" />
    </section>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useProductsStore } from '@/store/products';
import { useModalsStore } from '@/store/modals';
import Pagination from '@/components/Pagination.vue';
import Button from '@/components/Button.vue';
import ProductCard from '@/components/ProductCard.vue';

const pageLength = 20

const productsStore = useProductsStore()
const modalStore = useModalsStore()

const { products } = storeToRefs(productsStore)

const addProduct = () => {
  modalStore.setModal({
    name: "EditProduct"
  })
}

const currentPage = ref<number>(1)
const pagesCount = computed(() => {
  const productsArrayPages = Math.ceil(products.value.length / pageLength)
  return Math.max(productsArrayPages, 1)
})
const displayedProducts = computed(() => {
  console.log((currentPage.value - 1) * pageLength, pageLength)
  return products.value.slice((currentPage.value - 1) * pageLength, currentPage.value * pageLength)
})
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