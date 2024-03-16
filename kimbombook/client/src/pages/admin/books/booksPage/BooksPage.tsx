import './booksPage.css'
import { useBookStore } from '../../../../store/booksStore'
import { useEffect } from 'react'
import BooksTable from '../booksTable/BooksTable'

const BooksPage: React.FC = () => {
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
    <div className='admin-books baselayout__content '>
      <div className="admin-books__info">
        <h1>Books</h1>
      </div>
      <BooksTable data={books} />
      {/* <DataTable data={books} /> */}
    </div>
  )
}

export default BooksPage
