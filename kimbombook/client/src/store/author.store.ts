import { create } from 'zustand'

import { type Author, type ListOfAuthors } from '../types'

import { getAuthors, createAuthor } from '../api/author'

interface State {
  authors: ListOfAuthors
  fetchAuthorsStore: () => Promise<void>
  createAuthorStore: (name: string, imageLink: string) => Promise<Author | undefined>
}

export const useAuthorStore = create<State>((set) => {
  return {
    authors: [],

    fetchAuthorsStore: async () => {
      try {
        const data = await getAuthors()
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
    }
  }
})
