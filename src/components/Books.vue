<template>
  <div class="flex flex-col my-8 gap-5">
    <div
      v-for="book in books"
      class="p-5 rounded-3xl flex gap-x-5 bg-gradient-to-br font-tiro"
      :key="book.id"
      :class="bgColors[book.id % bgColors.length]"
    >
      <div class="w-1/4">
        <img :src="book.thumbnail" class="rounded-2xl" :alt="book.title" />
      </div>

      <div class="flex-1">
        <h2 class="mt-3 font-bold text-gray-600">{{ book.title }}</h2>
        <p class="my-1.5 text-sm text-gray-500">
          <span class="font-fira">By </span>
          <template v-for="(author, index) in book.authors">
            <router-link
              :to="{ name: 'author.book', params: { id: author.id } }"
              :class="colors[book.id % colors.length]"
              >{{ author.name }}</router-link
            ><span v-if="book.authors.length - 1 !== index">, </span>
          </template>
        </p>
      </div>
    </div>
  </div>
  <div class="flex justify-center my-10" v-if="isLoading || !books.length">
    <Loader v-if="isLoading" />
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
import { bgColors, colors } from "../utils/colors.ts";
import Loader from "./Loader.vue";

defineProps<{ books: Book[]; isLoading: boolean }>();
</script>
