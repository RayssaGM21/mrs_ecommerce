<template>
<div class="h-[200px] flex items-center justify-center bg-gradient-to-b from-[#c5a2a6] to-transparent relative mt-[60px]">
  <h1 class="text-white text-4xl font-light uppercase tracking-widest text-center">
    {{ currentCategory ? currentCategory : "Todos os Produtos" }}
  </h1>
</div>

  <div class="pl-[100px] pr-[100px] flex flex-col gap-4">
    <div>
      
      <!-- Busca -->
      <div class="mt-4">
        <input v-model="searchQuery" @input="search"
          class="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-[#c5a2a6]"
          placeholder="Buscar produtos..." 
          />
      </div>

      <!-- Ordenação -->
      <div class="mt-4">
        <select v-model="sort" @change="applySort"
          class="border rounded p-1 w-full focus:outline-none focus:ring-2 focus:ring-[#c5a2a6]">
          <option value="">Ordenar por</option>
          <option value="price_asc">Preço Crescente</option>
          <option value="price_desc">Preço Decrescente</option>
          <option value="name_asc">Nome A-Z</option>
          <option value="name_desc">Nome Z-A</option>
        </select>
      </div>
    </div>

    <!-- Lista de Produtos -->
    <div class="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <ProductCard v-for="product in displayedProducts" :key="product.id" :product="product" />
    </div>
  </div>

  <!-- Paginação -->
  <div class="flex justify-center mt-4 gap-2">
    <button @click="prevPage" :disabled="page === 1" class="px-2 py-1 border rounded disabled:opacity-50">
      Anterior
    </button>
    <span>Página {{ page }}</span>
    <button @click="nextPage" class="px-2 py-1 border rounded">
      Próxima
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  searchProducts
} from '../services/api'
import ProductCard from '../components/ProductCard.vue'

const products = ref([])
const categories = ref([])
const page = ref(1)
const limit = 9
const searchQuery = ref('')
const sort = ref('')
const currentCategory = ref('')

const route = useRoute()

const fetchProducts = async () => {
  const { data } = await getProducts(limit, (page.value - 1) * limit)
  products.value = data.products
  currentCategory.value = ''
  searchQuery.value = ''
}

const fetchCategories = async () => {
  const { data } = await getCategories()
  categories.value = data
}

const filterByCategory = async (category) => {
  const { data } = await getProductsByCategory(category)
  products.value = data.products
  currentCategory.value = category
  page.value = 1
}

const search = async () => {
  if (searchQuery.value.trim() === '') {
    fetchProducts()
    return
  }
  const { data } = await searchProducts(searchQuery.value)
  products.value = data.products
  currentCategory.value = ''
  page.value = 1
}

const applySort = () => {
  if (sort.value === 'price_asc') {
    products.value.sort((a, b) => a.price - b.price)
  } else if (sort.value === 'price_desc') {
    products.value.sort((a, b) => b.price - a.price)
  } else if (sort.value === 'name_asc') {
    products.value.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sort.value === 'name_desc') {
    products.value.sort((a, b) => b.title.localeCompare(a.title))
  }
}

const nextPage = () => {
  page.value++
  if (currentCategory.value) {
    filterByCategory(currentCategory.value)
  } else {
    fetchProducts()
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
    if (currentCategory.value) {
      filterByCategory(currentCategory.value)
    } else {
      fetchProducts()
    }
  }
}

const displayedProducts = computed(() => products.value)

const applyCategoryFromRoute = () => {
  const category = route.query.categoria
  console.log(category)
  if (category) {
    filterByCategory(category)
  } else {
    fetchProducts()
  }
}

onMounted(() => {
  fetchCategories()
  applyCategoryFromRoute()
})

watch(() => route.query.categoria, () => {
  applyCategoryFromRoute()
})
</script>