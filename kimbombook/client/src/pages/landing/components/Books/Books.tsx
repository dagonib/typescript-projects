import { useContext, useEffect } from 'react'
import { type ListOfBooks } from '../../../../types'
import { FilterContext } from '../../../../context/FilterContex'
import useFetchBooksFromStore from '../../../../hooks/useFetchBooksFromStore'
import useFilters from '../../../../hooks/useFilters'
import Book from '../Book/Book'
import './books.css'

const Books: React.FC = () => {
  const books: ListOfBooks = useFetchBooksFromStore()
  const { filterState } = useContext(FilterContext)
  const { setFilters, filterBooks } = useFilters()

  useEffect(() => {
    setFilters(filterState)
  }, [filterState, setFilters])

  const filteredBooks = filterBooks(books)

  return (
    <ul className='books'>
      {filteredBooks.map((book) => (
        <li key={book._id}>
          <Book
            _id={book._id}
            author={book.author}
            title={book.title}
            description={book.description}
            imageLink={book.imageLink}
            category={book.category}
            language={book.language}
            link={book.link}
            available={book.available}
          />
        </li>
      ))}
    </ul>
  )
}

export default Books
