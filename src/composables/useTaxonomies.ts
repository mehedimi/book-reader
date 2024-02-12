import { debounce } from "lodash";
import { ref, watch } from "vue";
import { useHttp } from "./useHttp.ts";
import { Taxonomy, TaxonomiesQuery, TaxonomyQuery } from "../types/book.ts";

export function useTaxonomies(query: TaxonomiesQuery) {
  const isLoading = ref(false);
  const items = ref<Taxonomy[]>([]);

  const http = useHttp();

  function fetchTaxonomies() {
    isLoading.value = true;
    http
      .get<{ data: Taxonomy[] }>(`/${query.type}`, {
        params: { s: query.s.value },
      })
      .then(({ data: { data } }) => {
        items.value = data;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  fetchTaxonomies();

  watch(
    query.s,
    debounce(() => {
      fetchTaxonomies();
    }, 500),
  );

  return { isLoading, items };
}

export function useTaxonomy(query: TaxonomyQuery) {
  const taxonomy = ref<Omit<Taxonomy, "count"> | null>(null);
  const termId = ref(query.id);
  const isLoading = ref(false);

  const http = useHttp();

  function fetchTerm() {
    isLoading.value = true;
    http
      .get<{ data: Omit<Taxonomy, "count"> }>(`/taxonomies/${termId.value}`)
      .then(({ data: { data } }) => {
        taxonomy.value = data;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  fetchTerm();

  function setTermId(id: number) {
    termId.value = id;
  }

  watch(termId, () => fetchTerm());

  return { taxonomy, setTermId, isLoading };
}
