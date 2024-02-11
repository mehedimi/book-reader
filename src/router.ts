import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: ReadonlyArray<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("./pages/Home.vue"),
    name: "home.index",
  },
  {
    path: "/authors",
    component: () => import("./pages/Author.vue"),
    name: "author.index",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
