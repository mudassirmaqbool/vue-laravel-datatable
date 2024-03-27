<script setup lang="ts">
defineProps<{
  icon: 'up' | 'down'
}>()
</script>

<template>
  <div>
    <span v-if="icon === 'up'"
      ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 5l6 6m-6-6l-6 6m6-6v14"/></svg></span>
    <span v-else
      ><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m12 19l6-6m-6 6l-6-6m6 6V5"/></svg></span>
  </div>
</template>
