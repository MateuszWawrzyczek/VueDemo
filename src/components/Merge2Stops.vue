<script setup>
import { ref, computed, onMounted } from "vue";

const stops = ref([]);
const search = ref("");

const selected1 = ref(null);
const selected2 = ref(null);

const loading = ref(false);
const loadingStops = ref(true);

const toast = ref({ show: false, message: "", type: "success" });

function showToast(message, type = "success") {
  toast.value = { show: true, message, type };

  setTimeout(() => {
    toast.value.show = false;
  }, 2500);
}

onMounted(async () => {
  try {
    const res = await fetch("/api/stops");
    stops.value = await res.json();
  } catch (e) {
    showToast("Błąd pobierania przystanków", "error");
  } finally {
    loadingStops.value = false;
  }
});

const filteredStops = computed(() => {
  if (!search.value) return stops.value;

  return stops.value.filter((s) =>
    s.stopName.toLowerCase().includes(search.value.toLowerCase())
  );
});

async function mergeStops() {
  if (!selected1.value || !selected2.value) {
    showToast("Wybierz oba przystanki", "error");
    return;
  }

  if (selected1.value === selected2.value) {
    showToast("Nie możesz łączyć tego samego przystanku", "error");
    return;
  }

  loading.value = true;

  try {
    const res = await fetch("/api/StopsGroup/Merge2Stops", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        globalId1: selected1.value,
        globalId2: selected2.value,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Błąd");

    showToast(data.message || "Przystanki połączone", "success");

    selected1.value = null;
    selected2.value = null;
  } catch (e) {
    showToast(e.message, "error");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="panel">

    <div v-if="toast.show" :class="['toast', toast.type]">
      {{ toast.message }}
    </div>

    <h2 class="title">Połącz przystanki</h2>

    <input
      v-model="search"
      class="input"
      placeholder="Szukaj przystanku..."
    />

    <div class="box">
      <h3>Przystanek 1</h3>

      <select v-model="selected1" class="select">
        <option disabled value="">Wybierz przystanek</option>
        <option
          v-for="s in filteredStops"
          :key="s.globalId"
          :value="s.globalId"
        >
          {{ s.stopName }} - {{ s.globalId }}
        </option>
      </select>
    </div>

    <div class="box">
      <h3>Przystanek 2</h3>

      <select v-model="selected2" class="select">
        <option disabled value="">Wybierz przystanek</option>
        <option
          v-for="s in filteredStops"
          :key="s.globalId"
          :value="s.globalId"
        >
          {{ s.stopName }} - {{ s.globalId }}
        </option>
      </select>
    </div>

    <button
      class="btn"
      :disabled="loading"
      @click="mergeStops"
    >
      <span v-if="loading">Łączenie...</span>
      <span v-else>Połącz przystanki</span>
    </button>

    <p v-if="loadingStops">Ładowanie przystanków...</p>

  </div>
</template>

<style scoped>
.panel {
  max-width: 600px;
  margin: 40px auto;
  font-family: sans-serif;
}

.title {
  margin-bottom: 20px;
}

.input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.box {
  margin-bottom: 15px;
}

.select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.btn {
  width: 100%;
  padding: 10px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.btn:disabled {
  background: #aaa;
  cursor: not-allowed;
}

.btn:hover:not(:disabled) {
  transform: translateY(-1px);
}

.toast {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 16px;
  border-radius: 8px;
  color: white;
  z-index: 999;
}

.toast.success {
  background: #42b983;
}

.toast.error {
  background: #e74c3c;
}
</style>