import { create } from 'zustand'

import { type ListOfBooks } from '../types'
import { getBooks } from '../api/getBooks'
import { deleteBook } from '../api/deleteBook'

interface State {
  books: ListOfBooks
  fetchBooksStore: () => Promise<void>
  deleteBookStore: (bookId: string) => void
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
