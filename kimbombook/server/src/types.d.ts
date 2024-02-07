import { Category, Language } from "./enums";

export interface Book {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  category: Category;
  language: Language;
  link: string;
  available: boolean;
}

// export type NonInfoBook = Pick<Book, 'id' | 'title' | 'imageLink' | 'link'>
export type NonInfoBook = Omit<Book, 'description' | 'category' | 'language' | 'available'>
export type newBookEntry = Omit<Book, 'id'>