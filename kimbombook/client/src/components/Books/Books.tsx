import Book from '../Book/Book'
import './books.css'
import { useBookStore } from '../../store/booksStore'
import { useEffect } from 'react'

const Books: React.FC = () => {
  const fetchBooksStore = useBookStore(state => state.fetchBooksStore)
  const books = useBookStore(state => state.books)

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

  return (
    <ul className='books'>
      {books.map((book) => (
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
