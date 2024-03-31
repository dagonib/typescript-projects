import { useParams } from 'react-router-dom'
import Form from '../components/form/Form'
import './editbookpage.css'
import useGetBookById from '../../../../hooks/books/useGetBookById'

const EditBookPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>()
  const book = useGetBookById(bookId)

  return (
    <div className='createbook baselayout__content'>
      <h1>Edit Book</h1>
      { book !== null && <Form book={book} /> }
    </div>
  )
}

export default EditBookPage
