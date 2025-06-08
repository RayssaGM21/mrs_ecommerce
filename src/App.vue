<script setup>
import Menu from './components/Menu.vue'
import Footer from './components/FooterComponent.vue'
import SuccessAlert from './components/Alert.vue'
import { ref, onMounted, nextTick } from 'vue'
import { registerAlert } from './services/alert.js'

const successAlertRef = ref(null)

onMounted(async () => {
  await nextTick()
  registerAlert(successAlertRef.value.showAlert)
})
</script>


<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <Menu></Menu>

    <main class="bg-white">
      <router-view />
      <SuccessAlert ref="successAlertRef" />
    </main>

      <Footer></Footer>
  </div> 
</template>

<style>
* {
  font-family: "Montserrat", sans-serif;
}

body{
  background-color: white !important;
}

html {
    scroll-behavior: smooth;
}

</style>