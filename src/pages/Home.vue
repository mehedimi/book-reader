<script setup lang="ts">
import { ref, watch } from "vue";
import { debounce } from "lodash";
import { Book } from "../types/book.ts";
import { useHttp } from "../composables/useHttp.ts";
import { useScroll } from "@vueuse/core";
import { format } from "date-fns";

const http = useHttp();
const isLoading = ref(false);
const books = ref<Book[]>([]);
let lastId: number | null = null;
const search = ref("");

const bgColors = [
  "from-red-300/20 via-red-300/50 to-red-300/30",
  "from-lime-300/20 via-lime-300/50 to-lime-300/30",
  "from-green-300/20 via-green-300/50 to-green-300/30",
  "from-emerald-300/20 via-emerald-300/50 to-emerald-300/30",
  "from-teal-300/20 via-teal-300/50 to-teal-300/30",
  "from-cyan-300/20 via-cyan-300/50 to-cyan-300/30",
  "from-blue-300/20 via-blue-300/50 to-blue-300/30",
  "from-indigo-300/20 via-indigo-300/50 to-indigo-300/30",
  "from-purple-300/20 via-purple-300/50 to-purple-300/30",
  "from-pink-300/20 via-pink-300/50 to-pink-300/30",
  "from-rose-300/20 via-rose-300/50 to-rose-300/30",
];

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

    <div class="flex flex-col my-8 gap-5">
      <div
        v-for="book in books"
        class="p-5 rounded-3xl flex gap-x-5 bg-gradient-to-r"
        :key="book.id"
        :class="bgColors[book.id % bgColors.length]"
      >
        <img
          :src="book.thumbnail"
          class="rounded-2xl w-1/4"
          :alt="book.title"
        />
        <div>
          <h2 class="mt-3 font-bold text-gray-600">{{ book.title }}</h2>
          <p class="my-1.5 text-sm text-gray-500">
            By {{ book.authors.map((a) => a.name).join(", ") }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-center my-10" v-if="isLoading || !books.length">
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
