<template>
  <div class="p-6 max-w-6xl mx-auto min-h-[90vh]">
    <h1 class="text-3xl font-bold mb-6 text-[#c5a2a6] flex items-center gap-2 mt-[50px]">
      <ShoppingBagIcon class="w-8 h-8" />
      Meus Pedidos
    </h1>

    <div v-if="cart.items.length === 0" class="text-gray-500 flex items-center gap-2 justify-center h-[50vh]">
      <ExclamationCircleIcon class="w-8 h-8 text-[#c5a2a6]" />
      Sua sacola está vazia.
    </div>

    <div v-else class="flex flex-col md:flex-row gap-8">
      <!-- Lista de itens -->
      <div class="flex-1">
        <div v-for="item in cart.items" :key="item.id"
          class="border border-gray-200 shadow-sm rounded-2xl p-5 mb-4 flex justify-between items-center bg-white hover:shadow-md transition">
          <div class="flex gap-4">
            <img :src="item.thumbnail" alt="image" class="w-auto max-h-[160px] object-contain">
            <div>
              <h2 class="font-semibold text-lg text-gray-800">{{ item.title }}</h2>
              <p class="text-sm text-gray-600">
                Preço:
                <span class="text-[#c5a2a6] font-medium">R$ {{ item.price }}</span>
              </p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-sm text-gray-600">Quantidade:</span>
                <div class="flex items-center gap-2">
                  <button @click="item.quantity = Math.max(1, item.quantity - 1)" :disabled="item.quantity <= 1"
                    class="p-1 rounded-full hover:bg-[#c5a2a6]/10 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <MinusIcon class="w-5 h-5 text-[#c5a2a6]" />
                  </button>

                  <input type="number" v-model.number="item.quantity" :min="1" :max="item.stock"
                    @change="validateQuantity(item)"
                    class="w-16 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#c5a2a6]" />

                  <button @click="item.quantity = Math.min(item.stock, item.quantity + 1)"
                    :disabled="item.quantity >= item.stock"
                    class="p-1 rounded-full hover:bg-[#c5a2a6]/10 transition disabled:opacity-50 disabled:cursor-not-allowed">
                    <PlusIcon class="w-5 h-5 text-[#c5a2a6]" />
                  </button>
                </div>

              </div>
            </div>
          </div>
          <button
            class="flex items-center gap-1 bg-[#c5a2a6] text-white px-3 py-2 rounded-xl hover:bg-[#b28f92] transition"
            @click="cart.removeFromCart(item.id)">
            <TrashIcon class="w-5 h-5" />
            Remover
          </button>
        </div>
      </div>

      <!-- Resumo do pedido -->
      <div
        class="w-full md:w-[350px] h-fit border-2 border-dashed border-[#c5a2a6]/40 rounded-2xl p-6 shadow-sm bg-white">
        <h2 class="text-xl font-bold mb-4 text-[#c5a2a6]">Resumo do Pedido</h2>

        <div class="flex justify-between mb-2">
          <span class="text-gray-700">Subtotal:</span>
          <span class="text-[#c5a2a6]">R$ {{ total.toFixed(2) }}</span>
        </div>

        <div class="flex justify-between mb-4">
          <span class="text-gray-700">Frete:</span>
          <span class="text-gray-500">A calcular</span>
        </div>

        <!-- Cupom -->
        <div class="mb-4">
          <label for="cupom" class="block text-sm text-gray-700 mb-1">Cupom de desconto</label>
          <input id="cupom" v-model="cupom" type="text" placeholder="Digite seu cupom"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c5a2a6]" />
        </div>

        <hr class="my-4 border-gray-200" />

        <div class="flex justify-between mb-6">
          <span class="text-lg font-semibold text-[#c5a2a6]">Total:</span>
          <span class="text-2xl font-bold text-[#c5a2a6]">R$ {{ total.toFixed(2) }}</span>
        </div>

        <button class="w-full bg-[#c5a2a6] text-white py-3 rounded-xl hover:bg-[#b28f92] transition font-semibold">
          Confirmar Pedido
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { cart } from '../store/cart'
import { PlusIcon, MinusIcon, ShoppingBagIcon, TrashIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

const cupom = ref('')

const total = computed(() =>
  cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

function validateQuantity(item) {
  if (item.quantity < 1) {
    item.quantity = 1
  }
  if (item.quantity > item.stock) {
    item.quantity = item.stock
    alert('Quantidade ajustada ao limite do estoque disponível!')
  }
}

</script>
