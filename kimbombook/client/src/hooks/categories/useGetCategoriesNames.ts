import { useEffect, useState } from 'react'
import { type Book, type ListOfBooks } from '../../types'
import { getCategoryById } from '../../api/category'

const useGetCategoriesNames = (books: ListOfBooks): Record<string, string> => {
  const [categories, setCategories] = useState<Record<string, string>>({})

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchCategories = async () => {
      const categoryNames: Record<string, string> = {}
      await Promise.all(
        books.map(async (book: Book) => {
          try {
            const categoriesListIds = book.categories
            if (Array.isArray(book.categories)) {
              await Promise.all(
                categoriesListIds.map(async (categorieItemId: string) => {
                  const category = await getCategoryById(categorieItemId)
                  categoryNames[categorieItemId] = category.name
                })
              )
            }
          } catch (error) {
            console.error('Error getting category by id:', error)
          }
        })
      )
      setCategories(categoryNames)
    }
    void fetchCategories()
  }, [books])

  return categories
}

export default useGetCategoriesNames
