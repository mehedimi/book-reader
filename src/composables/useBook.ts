import { ref, watch } from "vue";
import { Book, BookQuery } from "../types/book.ts";
import { useScroll } from "@vueuse/core";
import { debounce } from "lodash";
import { useHttp } from "./useHttp.ts";

export function useBook(query?: BookQuery) {
  const isLoading = ref(false);
  const books = ref<Book[]>([]);
  const termId = ref<number | undefined>(query?.termId);

  let page = 1;
  const s = ref("");

  const http = useHttp();

  function setTermId(id: number) {
    termId.value = id;
  }

  async function fetchBooks() {
    if (page === -1 || isLoading.value) return;

    isLoading.value = true;

    return http
      .get<{ data: Book[] }>("/books", {
        params: {
          page,
          s: s.value,
          termId: termId.value,
        },
      })
      .then(({ data: { data } }) => {
        books.value = books.value.concat(data);

        if (!data.length) {
          page = -1;
        } else {
          page++;
        }
      })
      .finally(() => {
        isLoading.value = false;
      });
  }

  fetchBooks();

  if (query?.infinityLoad === true) {
    const { arrivedState } = useScroll(document, {
      throttle: 100,
      behavior: "smooth",
      offset: { bottom: 100 },
    });

    watch(arrivedState, (state) => {
      if (state.bottom) {
        fetchBooks();
      }
    });
  }

  watch(
    s,
    debounce(() => {
      page = 1;
      books.value = [];
      fetchBooks();
    }, 500),
  );

  watch(termId, () => {
    page = 1;
    books.value = [];
    fetchBooks();
  });

  return { page, isLoading, books, s, setTermId };
}
