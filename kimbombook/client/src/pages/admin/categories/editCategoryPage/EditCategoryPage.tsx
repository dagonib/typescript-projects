import { useParams } from 'react-router-dom'
import { useCategoryStore } from '../../../../store/category.store'
import Form from '../components/form/Form'
import './editCategoryPage.css'
import { useEffect, useState } from 'react'
import { type Category } from '../../../../types'

const EditCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const [category, setCategory] = useState<Category>()

  const getCategoryByIdStore = useCategoryStore(state => state.getCategoryByIdStore)

  useEffect(() => {
    async function fetchCategoryFromStore (): Promise<void> {
      try {
        if (categoryId != null) {
          const category = await getCategoryByIdStore(categoryId)
          setCategory(category)
        }
      } catch (error) {
        console.error('Error getting category information: ', error)
      }
    }
    fetchCategoryFromStore().catch(error => { console.error('Error fetching categories: ', error) })
  }, [])

  return (
    <div className='update-category baselayout__content'>
      <h1>Edit Category</h1>
      { category !== null && <Form category={category} /> }
    </div>
  )
}

export default EditCategoryPage
