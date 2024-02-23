import './bookadmin.css'
import { type Book as BookType } from '../../../../types'
import { AiFillEdit } from 'react-icons/ai'
import { MdDelete } from 'react-icons/md'
import { useBookStore } from '../../../../store/booksStore'
import { Link } from 'react-router-dom'

type Props = BookType

const BookAdmin: React.FC<Props> = ({
  _id,
  author,
  title,
  imageLink,
  category,
  language,
  available
}) => {
  const deleteBookStore = useBookStore(state => state.deleteBookStore)
  const fetchBooksStore = useBookStore(state => state.fetchBooksStore)

  const handleDeleteBook = async (bookId: string): Promise<void> => {
    try {
      const confirmed = window.confirm('Are you sure?')
      if (confirmed) {
        // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-confusing-void-expression
        await deleteBookStore(bookId)
        await fetchBooksStore()
      } else {
        console.log('Delete cancelled by user')
      }
    } catch (error) {
      console.log('Error deleting book: ', error)
    }
  }

  return (
    <div className='book-admin'>
      <img src={imageLink} alt='title' />
      <div className='book-admin__content'>
        <div className='book-admin__content-top'>
          <h3>{title}</h3>
          <p>{author}</p>
        </div>
        <div className='book-admin__content-bottom'>
          <p>Categoría: {category}</p>
          <p>Idioma: {language}</p>
          <p>Disponible: {available ? 'Sí' : 'No'}</p>
        </div>
        <div className='book-admin__actions'>
             <Link to={`/admin/edit-book/${_id}`}><AiFillEdit /></Link>
            <button onClick={ () => { void handleDeleteBook(_id) } }><MdDelete /></button>
        </div>
      </div>
    </div>
  )
}

export default BookAdmin
