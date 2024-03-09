import DataTable from '../components/data-table/DataTable'

import './booksPage.css'
import { useBookStore } from '../../../store/booksStore'
import { useEffect } from 'react'

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
    <div className='admin-books'>
      <div className="admin-books__info">
        <h1>Books</h1>
        <button className="admin-books__info--button">Add Book</button>
      </div>
      <DataTable data={books} />
    </div>
  )
}

export default BooksPage
