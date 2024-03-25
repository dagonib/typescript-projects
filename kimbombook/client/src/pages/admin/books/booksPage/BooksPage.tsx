import './booksPage.css'
import BooksTable from '../components/booksTable/BooksTable'

const BooksPage: React.FC = () => {
  return (
    <div className='admin-books baselayout__content '>
      <h1>Books</h1>
      <BooksTable />
    </div>
  )
}

export default BooksPage
