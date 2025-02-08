import { createWebHistory, createRouter } from "vue-router";

import ListPage from "@/pages/List.vue"
import ProductPage from "@/pages/Product.vue";

const routes = [
  {
    path: "/",
    component: ListPage
  },
  {
    path: "/product/:id",
    component: ProductPage
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})