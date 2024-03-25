<script lang="ts" setup>
import type { Column, LaravelResource } from '@/types'
import axios from 'axios';
import { ref } from 'vue';


type Props = {
  columns: Column[]
}

defineProps<Props>()

const resource = defineModel<LaravelResource<any>>({required: true});

const loadingMore = ref(false)
const loadMore = async () => {
    if(!resource.value.next_page_url || !resource.value.data) return
    console.log('load more', resource.value)

    loadingMore.value = true
    try {
        const { data } = await axios.get(resource.value.next_page_url)
        console.log(data)
        resource.value.data.push(...data.data)
        resource.value.next_page_url = data.next_page_url
    } catch (error) {
        console.log(error)
    }
    loadingMore.value = false
}


</script>

<template>
    <div>
        <table class="w-full">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.name" class="bg-gray-100 py-2 px-2">{{column.name}}</th>
            </tr>
          </thead>
          <tbody>
              <slot name="body" :rows="resource.data" />
          </tbody>
        </table>
        <footer class="flex justify-center py-8">
            <button v-if="resource.next_page_url" @click.prevent="loadMore" class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700 ">
                <span v-if="loadingMore">Loading...</span>
                <span v-else>Load More</span>
            </button>
        </footer>
    </div>
</template>
