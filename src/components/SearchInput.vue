<template>
  <div class="relative w-full">
    <MagnifyingGlassIcon
      class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
      :class="dark ? 'text-white' : 'text-gray-400'"
    />

    <input
      class="border-[0px] outline-[0px] rounded-none focus:border-b-[2px] rounded-md py-2 pl-10 pr-4 w-full h-[34px] text-sm transition-colors duration-200"
      :class="[
        dark
          ? 'bg-transparent text-white placeholder-white focus:border-white'
          : 'bg-transparent text-black placeholder-gray-500 focus:border-[#c5a2a6]'
      ]"
      v-model="searchQuery"
      @input="updateQuery"
      placeholder="Buscar produtos..."
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  dark: Boolean
})

const route = useRoute()
const router = useRouter()

const searchQuery = ref(route.query.busca || '')

const updateQuery = () => {
  const query = {}

  if (searchQuery.value) {
    query.busca = searchQuery.value
  }

  if (route.path !== '/produtos') {
    router.push({ path: '/produtos', query })
  } 
  
  else {
    router.replace({ query })
  }
}


watch(
  () => route.query.busca,
  (newBusca) => {
    if (newBusca !== searchQuery.value) {
      searchQuery.value = newBusca || ''
    }
  }
)
</script>
