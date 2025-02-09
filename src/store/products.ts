import { defineStore } from "pinia";
import type { Product, Category } from '@/consts';
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
          this.products = result.data
          resolve(result.data)
        }).catch((err: any) => reject(err))
      })
    },
    loadProduct(id: number | string) {
      return new Promise((resolve, reject) => {
        axios.get(`/inventories/${id}`).then((result: any) => {
          resolve(result.data)
        }).catch((err: any) => reject(err))
      })
    },
    editProduct(id: number | string, data: Product) {
      return new Promise((resolve, reject) => {
        if (!data) reject("Нет входных данных")

        axios.put(`/inventories/${id}`, data).then((result: any) => {
          this.products = this.products.map((item: Product) => {
            if (item.id === id) {
              return { id, ...result.data }
            } else {
              return item
            }
          })
          resolve(result.data)
        }).catch((err: any) => reject(err))
      })
    },
    createProduct(data: Product) {
      return new Promise((resolve, reject) => {
        axios.post(`/inventories`, data).then((result: any) => {
          this.products.push(result.data)
          resolve(result.data)
        }).catch((err: any) => reject(err))
      })
    },
    deleteProduct(id: number | string) {
      return new Promise((resolve, reject) => {
        axios.delete(`/inventories/${id}`).then((result: any) => {
          this.products = this.products.filter((item: Product) => item.id !== id)
          resolve(result.data)
        }).catch((err: any) => reject(err))
      })
    },
    loadCategories() {
      return new Promise((resolve, reject) => {
        axios.get("/categories").then((result: any) => {
          const transformedArray: Category[] = result.data.map((item: any) => ({
            title: item.title,
            id: Number(item.id)
          }))
          this.categories = transformedArray
          resolve(transformedArray)
        }).catch((err: any) => reject(err))
      })
    }
  }
})