<script setup>
import "@/styles/stops.css"
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>Przykładowa aplikacja</h1>

      <nav>
        <router-link to="/przystanki">Przystanki</router-link>
        <router-link to="/admin/polacz-przystanki">Połącz przystanki</router-link>
        <router-link to="/pierwsza-strona">Pierwszy program</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.header {
  padding: 16px;
  border-bottom: 1px solid #ddd;
  font-family: sans-serif;
}

nav a {
  margin-right: 12px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}
</style>