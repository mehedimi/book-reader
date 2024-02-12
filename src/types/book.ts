import { Ref } from "vue";

export interface Book {
  id: number;
  title: string;
  authors: { id: number; name: string }[];
  thumbnail?: string;
}

export interface Taxonomy {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface TaxonomyQuery {
  s: Ref<string>;
  type: "authors" | "categories";
}

export interface BookQuery {
  termId?: number;
}
