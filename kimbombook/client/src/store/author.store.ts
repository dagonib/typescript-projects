import { create } from 'zustand'

import { type Author, type ListOfAuthors } from '../types'

import { getAuthors, createAuthor, getAuthorById } from '../api/author'

interface State {
  authors: ListOfAuthors
  fetchAuthorsStore: (column: string | null, order: string | null, searchValue: string | null) => Promise<void>
  createAuthorStore: (name: string, imageLink: string) => Promise<Author | undefined>
  getAuthorByIdStore: (authorId: string) => Promise<Author | undefined>
}

export const useAuthorStore = create<State>((set) => {
  return {
    authors: [],

    fetchAuthorsStore: async (column: string | null, order: string | null, searchValue: string | null) => {
      try {
        const data = await getAuthors(column, order, searchValue)
        set({ authors: data })
      } catch (error) {
        console.error('Error fetching authors:', error)
      }
    },

    createAuthorStore: async (name: string, imageLink: string): Promise<Author | undefined> => {
      try {
        const createdAuthor = await createAuthor(name, imageLink)
        return createdAuthor
      } catch (error) {
        console.error('Error creating author:', error)
      }
    },

    getAuthorByIdStore: async (authorId: string): Promise<Author | undefined> => {
      try {
        const author = await getAuthorById(authorId)
        return author
      } catch (error) {
        console.error('Error getting author by id:', error)
      }
    }
  }
})
