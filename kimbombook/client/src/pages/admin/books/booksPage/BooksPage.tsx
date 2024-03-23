import './booksPage.css'
import BooksTable from '../components/booksTable/BooksTable'

const BooksPage: React.FC = () => {
  return (
    <div className='admin-books baselayout__content '>
      <div className="admin-books__info">
        <h1>Books</h1>
      </div>
      <BooksTable />
    </div>
  )
}

export default BooksPage
