<template>
  <div>
    <MenuBar title="Authors" />
    <Search
      v-model="s"
      placeholder="Search authors..."
      :is-loading="isLoading"
    />
    <TaxonomyList :taxonomies="authors" />
  </div>
</template>

<script lang="ts" setup>
import Search from "../components/Search.vue";
import MenuBar from "../components/MenuBar.vue";
import { ref } from "vue";
import { Taxonomy } from "../types/book.ts";
import { useHttp } from "../composables/useHttp.ts";
import TaxonomyList from "../components/TaxonomyList.vue";

const isLoading = ref(false);
const s = ref("");

const http = useHttp();
const authors = ref<Taxonomy[]>([]);
function fetchAuthors() {
  isLoading.value = true;
  http
    .get<{ data: Taxonomy[] }>("/authors")
    .then(({ data: { data } }) => {
      authors.value = data;
    })
    .finally(() => {
      isLoading.value = false;
    });
}

fetchAuthors();
</script>
