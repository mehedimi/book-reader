<template>
  <div>
    <MenuBar title="Authors" />
    <Search
      v-model="s"
      placeholder="Search authors..."
      :is-loading="isLoading"
    />
    <TaxonomyList
      empty-message="Empty Authors"
      :is-loading="isLoading"
      :taxonomies="items"
      single-route="author.book"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Search from "../components/Search.vue";
import MenuBar from "../components/MenuBar.vue";
import TaxonomyList from "../components/TaxonomyList.vue";
import { useTaxonomies } from "../composables/useTaxonomies.ts";

const s = ref("");

const { isLoading, items } = useTaxonomies({ type: "authors", s });
</script>
