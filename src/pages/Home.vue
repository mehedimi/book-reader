<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { format } from "date-fns";
import { Book } from "../types/book.ts";
import { useScroll } from "@vueuse/core";
import Books from "../components/Books.vue";
import { useHttp } from "../composables/useHttp.ts";

const http = useHttp();
const isLoading = ref(false);
const books = ref<Book[]>([]);
let lastId: number | null = null;
const search = ref("");

async function fetchBooks() {
  if (lastId === -1 || isLoading.value) return;

  isLoading.value = true;

  return http
    .get<{ data: Book[] }>("/books", {
      params: {
        lastId,
        s: search.value,
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
  search,
  debounce(() => {
    lastId = null;
    books.value = [];
    fetchBooks();
  }, 500),
);
</script>

<template>
  <div>
    <h3 class="uppercase mt-3 text-gray-400 text-xs">
      {{ format(new Date(), "EEEE dd MMMM") }}
    </h3>
    <h2 class="text-2xl text-gray-700 my-2 font-semibold">Library</h2>
    <div class="my-4 flex items-center relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 absolute left-3 text-gray-400 animate-spin"
        v-if="isLoading && search"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 absolute left-3 text-gray-400"
        v-else
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      <input
        type="search"
        v-model="search"
        class="w-full placeholder-gray-400 border border-gray-300 rounded-3xl py-3 pl-12 focus:ring-emerald-300 focus:border-emerald-300 text-gray-500"
        placeholder="Search books..."
      />
    </div>

    <Books :books="books" :is-loading="isLoading" />
  </div>
</template>
