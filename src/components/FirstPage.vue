<script setup>
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}
</script>

<template>
  <div class="container">
    <h2>Licznik</h2>

    <p class="value">{{ count }}</p>

    <button class="btn" v-on:click="increment">
      Kliknij mnie
    </button>
  </div>
</template>

<style scoped>
.container {
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
  font-family: sans-serif;
}

.value {
  font-size: 32px;
  margin: 20px 0;
}

.btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: #42b983;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
}
</style>