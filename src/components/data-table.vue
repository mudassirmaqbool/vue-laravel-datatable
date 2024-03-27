<script lang="ts" setup>
import type { Column, LaravelResource } from '@/types'
import sortIcon from './sort-icon.vue'
import axios from 'axios'
import { computed, ref, watch } from 'vue'

type Props = {
  columns: Column[]
}

const props = defineProps<Props>()

const resource = defineModel<LaravelResource<any>>({ required: true })


const loadingMore = ref(false)
const loadMore = async () => {
  if (!resource.value.next_page_url || !resource.value.data) return
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


const sort_by = ref<null | string>(null)
const sort_direction = ref<null| 'asc' | 'desc'>(null)

watch(
  sort_by,
  () => fetchData(),
)

watch(
  sort_direction,
  () => fetchData(),
)


const fetchData = async () => {
  console.log("we are here")
  try {
    const {data} = await axios.get(resource.value.path, {
      params: {
        sort_by: sort_by.value,
        sort_direction: sort_direction.value
      }
    })
    resource.value = data
  } catch (error) {
    console.log(error)
  }
}



const setSort = (column: Column) => {
  if (!column.sortable || !column.key) return
  if (sort_by.value === column.key) {
    sort_direction.value = sort_direction.value === 'asc' ? 'desc' : 'asc'
  } else {
    sort_by.value = column.key
    sort_direction.value = 'asc'
  }
}

const activeColumn = computed(() => {
  return props.columns.find(column => column.key === sort_by.value)
})

</script>

<template>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th @click="setSort(column)"  v-for="column in columns" :key="column.name" class="hover:bg-gray-300 cursor-pointer">
            <div class="flex items-center gap-1">
              <div v-if="column.sortable" class="flex items-center gap-[2px] text-lg text-gray-400">
                <sort-icon :class="`${activeColumn?.key === column.key && sort_direction === 'desc' ? 'text-gray-700' : ''}`" icon="up" />
                <sort-icon :class="`${activeColumn?.key === column.key && sort_direction === 'asc'  ? 'text-gray-700' : ''}`" icon="down" />
              </div>
              <span>
                {{ column.name }}
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <slot name="body" :rows="resource.data" />
      </tbody>
    </table>
    <footer class="flex justify-center py-8">
      <button
        v-if="resource.next_page_url"
        @click.prevent="loadMore"
        class="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-700"
      >
        <span v-if="loadingMore">Loading...</span>
        <span v-else>Load More</span>
      </button>
    </footer>
  </div>
</template>

<style lang="sass">
thead
  tr
    th
      @apply bg-gray-100 py-2 px-2 text-left
</style>
