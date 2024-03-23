import { useEffect, useState } from 'react'
import { useBookStore } from '../../../../store/booksStore'
import { useParams } from 'react-router-dom'
import Form from '../components/form/Form'
import './editbookpage.css'
import { type Book } from '../../../../types'

const EditBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>()
  const [book, setBook] = useState<Book>()

  const getBookByIdStore = useBookStore(state => state.getBookByIdStore)

  useEffect(() => {
    async function fetchBookFromStore (): Promise<void> {
      try {
        if (bookId != null) {
          const book = await getBookByIdStore(bookId)
          setBook(book)
        }
      } catch (error) {
        console.error('Erron getting book information: ', error)
      }
    }
    fetchBookFromStore().catch(error => { console.error('Error fetching books: ', error) })
  }, [])

  return (
    <div className='createbook'>
      <h3>Editar Libro</h3>
      { book !== null && <Form book={book} /> }
    </div>
  )
}

export default EditBookPage
