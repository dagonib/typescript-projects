import { useEffect, useState } from 'react'
import { type ListOfAuthors } from '../../types'
import { getAuthors } from '../../api/author'

const useFetchAuthors = (column: string | null, order: string | null, searchValue: string | null): ListOfAuthors => {
  const [authors, setAuthors] = useState<ListOfAuthors>([])

  useEffect(() => {
    async function fetchAuthors (): Promise<void> {
      try {
        const data = await getAuthors(column, order, searchValue)
        setAuthors(data)
      } catch (error) {
        console.error('Error fetching authors from store: ', error)
      }
    }
    fetchAuthors().catch(error => { console.error('Error fetching authors: ', error) })
  }, [column, order, searchValue])

  return authors
}

export default useFetchAuthors
