<template>
  <div class="flex flex-col my-8 gap-5">
    <div
      v-for="book in books"
      class="p-5 rounded-3xl flex gap-x-5 bg-gradient-to-br"
      :key="book.id"
      :class="bgColors[book.id % bgColors.length]"
    >
      <div class="w-1/4">
        <img :src="book.thumbnail" class="rounded-2xl" :alt="book.title" />
      </div>

      <div class="flex-1">
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
          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
        />
      </svg>
      <p class="my-2 text-gray-400">Empty Books</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Book } from "../types/book.ts";
import { bgColors } from "../utils/colors.ts";

defineProps<{ books: Book[]; isLoading: boolean }>();
</script>
