<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useRootStore } from './stores/root'
import type { LaravelResource } from './types/laravel';
import type { User } from './types/users';

const { getData } = useRootStore()


  const loading = ref(true);
  const users = ref<null | LaravelResource<User>>(null);

  const loadData = async  () => {
    const {data} = await getData();
    users.value = data;
    loading.value = false;
  }

  onMounted(() => {
    loadData();
  })

</script>

<template>
  <div>
    <h1>Users</h1>
    <ul v-if="users">
      <li v-for="user in users.data" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>
