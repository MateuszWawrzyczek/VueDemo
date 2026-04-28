<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const globalId = route.params.id;

const departures = ref([]);
const stopName = ref("");
const loading = ref(true);
const error = ref(null);
let refreshTimer = null;

async function loadDepartures() {
  try {
    const now = new Date();
    const today = now.toISOString().split("T")[0];

    const res = await fetch(
      `/api/timetable/departures?date=${today}&globalId=${globalId}&hours=24&max=20`
    );

    if (!res.ok) throw new Error("Błąd pobierania danych");

    const data = await res.json();

    stopName.value = data.stopName || "";
    departures.value = data.departures || [];
    error.value = null;
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadDepartures();
  refreshTimer = setInterval(loadDepartures, 15000);
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
});
</script>

<template>
  <div class="container">

    <h2 class="title">
      {{ stopName || "Przystanek" }}
    </h2>

    <div v-if="loading" class="state">
      Ładowanie odjazdów...
    </div>

    <div v-else-if="error" class="state error">
      Nie udało się pobrać najlepszych odjazdów z tego przystanku
    </div>

    <div v-else-if="departures.length === 0" class="state">
      Z tego przystanku nie odjedzie dzisaj już żaden autobus
    </div>

    <table v-else class="table">
      <thead>
        <tr>
          <th>Linia</th>
          <th>Kierunek</th>
          <th>Godzina</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(d, i) in departures" :key="i">
          <td>{{ d.routeShortName }}</td>
          <td>{{ d.headsign }}</td>
          <td>{{ d.departureTime?.slice(0, 5) }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: 40px auto;
  font-family: sans-serif;
}

.title {
  margin-bottom: 16px;
}

.state {
  padding: 12px;
  color: #555;
}

.error {
  color: red;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  border-bottom: 2px solid #ddd;
  padding: 8px;
}

.table td {
  padding: 10px 8px;
  border-bottom: 1px solid #eee;
}

.table tr:hover {
  background: #f7f7f7;
}
</style>