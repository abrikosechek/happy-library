<template>
  <div class="container">
    <div class="product">
      <router-link to="/" class="product__return">
        <span>&lt;</span> Ha главную
      </router-link>

      <section class="product__content">
        <SWIPER class="product__content__slider"></SWIPER>
        <div class="product__content__about">
          <Badge>
            {{ product.category }}
          </Badge>

          <h1 class="product__content__about__name">{{ product.name }}</h1>
          <p class="product__content__about__amount">Осталось: {{ product.amount }}</p>
          <p class="product__content__about__price">$ {{ product.price }}</p>
          <p class="product__content__about__description">{{ product.description }}</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { Product } from '@/consts';
import Badge from '@/components/Badge.vue';

const product: Product = {
  id: 12,
  logo: ["https://img.imageboss.me/fourwinds/width/425/dpr:2/shop/products/blackmonukka.jpg?v=1729795625", "https://www.gurneys.com/cdn/shop/files/61626A.webp?v=1729087445"],
  name: "Виноградинки",
  category: "еда",
  amount: 43244321424,
  price: 299.99,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean tempus lacinia sem ac sollicitudin. Pellentesque sodales, nunc non euismod elementum, nibh lacus placerat metus, at suscipit enim felis eu tortor. In hac habitasse platea dictumst. Aliquam pulvinar fringilla nulla, eget lobortis mauris luctus eget. Etiam porta, tortor at lobortis gravida, diam nulla ullamcorper arcu, egestas consequat tortor risus vel ante. Maecenas eget maximus nibh, id gravida ligula. Nam dictum tincidunt ex eu sodales. Praesent a justo lacinia, gravida elit pellentesque, facilisis nisl. Nam fringilla sollicitudin aliquet. Morbi at erat eu massa rhoncus blandit id congue magna. Phasellus vehicula ante et sem luctus sollicitudin. Aenean id augue magna. Vivamus posuere et lectus a ornare. Curabitur eleifend purus sed aliquet rutrum. Nullam scelerisque pretium odio, ut placerat quam aliquet ac.",
}
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
    gap: 8px;

    &__slider {
      flex: 0 0 auto;
      width: 300px;
      height: 345px;
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