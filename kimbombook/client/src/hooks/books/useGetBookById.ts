import { useEffect, useState } from 'react'
import { type Book } from '../../types'
import { getBookById } from '../../api/book'

const useGetBookById = (bookId: string | undefined): Book | undefined => {
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    async function fetchBook (): Promise<void> {
      try {
        if (bookId !== undefined && bookId.length > 0) {
          const data = await getBookById(bookId)
          setBook(data)
        }
      } catch (error) {
        console.error('Error fetching book from store: ', error)
      }
    }
    fetchBook().catch(error => { console.error('Error fetching book: ', error) })
  }, [bookId])

  return book
}

export default useGetBookById
