<template>
  <div class="grid grid-cols-2 gap-5 my-8">
    <router-link
      v-for="taxonomy in taxonomies"
      class="bg-gradient-to-bl p-5 rounded-2xl text-gray-600"
      :class="bgColors[taxonomy.id % bgColors.length]"
      :to="{ name: singleRoute, params: { id: taxonomy.id } }"
    >
      <div class="flex justify-between items-center">
        <h2 class="text-4xl font-bold">{{ taxonomy.name[0] }}</h2>
        <span>({{ taxonomy.count }})</span>
      </div>
      <p class="text-gray-500 mt-6">{{ taxonomy.name }}</p>
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { Taxonomy } from "../types/book.ts";
import { bgColors } from "../utils/colors.ts";

defineProps<{ taxonomies: Taxonomy[]; singleRoute: "author.book" }>();
</script>
