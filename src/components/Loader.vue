<template>
  <div class="overlay">
    <div class="loader"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(197, 162, 166, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 6px solid white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
