import { create } from 'zustand'

import { type Category, type ListOfCategories } from '../types'

import {
  getCategories,
  createCategory,
  getCategoryById,
  deleteCategory
} from '../api/category'

interface State {
  categories: ListOfCategories
  fetchCategoriesStore: (column: string | null, order: string | null, searchValue: string | null) => Promise<void>
  deleteCategoryStore: (categoryId: string) => void
  createCategoryStore: (name: string, description: string) => Promise<Category | undefined>
  getCategoryByIdStore: (categoryId: string) => Promise<Category | undefined>
  // updateCategoryStore: (categoryId: string, name: string) => Promise<Category | undefined>
}

export const useCategoryStore = create<State>((set) => {
  return {
    categories: [],

    fetchCategoriesStore: async (column: string | null, order: string | null, searchValue: string | null) => {
      try {
        const data = await getCategories(column, order, searchValue)
        set({ categories: data })
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    createCategoryStore: async (name: string, description: string): Promise<Category | undefined> => {
      try {
        const createdCategory = await createCategory(name, description)
        return createdCategory
      } catch (error) {
        console.error('Error creating category:', error)
      }
    },

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    deleteCategoryStore: async (categoryId: string) => {
      try {
        await deleteCategory(categoryId)
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    },

    getCategoryByIdStore: async (categoryId: string): Promise<Category | undefined> => {
      try {
        const category = await getCategoryById(categoryId)
        return category
      } catch (error) {
        console.error('Error getting category by id:', error)
      }
    }

    // updateCategoryStore: async (categoryId: string, name: string): Promise<Category | undefined> => {
    //   try {
    //     const updatedCategory = await updateCategory(categoryId, name)
    //     return updatedCategory
    //   } catch (error) {
    //     console.error('Error updating category:', error)
    //   }
    // }
  }
})
