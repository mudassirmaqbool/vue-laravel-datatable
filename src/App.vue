<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Column, LaravelResource, Product } from '@/types'
import dataTable from '@/components/data-table.vue'
import { useRootStore } from '@/stores/root'

const { getData } = useRootStore()

const loading = ref(true)
const products = ref<null | LaravelResource<Product>>(null)

const loadData = async () => {
  try {
    const { data } = await getData()
    products.value = data
  } catch (error) {
    console.log(error)
  }
  loading.value = false
}

const columns: Column[] = [
  {
    name: 'Name',
    key: 'name',
    sortable: true
  },
  {
    name: 'Category',
    key: 'category.name',
    sortable: true
  },
  {
    name: 'Price',
    key: 'price',
    sortable: true
  },
  {
    name: 'Stock',
    key: 'stock',
    sortable: true
  },
  {
    name: ''
  }
]

onMounted(() => {
  loadData()
})
</script>

<template>
  <div class="py-10">
    <h1 class="text-blue-600 mb-8 text-3xl text-center font-bold">Products</h1>

    <main>
      <div v-if="products" class="w-[1000px] mx-auto">

        <data-table v-model="products" :columns="columns"> 
          <template #body="{rows}" >
            <tr v-for="product in (rows as Product[])" :key="product.id">
              <td>{{product.name}}</td>
              <td>{{product.category?.name ?? '-'}}</td>
              <td>{{product.price}}</td>
              <td>{{product.stock}}</td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          </template>
        </data-table>


      </div>
    </main>

  </div>
</template>


<style lang="sass">
  tbody
    tr
      &:nth-child(even)
        td
          @apply bg-gray-100
      &:hover
          @apply bg-gray-200
      td
        @apply py-2 px-2 

</style>