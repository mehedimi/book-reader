<script setup lang="ts">
import { ref, watch } from "vue";
import { Taxonomy } from "../types/book.ts";
import MenuBar from "../components/MenuBar.vue";
import { useHttp } from "../composables/useHttp.ts";
import { useRoute } from "vue-router";
import Search from "../components/Search.vue";
import { useBook } from "../composables/useBook.ts";
import Books from "../components/Books.vue";

const author = ref<Taxonomy | null>(null);

const route = useRoute();
const http = useHttp();

const { isLoading, s, books, setTermId } = useBook({
  termId: Number(route.params.id),
});

function fetchAuthor() {
  author.value = null;

  http
    .get<{ data: Taxonomy }>("/authors", {
      params: {
        id: route.params.id,
      },
    })
    .then(({ data: { data } }) => {
      author.value = data;
    });
}

fetchAuthor();

watch(route, () => {
  fetchAuthor()
  setTermId(Number(route.params.id));
});
</script>

<template>
  <div>
    <MenuBar :title="author ? `By ${author.name}` : 'Loading...'" />
    <Search v-model="s" :is-loading="isLoading" />
    <Books :books="books" :is-loading="isLoading" />
  </div>
</template>
