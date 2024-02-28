import { useState } from 'react'
import { type ListOfBooks } from '../types'

export default function useFilters (): {
  filterBooks: (books: ListOfBooks) => ListOfBooks
  setFilters: React.Dispatch<React.SetStateAction<{
    category: string
  }>>
} {
  const [filters, setFilters] = useState({
    category: 'Todo'
  })

  const filterBooks = (books: ListOfBooks): ListOfBooks => {
    if (filters.category === 'Todo') {
      return books
    }
    return books.filter(book => book.category === filters.category)
  }

  return { filterBooks, setFilters }
}
