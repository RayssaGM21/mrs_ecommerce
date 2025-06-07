<template>
    <div>
        <nav :class="[
            'fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-300',
            (isScrolled || isNotHome) ? 'bg-white shadow-md text-black' : 'bg-transparent text-white'
        ]">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <router-link to="/" class="text-lg font-[500]">
                        MRS Beauty
                    </router-link>

                    <ul class="hidden md:flex gap-8 relative">
                        <li>
                            <router-link to="/" class="hover:underline">Início</router-link>
                        </li>

                        <li class="relative">
                            <button @click="toggleDropdown" class="hover:underline focus:outline-none">
                                Produtos
                            </button>

                            <div v-if="showDropdown"
                                class="absolute left-0 mt-2 bg-white text-black shadow-md rounded-md p-4 min-w-[300px] max-w-[400px] z-50">
                                <ul class="grid [grid-template-columns:repeat(2,minmax(160px,1fr))] gap-[8px]">
                                    <li v-for="category in categories" :key="category.slug">
                                        <router-link :to="`/produtos?categoria=${category.slug}`"
                                            class="block px-3 py-2 hover:bg-gray-100 rounded text-sm"
                                            @click="closeDropdown">
                                            {{ category.name }}
                                        </router-link>
                                    </li>
                                    <li class="col-span-2">
                                        <router-link to="/produtos"
                                            class="block px-3 py-2 hover:bg-gray-100 rounded font-semibold text-center"
                                            @click="closeDropdown">
                                            Todos os Produtos
                                        </router-link>
                                    </li>
                                </ul>
                            </div>


                        </li>

                        <li>
                             <router-link to="/contact" class="hover:underline">Contato</router-link>
                        </li>

                        <li>
                            <router-link to="/cart" class="relative hover:underline">
                                <span v-if="cart.items.length > 0"
                                    class="absolute -top-2 -right-2 bg-[#c5a2a6] text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[2px]">
                                    {{ cart.items.length }}
                                </span>
                                <ShoppingBagIcon class="w-5 h-5" />
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { cart } from '../store/cart'
import { ShoppingBagIcon } from '@heroicons/vue/24/outline'
import { getCategories } from '../services/api'

const isScrolled = ref(false)
const route = useRoute()

const isNotHome = computed(() => route.path !== '/')

const handleScroll = () => {
    isScrolled.value = window.scrollY > 200
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
    fetchCategories()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

// 🔥 Dropdown controle
const showDropdown = ref(false)

const toggleDropdown = () => {
    showDropdown.value = !showDropdown.value
}

const closeDropdown = () => {
    showDropdown.value = false
}

// 🔥 Fetch categorias
const categories = ref([])

const fetchCategories = async () => {
    try {
        const { data } = await getCategories()
        categories.value = data
    } catch (error) {
        console.error('Erro ao buscar categorias:', error)
    }
}
</script>
