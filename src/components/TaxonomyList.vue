<template>
  <div class="grid grid-cols-2 gap-5 my-8">
    <router-link
      v-for="taxonomy in taxonomies"
      class="bg-gradient-to-bl p-5 rounded-2xl text-gray-600 font-tiro"
      :class="bgColors[taxonomy.id % bgColors.length]"
      :to="{ name: singleRoute, params: { id: taxonomy.id } }"
    >
      <div class="flex justify-between items-center">
        <h2
          class="text-4xl font-bold"
          :class="colors[taxonomy.id % colors.length]"
        >
          {{ taxonomy.name[0] }}
        </h2>
        <span>{{ intl.format(taxonomy.count) }}</span>
      </div>
      <p class="text-gray-500 mt-6">{{ taxonomy.name }}</p>
    </router-link>
  </div>
  <div class="flex justify-center my-10" v-if="isLoading || !taxonomies.length">
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
      <p class="my-2 text-gray-400">{{ emptyMessage }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Taxonomy } from "../types/book.ts";
import { bgColors, colors } from "../utils/colors.ts";
import Loader from "./Loader.vue";

defineProps<{
  taxonomies: Taxonomy[];
  singleRoute: "author.book" | "category.book";
  isLoading: boolean;
  emptyMessage: string;
}>();

const intl = new Intl.NumberFormat("BN");
</script>
