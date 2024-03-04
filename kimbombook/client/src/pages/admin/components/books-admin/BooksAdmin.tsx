import { useEffect } from 'react'
import { useBookStore } from '../../../../store/booksStore'
import BookAdmin from '../book-admin/BookAdmin'
import './booksadmin.css'

const BooksAdmin: React.FC = () => {
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
    <ul className='books-admin'>
      {books.map((book) => (
          <BookAdmin
            key={book._id}
            _id={book._id}
            author={book.author}
            title={book.title}
            description={book.description}
            imageLink={book.imageLink}
            categories={book.categories}
            language={book.language}
            link={book.link}
            available={book.available}
          />
      ))}
    </ul>
  )
}

export default BooksAdmin
