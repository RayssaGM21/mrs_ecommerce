<template>
    <div class="p-6 max-w-6xl mx-auto mt-[60px]">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div>
                <img :src="activeImage" class="w-full h-80 object-contain rounded-2xl shadow-sm mb-4" />
                <div class="flex gap-2 overflow-x-auto">
                    <img v-for="(img, index) in product.images" :key="index" :src="img" @click="activeImage = img"
                        class="w-24 h-24 object-contain hover:shadow-md rounded-lg border cursor-pointer transition" />
                </div>
            </div>


            <div>
                <h1 class="text-3xl font-bold text-[#c5a2a6] mb-2">{{ product.title }}</h1>
                <p class="text-sm text-gray-500 mb-4">{{ product.brand }} • SKU: {{ product.sku }}</p>
                <div class="flex items-center gap-2 mb-4">
                    <div class="flex">
                        <span v-for="star in 5" :key="star">
                            <svg v-if="star <= Math.round(product.rating)"
                                class="w-5 h-5 text-yellow-400 fill-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.376 2.454c-.782.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
                            </svg>
                            <svg v-else class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.376 2.454c-.782.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
                            </svg>
                        </span>
                    </div>
                    <span class="text-sm text-gray-500">({{ product.rating }})</span>
                </div>

                <p class="text-gray-700 mb-4">{{ product.description }}</p>


                <div class="mb-6">
                    <div class="flex items-center gap-2">
                        <span class="text-3xl font-bold text-[#c5a2a6]">R$ {{ discountedPrice }}</span>
                        <span v-if="product.discountPercentage" class="text-sm line-through text-gray-400">
                            R$ {{ product.price.toFixed(2) }}
                        </span>
                        <span v-if="product.discountPercentage"
                            class="bg-[#c5a2a6]/10 text-[#c5a2a6] text-xs font-medium px-2 py-1 rounded-full">
                            -{{ product.discountPercentage }}%
                        </span>
                    </div>
                </div>


                <p class="mb-2 text-sm text-gray-600">
                    <strong>Status:</strong> {{ product.availabilityStatus }}
                </p>
                <p class="mb-6 text-sm text-gray-600">
                    <strong>Estoque:</strong> {{ product.stock }} unidades
                </p>


                <button class="w-full bg-[#c5a2a6] text-white px-4 py-3 mt-5 rounded-xl hover:bg-[#b28f92] transition"
                    @click="addToCartHandler()">
                    Adicionar ao Carrinho
                </button>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mt-4">
                    <span v-for="tag in product.tags" :key="tag"
                        class="bg-[#c5a2a6]/10 text-[#c5a2a6] text-xs px-2 py-1 rounded-full">
                        {{ tag }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Informações adicionais -->
        <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-white border rounded-2xl shadow-sm p-6">
                <h2 class="text-lg font-bold text-[#c5a2a6] mb-4">Informações do Produto</h2>
                <ul class="text-sm text-gray-600 space-y-2">
                    <li><strong>Marca:</strong> {{ product.brand }}</li>
                    <li><strong>SKU:</strong> {{ product.sku }}</li>
                    <li><strong>Categoria:</strong> {{ product.category }}</li>
                    <li><strong>Peso:</strong> {{ product.weight }}g</li>
                    <li v-if="product.dimensions">
                        <strong>Dimensões:</strong>
                        {{ product.dimensions.width }} x {{ product.dimensions.height }} x {{ product.dimensions.depth
                        }} cm
                    </li>
                    <li v-else>
                        <strong>Dimensões:</strong> Não informado
                    </li>

                    <li><strong>Garantia:</strong> {{ product.warrantyInformation }}</li>
                    <li><strong>Envio:</strong> {{ product.shippingInformation }}</li>
                    <li><strong>Devolução:</strong> {{ product.returnPolicy }}</li>
                </ul>
            </div>

        </div>


        <div class="mt-10">
            <h2 class="text-xl font-bold text-[#c5a2a6] mb-4">Avaliações</h2>
            <div v-if="product.reviews && product.reviews.length > 0" class="space-y-8">
                <div v-for="(review, index) in product.reviews" :key="index"
                    class="bg-white border border-gray-200 rounded-3xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="font-semibold text-lg text-gray-800">{{ review.reviewerName }}</h3>
                        <time class="text-sm text-gray-400" :datetime="review.date">{{ new
                            Date(review.date).toLocaleDateString() }}</time>
                    </div>
                    <div class="flex mb-4">
                        <span v-for="star in 5" :key="star">
                            <svg v-if="star <= review.rating" class="w-5 h-5 text-yellow-400" fill="currentColor"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.376 2.454c-.782.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
                            </svg>
                            <svg v-else class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.376 2.454c-.782.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
                            </svg>
                        </span>
                    </div>
                    <p class="text-gray-700 text-base leading-relaxed">{{ review.comment }}</p>
                </div>
            </div>
            <div v-else class="text-gray-400 italic text-lg">Sem avaliações ainda.</div>
        </div>
    </div>

</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '../services/api'
import { cart } from '../store/cart'

const route = useRoute()
const product = ref({})
const activeImage = ref('')

function addToCartHandler() {
  cart.addToCart({ ...product.value, quantity: product.value.quantity })
}

onMounted(async () => {
    const { data } = await getProductById(route.params.id)
    product.value = data
    activeImage.value = data.thumbnail || (data.images && data.images[0]) || ''
    product.value.quantity = 0
})

const discountedPrice = computed(() => {
    if (!product.value.discountPercentage) return product.value.price?.toFixed(2)
    const discount = product.value.price * (product.value.discountPercentage / 100)
    return (product.value.price - discount).toFixed(2)
})

</script>
