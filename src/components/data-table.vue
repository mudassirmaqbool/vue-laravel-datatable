<script lang="ts" setup>
import type { Column, LaravelResource } from '@/types'
import axios from 'axios';
import { onMounted, ref } from 'vue';


type Props = {
  resource: LaravelResource<any>
  columns: Column[]
}

const props = defineProps<Props>()

const loadingMore = ref(false)
const loadMore = async () => {
    if(!props.resource.next_page_url || !props.resource?.data) return
    console.log('load more')

    loadingMore.value = true
    try {
        const { data } = await axios.get(props.resource.next_page_url)
        console.log(data)
        // props.resource.data.push()
        
        // props.resource.next_page_url = data.next_page_url
    } catch (error) {
        console.log(error)
    }
    loadingMore.value = false
    
}


onMounted(() => {
  console.log('mounted', typeof props.resource.data)
})

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
