import { useEffect, useState } from 'react'
import { type ListOfBooks } from '../../types'
import { getBooks, getBooksByCategory } from '../../api/book'

const useBookFilterByCategory = (initialCategory: string): { filteredBooks: ListOfBooks, idCategory: string, setIdCategory: React.Dispatch<React.SetStateAction<string>> } => {
  const [filteredBooks, setFilteredBooks] = useState<ListOfBooks>([])
  const [idCategory, setIdCategory] = useState<string>(initialCategory)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        let data: ListOfBooks = []
        if (idCategory === 'all') {
          data = await getBooks()
        } else {
          data = (await getBooksByCategory(idCategory))
        }
        setFilteredBooks(data)
      } catch (error) {
        console.error('Error fetching books from store: ', error)
      }
    }
    fetchData().catch(error => { console.error('Error fetching books: ', error) })
  }, [idCategory])

  return {
    filteredBooks,
    idCategory,
    setIdCategory
  }
}

export default useBookFilterByCategory
