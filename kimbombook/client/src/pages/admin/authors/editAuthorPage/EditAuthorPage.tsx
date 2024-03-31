import { useParams } from 'react-router-dom'
import Form from '../components/form/Form'
import useGetAuthorById from '../../../../hooks/author/useGetAuthorById'

const EditAuthorPage = (): JSX.Element => {
  const { authorId } = useParams<{ authorId: string }>()

  const author = useGetAuthorById(authorId)

  return (
    <div className='baselayout__content'>
      <h1>Edit Author</h1>
      { author !== null && <Form author={author} /> }
    </div>
  )
}

export default EditAuthorPage
