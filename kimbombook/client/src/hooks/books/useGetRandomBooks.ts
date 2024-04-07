import { useEffect, useState } from 'react'
import { type ListOfBooks } from '../../types'
import useFetchBooks from './useFetchBooks'
import useGetAuthorsNames from '../author/useGetAuthorsNames'

type AuthorNames = Record<string, string>

const useGetRandomBooks = (): { randomBooks: ListOfBooks, authorNames: AuthorNames } => {
  const [randomBooks, setRandomBooks] = useState<ListOfBooks>([])
  const books = useFetchBooks('title', 'desc', null)
  const authorNames = useGetAuthorsNames(randomBooks)

  useEffect(() => {
    if (books.length > 0) {
      const selectedBooks: ListOfBooks = []
      while (selectedBooks.length <= 11) {
        const randomIndex = Math.floor(Math.random() * books.length)
        if (!selectedBooks.includes(books[randomIndex])) {
          selectedBooks.push(books[randomIndex])
        }
      }
      setRandomBooks(selectedBooks)
    }
  }, [books])
  return { randomBooks, authorNames }
}

export default useGetRandomBooks
