import { create } from 'zustand'

import { type Book, type ListOfBooks } from '../types'
import { getBooks } from '../api/getBooks'
import { deleteBook } from '../api/deleteBook'
import { createBook } from '../api/createBook'
import { type ECategory, type ELanguage } from '../enums'

interface State {
  books: ListOfBooks
  fetchBooksStore: () => Promise<void>
  deleteBookStore: (bookId: string) => void
  createBookStore: (
    title: string,
    author: string,
    description: string,
    imageLink: string,
    category: ECategory,
    language: ELanguage,
    link: string,
    available: boolean
  ) => Promise<Book | undefined>
}

export const useBookStore = create<State>((set) => {
  return {
    books: [],

    fetchBooksStore: async () => {
      try {
        const data = await getBooks()
        set({ books: data })
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    },

    createBookStore: async (
      title: string,
      author: string,
      description: string,
      imageLink: string,
      category: ECategory,
      language: ELanguage,
      link: string,
      available: boolean
    ): Promise<Book | undefined> => {
      try {
        const createdBook = await createBook(
          title,
          author,
          description,
          imageLink,
          category,
          language,
          link,
          available)
        return createdBook
      } catch (error) {
        console.log('Error creating book: ', error)
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    deleteBookStore: async (bookId: string) => {
      try {
        await deleteBook(bookId)
      } catch (error) {
        console.log('Error deleting book: ', error)
      }
    }
  }
})
