import { useEffect, useState } from 'react'
import { type ListOfBooks } from '../../types'
import { getBooks } from '../../api/book'

const useFetchBooks = (column: string | null, order: string | null, searchValue: string | null): ListOfBooks => {
  const [books, setBooks] = useState<ListOfBooks>([])

  useEffect(() => {
    async function fetchBooks (): Promise<void> {
      try {
        const data = await getBooks(column, order, searchValue)
        setBooks(data)
      } catch (error) {
        console.error('Error fetching books from store: ', error)
      }
    }
    fetchBooks().catch(error => { console.error('Error fetching books: ', error) })
  }, [column, order, searchValue])

  return books
}

export default useFetchBooks
