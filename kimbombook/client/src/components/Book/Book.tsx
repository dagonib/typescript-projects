/* eslint-disable @typescript-eslint/no-floating-promises */
import './book.css'
import { type Book as BookType } from '../../types'
import { useBookStore } from '../../store/booksStore'

type Props = BookType

const Book: React.FC<Props> = ({ _id, author, title, imageLink, link }) => {
  const deleteBookStore = useBookStore(state => state.deleteBookStore)
  const fetchBooksStore = useBookStore(state => state.fetchBooksStore)

  const handleDeleteBook = async (bookId: string): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-confusing-void-expression
      await deleteBookStore(bookId)
      await fetchBooksStore()
    } catch (error) {
      console.log('Error deleting book: ', error)
    }
  }

  return (
    <div className='book' key={_id}>
        <img src={imageLink} alt={title} />
        <div className='book__content'>
          <h3>{title}</h3>
          <p>{author}</p>
          <a href={link} target='_blank' rel='noreferrer'>Comprar</a>
        </div>
        <button onClick={ () => { handleDeleteBook(_id) } }>Delete</button>
    </div>
  )
}

export default Book
