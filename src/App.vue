<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRootStore } from '@/stores/root'
import type { LaravelResource, Product } from '@/types';

const { getData } = useRootStore()


  const loading = ref(true);
  const products = ref<null | LaravelResource<Product>>(null);

  const loadData = async  () => {
    const { data } = await getData();
    products.value = data;
    loading.value = false;
  }

  onMounted(() => {
    loadData();
  })

</script>

<template>
  <div>
    <h1 class="text-blue-600 text-2xl">Products</h1>
    <ul v-if="products">
      <li v-for="product in products.data" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>
