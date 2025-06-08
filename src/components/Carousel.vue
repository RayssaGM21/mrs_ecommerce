<template>
  <div class="relative w-full h-[650px] mx-auto overflow-hidden">
    <!-- Slides -->
    <div
      class="flex transition-transform duration-500"
      :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="min-w-full h-[650px]"
      >
        <img
          :src="image"
          alt="Slide"
          class="w-full h-[650px] object-cover"
        />
      </div>
    </div>

    <!-- Botões -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 text-white p-2"
    >
      <ChevronLeftIcon class="w-8 h-8"/>
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 text-white p-2"
    >
      <ChevronRightIcon class="w-8 h-8"/>
    </button>

    <!-- Indicadores -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      <span
        v-for="(image, index) in images"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'w-[8px] h-[8px] rounded-full cursor-pointer',
          currentIndex === index ? 'bg-white' : 'bg-white/50'
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import imageHero1 from '../assets/images/imageHero1.jpg'
import imageHero2 from '../assets/images/rolex.webp'
import imageHero from '../assets/images/imageHero.jpeg'

const images = [
  imageHero1,
  imageHero2,
  imageHero,
];

const currentIndex = ref(0);
let interval = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.length) % images.length;
};

const goToSlide = (index) => {
  currentIndex.value = index;
};

onMounted(() => {
  interval = setInterval(nextSlide, 8000);
});

onBeforeUnmount(() => {
  clearInterval(interval);
});
</script>
