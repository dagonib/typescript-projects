import { useEffect } from 'react'
import { useBookStore } from '../store/booksStore'
import { type ListOfBooks } from '../types'

const useFetchBooksFromStore = (): ListOfBooks => {
  const fetchBooksStore = useBookStore(state => state.fetchBooksStore)

  useEffect(() => {
    async function fetchBooksFromStore (): Promise<void> {
      try {
        await fetchBooksStore()
      } catch (error) {
        console.error('Error fetching books from store: ', error)
      }
    }
    fetchBooksFromStore().catch(error => { console.error('Error fetching books: ', error) })
  }, [])

  return useBookStore(state => state.books)
}

export default useFetchBooksFromStore
