import { create } from 'zustand'

import { type Book, type ListOfBooks } from '../types'
import { getBooks, createBook, deleteBook, getBookById, updateBook } from '../api/book'
import { type ELanguage } from '../enums'

interface State {
  books: ListOfBooks
  fetchBooksStore: (column: string | null, order: string | null, searchValue: string | null) => Promise<void>
  deleteBookStore: (bookId: string) => void
  createBookStore: (
    title: string,
    author: string,
    description: string,
    imageLink: string,
    categories: string[],
    language: ELanguage,
    link: string,
    available: boolean
  ) => Promise<Book | undefined>
  getBookByIdStore: (bookId: string) => Promise<Book | undefined>
  updateBookStore: (
    bookId: string,
    title: string,
    author: string,
    description: string,
    imageLink: string,
    categories: string[],
    language: ELanguage,
    link: string,
    available: boolean
  ) => Promise<Book | undefined>
}

export const useBookStore = create<State>((set) => {
  return {
    books: [],

    fetchBooksStore: async (column: string | null, order: string | null, searchValue: string | null) => {
      try {
        const data = await getBooks(column, order, searchValue)
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
      categories: string[],
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
          categories,
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
    },

    getBookByIdStore: async (bookId: string): Promise<Book | undefined> => {
      try {
        const book = await getBookById(bookId)
        return book
      } catch (error) {
        console.log('Error getting the book: ', error)
      }
    },

    updateBookStore: async (
      bookId: string,
      title: string,
      author: string,
      description: string,
      imageLink: string,
      categories: string[],
      language: string,
      link: string,
      available: boolean
    ): Promise<Book | undefined> => {
      try {
        const updatedBook = await updateBook(
          bookId,
          title,
          author,
          description,
          imageLink,
          categories,
          language as ELanguage,
          link,
          available
        )
        return updatedBook
      } catch (error) {
        console.log('Error updating book: ', error)
      }
    }
  }
})
