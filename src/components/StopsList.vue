<script setup>
import "@/styles/stops.css"
import { ref, computed, onMounted } from "vue";

const stops = ref([]);
const search = ref("");
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch("/api/stops");
    if (!res.ok) throw new Error("Błąd pobierania danych");

    stops.value = await res.json();
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
});

const filteredStops = computed(() => {
  if (!search.value) return stops.value;

  return stops.value.filter((s) =>
    s.stopName.toLowerCase().includes(search.value.toLowerCase())
  );
});
</script>

<template>
  <div class="container">
    <h2 class="title"> Przystanki</h2>

    <input
      v-model="search"
      placeholder="Szukaj przystanku..."
      class="search"
    />

    <div v-if="error" class="error">
        Błąd pobierania danych
    </div>

    <ul v-else-if="loading" class="list">
      <li v-for="n in 6" :key="n" class="skeleton-item">
        <div class="skeleton badge"></div>
        <div class="skeleton text"></div>
      </li>
    </ul>

    <ul v-else class="list">
      <li
        v-for="stop in filteredStops"
        :key="stop.stopId"
        class="item"
      >
        <router-link :to="`/przystanki/${stop.globalId}`" class="item-link">
          <span class="name">
            {{ stop.stopName }}
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  max-width: 650px;
  margin: 40px auto;
  font-family: sans-serif;
}

.title {
  margin-bottom: 12px;
}

.search {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: 0.2s;
  cursor: pointer;
}

.item:hover {
  background: #f7f7f7;
  transform: translateX(2px);
}

.badge {
  background: #42b983;
  color: white;
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 999px;
  min-width: 50px;
  text-align: center;
}

.name {
  flex: 1;
}

.error {
  color: red;
  margin-top: 10px;
}

.skeleton-item {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.skeleton {
  background: #e0e0e0;
  border-radius: 6px;
  animation: pulse 1.2s infinite ease-in-out;
}

.skeleton.badge {
  width: 50px;
  height: 18px;
}

.skeleton.text {
  flex: 1;
  height: 18px;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

.item-link {
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
}
</style>