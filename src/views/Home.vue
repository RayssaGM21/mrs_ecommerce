<template>
  <section>
    <Carousel />
    <!-- <div class="absolute bottom-[80px] left-0 w-full h-32 bg-gradient-to-t from-white to-transparent"></div> -->
  </section>

  <section class=" relative h-[300px] bg-gradient-to-r from-[#c5a2a6] via-pink-300 to-rose-200 flex items-center justify-center text-white text-center px-4">
    <div>
      <h1 class="uppercase text-sm tracking-widest font-light mb-2">Perfumes Exclusivos</h1>
      <h2 class="text-4xl font-semibold">Celebre o Amor com Aromas Inesquecíveis</h2>
      <p class="mt-2 max-w-xl mx-auto text-white/90">
        Descubra nossa seleção especial de fragrâncias para tornar este Dia dos Namorados ainda mais memorável.
      </p>
    </div>
  </section>

  
  <section class="mt-12 px-4 sm:px-6 md:px-16 pb-4">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
      <h2 class="text-xl sm:text-2xl font-light tracking-widest uppercase text-[#c5a2a6]">
        Destaques em Fragrâncias
      </h2>
      <router-link to="/produtos?categoria=fragrances" class="text-sm text-[#c5a2a6] hover:underline">
        Ver todos
      </router-link>
    </div>
    
    <div class="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div class="flex gap-4">
        <ProductCard v-for="product in fragranceProducts" :key="product.id" :product="product"
        class="w-[70vw] sm:w-[220px] flex-shrink-0" />
      </div>
    </div>
  </section>
  
  <section class="mt-12 relative bg-black text-white">
    <video autoplay muted loop class="w-full h-[500px] object-contain brightness-75">
      <source :src="Video" type="video/mp4" />
    </video>
  </section>
  
  <section class=" relative h-[300px] bg-gradient-to-r from-blue-800 via-slate-800 to-gray-700 flex items-center justify-center text-white text-center px-4">
  <div>
    <h1 class="uppercase text-sm tracking-widest font-light mb-2">Relógios Elegantes</h1>
    <h2 class="text-4xl font-semibold">Estilo que Marca o Tempo</h2>
    <p class="mt-2 max-w-xl mx-auto text-white/90">
      Perfeito pro seu namorado — presenteie com classe e precisão neste Dia dos Namorados.
    </p>
  </div>
</section>


<section class="mt-12 px-4 sm:px-6 md:px-16">
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
    <h2 class="text-xl sm:text-2xl font-light tracking-widest uppercase text-[#c5a2a6]">
      Destaques em Relógios
    </h2>
    <router-link to="/produtos?categoria=mens-watches" class="text-sm text-[#c5a2a6] hover:underline">
      Ver todos
    </router-link>
  </div>
  
  <div class="overflow-x-auto scrollbar-hide -mx-4 px-4">
    <div class="flex gap-4">
      <ProductCard v-for="product in watchesProducts" :key="product.id" :product="product"
      class="w-[70vw] sm:w-[220px] flex-shrink-0" />
    </div>
  </div>
</section>

<section class="mt-12 relative bg-black text-white">
  <video autoplay muted loop class="w-full h-[500px] object-cover brightness-75">
    <source :src="VideoRolex" type="video/mp4" />
  </video>
</section>

</template>

<script setup>
import Carousel from '../components/Carousel.vue'
import Video from '../assets/images/landing/videoChannel.mp4'
import VideoRolex from '../assets/images/landing/videoRolex.mp4'
import { ref, onMounted } from 'vue'
import { getProductsByCategory } from '../services/api'
import ProductCard from '../components/ProductCard.vue'

const fragranceProducts = ref([])
const watchesProducts = ref([])

const fetchFragrances = async () => {
  try {
    const { data } = await getProductsByCategory('fragrances')
    fragranceProducts.value = data.products.slice(0, 10)
  } catch (error) {
    console.error('Erro ao buscar fragrâncias:', error)
  }
}
const fetchWatches = async () => {
  try {
    const { data } = await getProductsByCategory('mens-watches')
    watchesProducts.value = data.products.slice(0, 10)
  } catch (error) {
    console.error('Erro ao buscar relogios:', error)
  }
}

onMounted(() => {
  fetchFragrances()
  fetchWatches()
})





</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

</style>