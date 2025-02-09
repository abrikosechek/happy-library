export interface Product {
  id: number | string
  avatar: string
  gallery: string[]
  title: string
  category: string
  count: number | string
  price: number | string
  description: string
}

export interface Category {
  title: string,
  id: number | string
}