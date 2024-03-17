import { type BOOK_FILTERS } from './consts'
import { type ELanguage } from './enums'

export interface Book {
  _id: string
  author: string
  title: string
  description: string
  imageLink: string
  categories: string[]
  language: ELanguage
  link: string
  available: boolean
}

export type BookId = Pick<Book, 'id'>
export type Title = Pick<Book, 'titlte'>

export type ListOfBooks = Book[]

export type FilterValue = typeof BOOK_FILTERS[keyof typeof BOOK_FILTERS]

interface Category {
  _id: string
  name: string
  description: string
}

export type ListOfCategories = Category[]
export type CategoryId = Pick<Category, '_id'>

interface Author {
  _id: string
  name: string
  imageLink: string
}

export type ListOfAuthors = Author[]
