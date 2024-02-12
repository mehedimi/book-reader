import { ref, watch } from "vue";
import { Book, BookQuery } from "../types/book.ts";
import { useScroll } from "@vueuse/core";
import { debounce } from "lodash";
import { useHttp } from "./useHttp.ts";

export function useBook(query?: BookQuery) {
  const isLoading = ref(false);
  const books = ref<Book[]>([]);
  const termId = ref<number | undefined>(query?.termId);

  let lastId: number | null = null;
  const s = ref("");

  const http = useHttp();

  function setTermId(id: number) {
    termId.value = id;
  }

  async function fetchBooks() {
    if (lastId === -1 || isLoading.value) return;

    isLoading.value = true;

    return http
      .get<{ data: Book[] }>("/books", {
        params: {
          lastId,
          s: s.value,
          limit: 16,
          termId: termId.value,
        },
      })
      .then(({ data: { data } }) => {
        books.value = books.value.concat(data);

        if (!data.length) {
          lastId = -1;
        } else {
          lastId = data[data.length - 1].id;
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  const { arrivedState } = useScroll(document, {
    throttle: 100,
    behavior: "smooth",
    offset: { bottom: 100 },
  });

  fetchBooks();

  watch(arrivedState, (state) => {
    if (state.bottom) {
      fetchBooks();
    }
  });

  watch(
    [s, termId],
    debounce(() => {
      lastId = null;
      books.value = [];
      fetchBooks();
    }, 500),
  );

  return { lastId, isLoading, books, s, setTermId };
}
