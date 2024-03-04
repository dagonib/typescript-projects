import { useEffect } from 'react'
import { useCategoryStore } from '../store/category.store'
import { type ListOfCategories } from '../types'

const useFetchCategoriesFromStore = (): ListOfCategories => {
  const fetchCategoriesStore = useCategoryStore(state => state.fetchCategoriesStore)

  useEffect(() => {
    async function fetchCategoriesFromStore (): Promise<void> {
      try {
        await fetchCategoriesStore()
      } catch (error) {
        console.error('Error fetching categories from store: ', error)
      }
    }
    fetchCategoriesFromStore().catch(error => { console.error('Error fetching categories: ', error) })
  }, [])

  return useCategoryStore(state => state.categories)
}

export default useFetchCategoriesFromStore
