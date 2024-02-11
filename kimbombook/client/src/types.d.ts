import { type BOOK_FILTERS } from './consts'

export interface Book {
  _id: string
  author: string
  title: string
  description: string
  imageLink: string
  category: string[]
  language: string
  link: string
  available: boolean
}

export type BookId = Pick<Book, 'id'>
export type Title = Pick<Book, 'titlte'>

export type ListOfBooks = Book[]

export type FilterValue = typeof BOOK_FILTERS[keyof typeof BOOK_FILTERS]
