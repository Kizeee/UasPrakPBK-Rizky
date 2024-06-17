import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layout/MainLayout.vue";
import Weather from "../components/Weather.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "/", component: Weather }],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
