import { useEffect } from 'react'
import { type ListOfAuthors } from '../types'
import { useAuthorStore } from '../store/author.store'

const useFetchAuthorsFromStore = (): ListOfAuthors => {
  const fetchAuthorsStore = useAuthorStore(state => state.fetchAuthorsStore)

  useEffect(() => {
    async function fetchAuthorsFromStore (): Promise<void> {
      try {
        await fetchAuthorsStore()
      } catch (error) {
        console.error('Error fetching authors from store: ', error)
      }
    }
    fetchAuthorsFromStore().catch(error => { console.error('Error fetching authors: ', error) })
  }, [])

  let authors = useAuthorStore(state => state.authors)
  authors = authors.sort((a, b) => a.name.localeCompare(b.name))
  return authors
}

export default useFetchAuthorsFromStore
