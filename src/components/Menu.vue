<template>
    <div>
        <nav :class="[
            'fixed top-0 w-full z-50 backdrop-blur-md transition-colors duration-300',
            (isScrolled || isNotHome) ? 'bg-white shadow-md text-black' : 'bg-transparent text-white'
        ]">
            <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center py-4">
                    <router-link to="/" class="text-lg font-[500]">MRS Beauty</router-link>

                    <div class="flex items-center gap-4">
                        <div class="hidden md:block w-64">
                            <SearchInput v-model="searchQuery" :dark="!(isScrolled || isNotHome)"
                                @update:modelValue="handleSearchInput" />
                        </div>

                        <button @click="toggleMobileMenu" class="md:hidden text-current focus:outline-none"
                            aria-label="Abrir menu">
                            <Bars3Icon class="w-6 h-6" v-if="!mobileMenuOpen" />
                            <XMarkIcon class="w-6 h-6" v-else />
                        </button>

                        <ul class="hidden md:flex gap-8 relative">
                            <li>
                                <router-link to="/" class="hover:underline">Início</router-link>
                            </li>

                            <li class="relative">
                                <button @click="toggleDropdown" class="hover:underline focus:outline-none">
                                    Produtos
                                </button>

                                <transition name="fade-slide">
                                    <div v-if="showDropdown" v-click-outside="closeDropdown"
                                        :class="['absolute left-0 mt-2 shadow-md transition-colors rounded-md p-4 min-w-[250px] max-w-[450px] z-50 max-h-[300px] overflow-auto', (isScrolled || isNotHome) ? 'bg-white shadow-md text-black' : 'bg-transparent backdrop-blur-2lg text-white']"
                                        style="min-width: 250px;">
                                        <ul class="grid gap-2" :style="{
                                            gridTemplateColumns: `repeat(auto-fit, minmax(140px, 1fr))`,
                                        }">
                                            <li v-for="category in categories" :key="category.slug">
                                                <router-link :to="`/produtos?categoria=${category.slug}`"
                                                    :class="['block px-3 py-2 rounded text-sm', (isScrolled || isNotHome) ? 'hover:bg-gray-100' : 'hover:underline']"
                                                    @click="closeDropdown">
                                                    {{ category.name }}
                                                </router-link>
                                            </li>
                                            <li class="col-span-full">
                                                <router-link to="/produtos"
                                                    :class="['block px-3 py-2 rounded font-semibold text-center', (isScrolled || isNotHome) ? 'hover:bg-gray-100' : 'hover:underline']"
                                                    @click="closeDropdown">
                                                    Todos os Produtos
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                </transition>
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
            </div>

            <div v-if="mobileMenuOpen" :class="['md:hidden shadow-md', (isScrolled || isNotHome) ? 'bg-white shadow-md text-black' : 'bg-transparent text-white' ]">
                <ul class="flex flex-col p-4 gap-4">
                    <li>
                        <SearchInput v-model="searchQuery" :dark="!(isScrolled || isNotHome)"
                            @update:modelValue="handleSearchInput" @click.stop />
                    </li>
                    <li>
                        <router-link @click="closeMobileMenu" to="/" class="block">Início</router-link>
                    </li>

                    <li>
                        <button @click="toggleMobileDropdown"
                            class="w-full text-left hover:underline flex justify-between items-center"
                            aria-expanded="mobileDropdownOpen" aria-controls="mobile-products-dropdown">
                            Produtos
                            <ChevronUpIcon class="w-6 h-6" :class="{ 'transform rotate-180': mobileDropdownOpen }" />

                        </button>

                        <transition name="fade">
                            <ul v-if="mobileDropdownOpen" id="mobile-products-dropdown"
                                class="pl-4 mt-2 border-l border-gray-300 max-h-60 overflow-auto">
                                <li v-for="category in categories" :key="category.slug">
                                    <router-link :to="`/produtos?categoria=${category.slug}`"
                                        class="block py-1 hover:underline" @click="closeMobileMenu">
                                        {{ category.name }}
                                    </router-link>
                                </li>
                                <li>
                                    <router-link to="/produtos" class="block py-1 font-semibold hover:underline"
                                        @click="closeMobileMenu">
                                        Todos os Produtos
                                    </router-link>
                                </li>
                            </ul>
                        </transition>
                    </li>

                    <li>
                        <router-link @click="closeMobileMenu" to="/contact" class="block">Contato</router-link>
                    </li>

                    <li>
                        <router-link @click="closeMobileMenu" to="/cart" class="relative block">
                            Carrinho
                            <span v-if="cart.items.length > 0"
                                class="absolute -top-2 -right-2 bg-[#c5a2a6] text-white text-[10px] min-w-[16px] h-[16px] flex items-center justify-center rounded-full px-[2px]">
                                {{ cart.items.length }}
                            </span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { cart } from '../store/cart'
import { ShoppingBagIcon, Bars3Icon } from '@heroicons/vue/24/outline'
import { XMarkIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { getCategories } from '../services/api'
import { directive as vClickOutside } from 'click-outside-vue3'
import SearchInput from './SearchInput.vue'

const props = defineProps({
    productsCompRef: Object
})

// Router & route
const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
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

// Detecta se está fora da home
const isNotHome = computed(() => route.path !== '/')

// Dropdowns – desktop
const showDropdown = ref(false)
const toggleDropdown = () => { showDropdown.value = !showDropdown.value }
const closeDropdown = () => { showDropdown.value = false }

// Dropdowns – mobile
const mobileMenuOpen = ref(false)
const mobileDropdownOpen = ref(false)
const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
    if (!mobileMenuOpen.value) mobileDropdownOpen.value = false
}
const toggleMobileDropdown = () => {
    mobileDropdownOpen.value = !mobileDropdownOpen.value
}
const closeMobileMenu = () => {
    mobileMenuOpen.value = false
    mobileDropdownOpen.value = false
}

// Categorias
const categories = ref([])
const fetchCategories = async () => {
    try {
        const { data } = await getCategories()
        categories.value = data
    } catch (error) {
        console.error('Erro ao buscar categorias:', error)
    }
}

const searchQuery = ref('')

const handleSearchInput = (value) => {
    searchQuery.value = value

    const comp = props.productsCompRef?.value
    console.log('productsCompRef:', comp)
    if (!comp) return

    if (route.path !== '/produtos') {
        router.push({ path: '/produtos' }).then(() => {
            comp.updateSearchAndPerform(searchQuery.value)
        })
    } else {
        comp.updateSearchAndPerform(searchQuery.value)
    }
}

watch(() => route.path, (newPath) => {

    if (newPath !== '/produtos') {
        searchQuery.value = ''
        const comp = props.productsCompRef?.value
        if (comp?.clearSearch) comp.clearSearch()
    }
})
</script>


<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

</style>
