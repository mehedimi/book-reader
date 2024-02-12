<template>
  <div>
    <MenuBar title="Authors" />
    <Search
      v-model="s"
      placeholder="Search authors..."
      :is-loading="isLoading"
    />
    <TaxonomyList :taxonomies="items" single-route="author.book" />
  </div>
</template>

<script lang="ts" setup>
import Search from "../components/Search.vue";
import MenuBar from "../components/MenuBar.vue";
import { ref } from "vue";
import TaxonomyList from "../components/TaxonomyList.vue";
import { useTaxonomy } from "../composables/useTaxonomy.ts";

const s = ref("");

const { isLoading, items } = useTaxonomy({ type: "authors", s });
</script>
