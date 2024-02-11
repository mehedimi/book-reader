<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { Book } from "../types/book.ts";
import { useScroll } from "@vueuse/core";
import Books from "../components/Books.vue";
import { useHttp } from "../composables/useHttp.ts";
import Search from "../components/Search.vue";
import MenuBar from "../components/MenuBar.vue";

const http = useHttp();
const isLoading = ref(false);
const books = ref<Book[]>([]);
let lastId: number | null = null;
const s = ref("");

async function fetchBooks() {
  if (lastId === -1 || isLoading.value) return;

  isLoading.value = true;

  return http
    .get<{ data: Book[] }>("/books", {
      params: {
        lastId,
        s: s.value,
        limit: 16,
      },
    })
    .then(({ data: { data } }) => {
      books.value = books.value.concat(data);
      isLoading.value = false;

      if (!data.length) {
        lastId = -1;
      } else {
        lastId = data[data.length - 1].id;
      }
    });
}

const { arrivedState } = useScroll(document, {
  throttle: 100,
  behavior: "smooth",
  offset: { bottom: 100 },
});

fetchBooks();

watch(arrivedState, (state) => {
  if (state.bottom) {
    fetchBooks();
  }
});

watch(
  s,
  debounce(() => {
    lastId = null;
    books.value = [];
    fetchBooks();
  }, 500),
);
</script>

<template>
  <div>
    <MenuBar title="Library" />
    <Search v-model="s" :is-loading="isLoading" />
    <Books :books="books" :is-loading="isLoading" />
  </div>
</template>
