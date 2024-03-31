import { useEffect, useState } from 'react'
import { type ListOfCategories } from '../../types'
import { getCategories } from '../../api/category'

const useFetchCategories = (column: string | null, order: string | null, searchValue: string | null): ListOfCategories => {
  const [categories, setCategories] = useState<ListOfCategories>([])

  useEffect(() => {
    async function fetchCategories (): Promise<void> {
      try {
        const data = await getCategories(column, order, searchValue)
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories from store: ', error)
      }
    }
    fetchCategories().catch(error => { console.error('Error fetching categories: ', error) })
  }, [column, order, searchValue])

  return categories
}

export default useFetchCategories
