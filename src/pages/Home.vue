<script setup lang="ts">
import Books from "../components/Books.vue";
import Search from "../components/Search.vue";
import MenuBar from "../components/MenuBar.vue";
import { useBook } from "../composables/useBook.ts";

const { isLoading, s, books } = useBook();
</script>

<template>
  <div>
    <MenuBar title="Library" />
    <Search v-model="s" :is-loading="isLoading" />
    <Books :books="books" :is-loading="isLoading" />
  </div>
</template>
