import { createRouter, createWebHistory } from "vue-router";
import StopsList from "../components/StopsList.vue";
import StopDetails from "../components/StopsDepartures.vue";
import Merge2Stops from "../components/Merge2Stops.vue";
import FirstPage from "../components/FirstPage.vue";

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
  {
    path: "/admin/polacz-przystanki",
    component: Merge2Stops,
  },
  {
    path: "/pierwsza-strona",
    component: FirstPage
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;