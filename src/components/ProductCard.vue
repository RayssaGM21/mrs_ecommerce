<template>
  <div class="group border rounded-3xl p-4 flex flex-col shadow-sm hover:shadow-lg transition-shadow bg-white">
    <router-link :to="`/product/${product.id}`">

      <div class="relative overflow-hidden rounded-2xl">
        <img :src="product.thumbnail" :alt="product.title"
          class="w-full h-52 object-contain group-hover:scale-105 transition-transform duration-300" />
      </div>


      <div class="flex flex-col flex-1 mt-4">
        <h2 class="font-semibold text-lg text-gray-800 group-hover:text-black line-clamp-2">
          {{ product.title }}
        </h2>
        <p class="text-xs text-gray-500 mt-1 capitalize">
          {{ product.category }}
        </p>
        <p class="text-sm text-gray-600">
          <strong>Estoque:</strong> {{ product.stock }} unidades
        </p>

        <div class="flex mt-4 mb-4">
          <span v-for="star in 5" :key="star">
            <svg v-if="star <= Math.round(product.rating)" class="w-5 h-5 text-yellow-400 fill-yellow-400"
              fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.376 2.454c-.782.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.374 2.453a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118L10 13.347l-3.376 2.454c-.782.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.635 9.394c-.783-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.967z" />
            </svg>
          </span>
        </div>


        <p class="mb-2 text-xl font-bold text-[#c5a2a6]">
          R$ {{ product.price }}
        </p>
        
      </div>
      </router-link>
        <button class="w-full bg-[#c5a2a6] text-white px-4 py-3 mt-auto rounded-xl hover:bg-[#b28f92] transition"
          @click="addToCartHandler()">
          Adicionar ao Carrinho
        </button>

    </div>
</template>

<script setup>
import { cart } from '../store/cart'

const props = defineProps({ product: Object })

function addToCartHandler() {
  cart.addToCart(props.product)
}
</script>
