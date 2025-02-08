export interface Product {
  id: number
  logo: string
  images: string[]
  name: string
  category: string
  amount: number
  price: number
  description: string
}

export type Category = string
export const categories: Category[] = ["еда", "одежда", "гантеля", "инопланетное"]