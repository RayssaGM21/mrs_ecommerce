<template>
  <div v-if="pedidoConfirmado" class="flex flex-col items-center justify-center text-center h-[70vh] pt-[400px] pb-[400px]">
    <h1 class="text-4xl font-bold text-[#c5a2a6] mb-4">Pedido realizado com sucesso!</h1>
    <p class="text-lg text-gray-600 mb-6">Agradecemos pela sua compra. Você receberá os detalhes por e-mail em breve.</p>
    <router-link to="/produtos"
      @click="pedidoConfirmado = false"
      class="bg-[#c5a2a6] hover:bg-[#b28f92] text-white px-6 py-3 rounded-xl font-semibold transition"
    >
      Ver mais produtos
    </router-link>
  </div>

  <div v-else class="p-6 max-w-6xl mx-auto min-h-[90vh]">
    <h1 class="text-3xl font-bold mb-6 text-[#c5a2a6] flex items-center gap-2 mt-[50px]">
      <ShoppingBagIcon class="w-8 h-8" />
      Meus Pedidos
    </h1>

    <div
      v-if="cart.items.length === 0"
      class="flex flex-col items-center justify-center text-center h-[70vh] pt-20 pb-20 w-full mx-auto p-10"
    >
      <ExclamationCircleIcon
        class="w-20 h-20 mb-6 text-[#c5a2a6] animate-pulse"
      />
      <h2 class="text-3xl font-bold text-[#c5a2a6] mb-4">
        Sua sacola está vazia
      </h2>
      <p class="text-lg text-[#c5a2a6] mb-6">
        Adicione produtos para começar a montar seu pedido.
      </p>
      <router-link
        to="/produtos"
        class="bg-[#c5a2a6] hover:bg-[#b28f92] text-white px-6 py-3 rounded-xl font-semibold transition"
      >
        Ver produtos
      </router-link>
    </div>


    <div v-else class="flex flex-col md:flex-row gap-8">
      <!-- Lista de itens -->
      <div class="flex-1">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="border border-gray-200 shadow-sm rounded-2xl p-5 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white hover:shadow-md transition gap-4"
        >
          <div class="flex flex-col [@media(min-width:500px)]:flex-row gap-4 items-center [@media(min-width:500px)]:items-start">
            <img :src="item.thumbnail" alt="image" class="w-full sm:w-auto max-h-[160px] object-contain" />
            <div>
              <h2 class="font-semibold text-lg text-gray-800">{{ item.title }}</h2>
              <p class="text-sm text-gray-600">
                Preço:
                <span class="text-[#c5a2a6] font-medium">R$ {{ item.price }}</span>
              </p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-sm text-gray-600">Quantidade:</span>
                <div class="flex items-center gap-2">
                  <button
                    @click="item.quantity = Math.max(1, item.quantity - 1)"
                    :disabled="item.quantity <= 1"
                    class="p-1 rounded-full hover:bg-[#c5a2a6]/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <MinusIcon class="w-5 h-5 text-[#c5a2a6]" />
                  </button>
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    :min="1"
                    :max="item.stock"
                    @change="validateQuantity(item)"
                    class="w-16 border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#c5a2a6]"
                  />
                  <button
                    @click="item.quantity = Math.min(item.stock, item.quantity + 1)"
                    :disabled="item.quantity >= item.stock"
                    class="p-1 rounded-full hover:bg-[#c5a2a6]/10 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <PlusIcon class="w-5 h-5 text-[#c5a2a6]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            class="flex items-center gap-1 bg-[#c5a2a6] text-white px-3 py-2 rounded-xl hover:bg-[#b28f92] transition self-end btn-remover-responsive"
            @click="cart.removeFromCart(item.id)"
          >
            <TrashIcon class="w-5 h-5" />
            Remover
          </button>
        </div>
      </div>

      <!-- Resumo do pedido -->
      <div class="w-full md:w-[350px] h-fit border-2 border-dashed border-[#c5a2a6]/40 rounded-2xl p-6 shadow-sm bg-white">
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
          <input
            id="cupom"
            v-model="cupom"
            type="text"
            placeholder="Digite seu cupom"
            @blur="validarCupom"
            class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#c5a2a6]"
          />
        </div>

        <hr class="my-4 border-gray-200" />

        <div class="flex justify-between mb-6">
          <span class="text-lg font-semibold text-[#c5a2a6]">Total:</span>
          <span class="text-2xl font-bold text-[#c5a2a6]">R$ {{ total.toFixed(2) }}</span>
        </div>

        <button @click="confirmarPedido" class="w-full bg-[#c5a2a6] text-white py-3 rounded-xl hover:bg-[#b28f92] transition font-semibold">
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
import { showAlert } from '../services/alert.js';

const cupom = ref('')

const total = computed(() =>
  cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
)

const pedidoConfirmado = ref(false)

function confirmarPedido() {
  cart.items = []
  pedidoConfirmado.value = true
}

function validateQuantity(item) {
  if (item.quantity < 1) {
    item.quantity = 1
  }
  if (item.quantity > item.stock) {
    item.quantity = item.stock
    showAlert('Quantidade ajustada ao limite do estoque disponível!', 'warning')
  }
}

function validarCupom() {
  if (cupom.value.trim() != '') 
  {
    showAlert('Cupom inválido', 'error')
    cupom.value = ''
  }
}

</script>

<style scoped>
@media (min-width: 1013px) {
  .btn-remover-responsive {
    margin-top: 4 !important;
    align-self: auto !important;
  }
}
</style>
