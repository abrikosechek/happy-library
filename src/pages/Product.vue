<template>
  <div class="container">
    <div v-if="product" class="product">
      <router-link to="/" class="product__return">
        <span>&lt;</span> Ha главную
      </router-link>

      <section class="product__content">
        <Swiper class="product__content__slider" :modules="swiperModules" loop navigation :pagination="{ clickable: true }">
          <SwiperSlide>
            <div class="product__content__slider__item" :style="`background-image: url(${product.avatar})`" />
          </SwiperSlide>
          <SwiperSlide v-for="image in product.gallery" :key="image">
            <div class="product__content__slider__item" :style="`background-image: url(${image})`" />
          </SwiperSlide>

        </Swiper>

        <div class="product__content__about">
          <Badge>
            {{ product.category }}
          </Badge>

          <h1 class="product__content__about__name">{{ product.title }}</h1>
          <p class="product__content__about__amount">Осталось: {{ product.count }}</p>
          <p class="product__content__about__price">$ {{ product.price }}</p>
          <p class="product__content__about__description">{{ product.description }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Product } from '@/consts';
import { useProductsStore } from '../store/products';
import Badge from '@/components/Badge.vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiperModules = [Navigation, Pagination]

const route = useRoute()

const productsStore = useProductsStore()

const product = ref<Product | null>(null)

onBeforeMount(async () => {
  const productById = await productsStore.loadProduct(Number(route.params.id))
  console.log(productById)
  product.value = productById
})
</script>

<style scoped lang='scss'>
.product {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  &__return {
    color: black;
    text-decoration: unset;
    font-size: 20px;
    line-height: 1em;
    font-weight: 500;

    &>span {
      opacity: 65%;
    }

    &:hover {
      &>span {
        opacity: 100%;
      }
    }
  }

  &__content {
    display: flex;
    width: 800px;
    gap: 16px;

    &__slider {
      flex: 0 0 auto;
      width: 300px;
      height: 345px;
      border-radius: 12px;

      &__item {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
      }
    }

    &__about {
      flex: 1 1 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      &__name {
        margin-top: 10px;
        font-size: 32px;
        line-height: 1em;
      }

      &__name {
        margin-top: 10px;
        font-size: 32px;
        line-height: 1em;
      }

      &__amount {
        margin-top: 10px;
        opacity: 85%;
        font-size: 16px;
        line-height: 1em;
      }

      &__price {
        margin-top: 16px;
        font-size: 20px;
        line-height: 1em;
        font-weight: 600;
      }

      &__description {
        margin-top: 16px;
        opacity: 80%;
        font-size: 16px;
      }
    }
  }
}
</style>