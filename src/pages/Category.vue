<template>
  <MenuBar title="Categories" />
  <Search
    v-model="s"
    placeholder="Search category..."
    :is-loading="isLoading"
  />
  <TaxonomyList
    empty-message="Empty Categories"
    :is-loading="isLoading"
    :taxonomies="items"
    single-route="category.book"
  />
</template>
<script setup lang="ts">
import MenuBar from "../components/MenuBar.vue";
import { ref } from "vue";
import { useTaxonomies } from "../composables/useTaxonomies.ts";
import Search from "../components/Search.vue";
import TaxonomyList from "../components/TaxonomyList.vue";

const s = ref("");

const { isLoading, items } = useTaxonomies({ type: "categories", s });
</script>
