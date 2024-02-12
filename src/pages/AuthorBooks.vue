<script setup lang="ts">
import { watch } from "vue";
import MenuBar from "../components/MenuBar.vue";
import { useRoute } from "vue-router";
import Search from "../components/Search.vue";
import { useBook } from "../composables/useBook.ts";
import Books from "../components/Books.vue";
import { useTaxonomy } from "../composables/useTaxonomies.ts";

const route = useRoute();
const termId = Number(route.params.id);

const { isLoading, s, books, setTermId } = useBook({
  termId,
});

const { taxonomy: author, setTermId: setSingleTermId } = useTaxonomy({
  id: termId,
});

watch(route, () => {
  const termId = Number(route.params.id);
  setTermId(termId);
  setSingleTermId(termId);
});
</script>

<template>
  <div>
    <MenuBar :title="author ? `By ${author.name}` : 'Loading...'" />
    <Search v-model="s" :is-loading="isLoading" />
    <Books :books="books" :is-loading="isLoading" />
  </div>
</template>
