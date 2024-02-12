import { Taxonomy, TaxonomyQuery } from "../types/book.ts";
import { ref, watch } from "vue";
import { useHttp } from "./useHttp.ts";
import { debounce } from "lodash";

export function useTaxonomy(query: TaxonomyQuery) {
  const isLoading = ref(false);
  const items = ref<Taxonomy[]>([]);

  const http = useHttp();

  function fetchTaxonomy() {
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

  fetchTaxonomy();

  watch(
    query.s,
    debounce(() => {
      fetchTaxonomy();
    }, 500),
  );

  return { isLoading, items };
}
