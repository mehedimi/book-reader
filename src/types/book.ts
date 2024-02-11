export interface Book {
  id: number;
  title: string;
  authors: { name: string }[];
  thumbnail?: string;
}

export interface Taxonomy {
  id: number;
  name: string;
  slug: string;
  count: number;
}
