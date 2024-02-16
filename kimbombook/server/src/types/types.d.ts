import { ECategory, ELanguage } from "../enums";

export interface IBook {
  id: string;
  author: string;
  title: string;
  description: string;
  imageLink: string;
  category: ECategory;
  language: ELanguage;
  link: string;
  available: boolean;
}

// export type NonInfoBook = Pick<Book, 'id' | 'title' | 'imageLink' | 'link'>
export type TNonInfoBook = Omit<Book, 'description' | 'category' | 'language' | 'available'>
export type TnewBookEntry = Omit<Book, 'id'>