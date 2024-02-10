import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("./pages/Home.vue"),
    name: "home.index",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
