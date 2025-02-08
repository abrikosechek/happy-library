import { defineStore } from "pinia";
import type { Product } from '@/consts';
import axios from "@/plugins/axios";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [] as Product[],
    categories: [] as string[]
  }),
  actions: {
    loadProducts() {
      return new Promise((resolve, reject) => {
        axios.get("/inventories").then((result: any) => {
          const transformedArray: Product[] = result.data.map((item: any) => ({
            id: Number(item.id),
            logo: item.avatar,
            images: item.gallery,
            name: item.title,
            category: item.category,
            amount: Number(item.count),
            price: Number(item.price),
            description: item.description,
          }))
          this.products = transformedArray
          resolve(transformedArray)
        }).catch((err: any) => reject(err))
      })
    },
    loadProduct(id: number) {
      return new Promise((resolve, reject) => {
        axios.get(`/inventories/${id}`).then((result: any) => {
          const transformedArray: Product = {
            id: Number(result.data.id),
            logo: result.data.avatar,
            images: result.data.gallery,
            name: result.data.title,
            category: result.data.category,
            amount: Number(result.data.count),
            price: Number(result.data.price),
            description: result.data.description,
          }
          resolve(transformedArray)
        }).catch((err: any) => reject(err))
      })
    },
    loadCategories() {
      return new Promise((resolve, reject) => {
        axios.get("/categories").then((result: any) => {
          const transformedArray: Product[] = result.data.map((item: any) => item.title)
          this.categories = transformedArray
          resolve(transformedArray)
        }).catch((err: any) => reject(err))
      })
    }
  }
})