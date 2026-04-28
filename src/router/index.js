import { createRouter, createWebHistory } from "vue-router";
import StopsList from "../components/StopsList.vue";
import StopDetails from "../components/StopsDepartures.vue";

const routes = [
  {
    path: "/",
    redirect: "/przystanki"
  },
  {
    path: "/przystanki",
    component: StopsList,
  },
  {
    path: "/przystanki/:id",
    component: StopDetails,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;