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
  {
    path: "/authors/:id",
    component: () => import("./pages/AuthorBooks.vue"),
    name: "author.book",
  },
  {
    path: "/categories",
    component: () => import("./pages/Category.vue"),
    name: "category.index",
  },
  {
    path: "/categories/:id",
    component: () => import("./pages/CategoryBooks.vue"),
    name: "category.book",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
