import type { LaravelResourceObject } from "@/types"

export type Product = LaravelResourceObject & {
  name: string | null,
  description: string | null,
  price: number
  stock: number
  category: {
    id: 1
    name: 'animi'
  }
}
