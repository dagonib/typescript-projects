import { useParams } from 'react-router-dom'
import Form from '../components/form/Form'
import './editCategoryPage.css'
import useGetCathegoryById from '../../../../hooks/categories/useGetCathegoryById'

const EditCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = useGetCathegoryById(categoryId)

  return (
    <div className='update-category baselayout__content'>
      <h1>Edit Category</h1>
      { category !== null && <Form category={category} /> }
    </div>
  )
}

export default EditCategoryPage
