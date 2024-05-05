import { useEffect, useState } from 'react'
import { type Category } from '../../types'
import { getCategoryById } from '../../api/category'

const useGetCathegoryById = (cathegoryId: string | undefined): Category | undefined => {
  const [category, setCategory] = useState<Category>()

  useEffect(() => {
    async function fetchCategory (): Promise<void> {
      try {
        if (cathegoryId === 'all') {
          return
        }
        if (cathegoryId !== undefined && cathegoryId.length > 0) {
          const data = await getCategoryById(cathegoryId)
          setCategory(data)
        }
      } catch (error) {
        console.error('Error fetching category from store: ', error)
      }
    }
    fetchCategory().catch(error => { console.error('Error fetching category: ', error) })
  }, [cathegoryId])

  return category
}

export default useGetCathegoryById
