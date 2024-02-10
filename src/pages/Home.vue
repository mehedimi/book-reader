<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { Book } from "../types/book.ts";
import { useHttp } from "../composables/useHttp.ts";
import { useScroll } from "@vueuse/core";

const http = useHttp();
const isLoading = ref(false);
const books = ref<Book[]>([]);
let lastId: number | null = null;
const search = ref("");
const el = ref<HTMLElement | null>(null);

async function fetchBooks() {
  if (lastId === -1 || isLoading.value) return;

  isLoading.value = true;

  return http
    .get<{ data: Book[] }>("/books", {
      params: {
        lastId,
        s: search.value,
        limit: 6,
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
  <div ref="el">
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
        class="w-full border border-gray-300 rounded-3xl pl-10 focus:ring-red-300 focus:border-red-300 text-gray-500"
      />
    </div>
    <div>
      <h2 class="text-2xl">Latest Reading</h2>
    </div>
    <div class="grid grid-cols-2 my-8 gap-4">
      <div
        v-for="book in books"
        class="text-center p-6 bg-red-300/20 rounded-3xl"
        :key="book.id"
      >
        <img :src="book.thumbnail" class="rounded-3xl" :alt="book.title" />
        <h2 class="mb-1 mt-3 font-bold">{{ book.title }}</h2>
        <p class="text-sm text-gray-600">
          by {{ book.authors.map((a) => a.name).join(", ") }}
        </p>
      </div>
    </div>
    <div class="flex justify-center my-10" v-if="!books.length">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-14 h-14 block text-gray-500 animate-spin"
        v-if="isLoading"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
      <div v-else class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-14 h-14 mx-auto text-gray-400"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
        <p class="my-2 text-gray-400">Empty Items</p>
      </div>
    </div>
  </div>
</template>
