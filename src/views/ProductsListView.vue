<template>
    <div v-if="loading && !searchQuery">
        <Loader/>
    </div>
    <div v-if="!loading || searchQuery">>
        <div class="h-[200px] flex items-center justify-center bg-gradient-to-b from-[#c5a2a6] to-transparent relative mt-[30px]">
            <h1 class="text-white text-4xl font-light uppercase tracking-widest text-center">
                {{ currentCategory || "Todos os Produtos" }}
            </h1>
        </div>

        <div class="px-4 sm:px-6 md:px-10 lg:px-[100px] flex flex-col gap-4">
            <div>
                <div class="mt-4" v-if="displayedProducts.length > 0">
                    <SortDropdown v-model="sort" @update:modelValue="applySort" />
                </div>
            </div>

            <div v-if="displayedProducts.length > 0" class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
            </div>

            <div v-else class="flex flex-col items-center justify-center mt-20 pb-[300px]">
                <ExclamationCircleIcon class="w-16 h-16 text-[#c5a2a6] mb-4" />
                <p class="text-2xl text-gray-600 font-semibold text-center">
                Ops, produto pesquisado não pode ser encontrado.
                </p>
                <p class="mt-2 text-gray-400 text-center">
                Nossa busca não pode encontrar o produto: <strong> {{searchQuery}} </strong>
                </p>
            </div>
        </div>


        <div class="flex justify-center mt-10 pb-10 gap-2" v-if="displayedProducts.length > 0">
            <button
                @click="prevPage"
                :disabled="page === 1"
                class="px-2 py-1 text-white font-bold border rounded disabled:opacity-50 bg-[#c5a2a6]">
                Anterior
            </button>
            <span class="text-[16px] text-gray-800 font-bold mt-1">
                Página {{ page }} de {{ totalPages }}
            </span>
            <button
                @click="nextPage"
                :disabled="page === totalPages"
                class="px-2 py-1 text-white font-bold border rounded disabled:opacity-50 bg-[#c5a2a6]">
                Próxima
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts
} from '../services/api'
import ProductCard from '../components/ProductCard.vue'
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import Loader from '../components/Loader.vue'
import SortDropdown from '../components/SortDropdown.vue'

const route = useRoute()

const products = ref([])
const categories = ref([])
const page = ref(1)
const limit = 9
const searchQuery = ref(route.query.busca || '')
const sort = ref('')
const currentCategory = ref('')
const totalProducts = ref(0)

const totalPages = computed(() => {
  return Math.ceil(totalProducts.value / limit)
})

const loading = ref(false)

const fetchProductsOrCategory = async () => {
  if (searchQuery.value.trim() !== '') {
    await performSearch(searchQuery.value)
  } 
  else {
    loading.value = true
    if (currentCategory.value) {
      const { data } = await getProductsByCategory(currentCategory.value)
      const all = data.products
      totalProducts.value = all.length
      products.value = all.slice((page.value - 1) * limit, page.value * limit)
    } else {
      const { data } = await getProducts(limit, (page.value - 1) * limit)
      products.value = data.products
      totalProducts.value = data.total
    }
    applySort()
    loading.value = false
  }
}



const performSearch = async (query) => {
  const { data } = await searchProducts(query)

  const all = data.products
  totalProducts.value = all.length
  products.value = all.slice((page.value - 1) * limit, page.value * limit)

  currentCategory.value = ''
  applySort()
}


const updateSearchAndPerform = async (query) => {
  searchQuery.value = query
  page.value = 1
  await fetchProductsOrCategory()
}


const clearSearch = async () => {
  searchQuery.value = ''
  page.value = 1
  await fetchProductsOrCategory()
}


const applySort = () => {
  if (sort.value === 'price_asc') {
    products.value.sort((a, b) => a.price - b.price)
  } 
  
  else if (sort.value === 'price_desc') {
    products.value.sort((a, b) => b.price - a.price)
  } 
  
  else if (sort.value === 'name_asc') {
    products.value.sort((a, b) => a.title.localeCompare(b.title))
  } 
  
  else if (sort.value === 'name_desc') {
    products.value.sort((a, b) => b.title.localeCompare(a.title))
  }
}


const filterByCategory = async (category) => {
  currentCategory.value = category
  searchQuery.value = ''
  page.value = 1
  await fetchProductsOrCategory()
}


const nextPage = async () => {
  if (page.value < totalPages.value) {
    page.value++
    await fetchProductsOrCategory()
  }
}


const prevPage = async () => {
  if (page.value > 1) {
    page.value--
    await fetchProductsOrCategory()
  }
}


const fetchCategories = async () => {
  const { data } = await getCategories()
  categories.value = data
}

const applyCategoryFromRoute = async () => {
  const category = route.query.categoria
  if (category && category !== currentCategory.value) {
    await filterByCategory(category)
  } 
  
  else if (!category && currentCategory.value) {
    currentCategory.value = ''
    page.value = 1
    await fetchProductsOrCategory()
  }
}

onMounted(async () => {
  await fetchCategories()
  await applyCategoryFromRoute()
})

watch(() => route.query.busca, (newBusca) => {
  if (newBusca !== undefined) {
    updateSearchAndPerform(newBusca)
  } 
  
  else {
    clearSearch()
  }
}, { immediate: true })

watch(() => route.query.categoria, () => {
  applyCategoryFromRoute()
})

watch(sort, () => {
  applySort()
})

const displayedProducts = computed(() => products.value)

</script>
