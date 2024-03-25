import type { LaravelResourceObject } from "@/types"

export type Category = {
    id: number
    name: string
}
export type Product = LaravelResourceObject & {
  name: string | null,
  description: string | null,
  price: number
  stock: number
  category?: Category | null
}
