import { useEffect, useState } from 'react'
import { type Author } from '../../types'
import { getAuthorById } from '../../api/author'

const useGetAuthorById = (authorId: string | undefined): Author | undefined => {
  const [author, setAuthor] = useState<Author>()

  useEffect(() => {
    async function fetchAuthor (): Promise<void> {
      try {
        if (authorId !== undefined && authorId.length > 0) {
          const data = await getAuthorById(authorId)
          setAuthor(data)
        }
      } catch (error) {
        console.error('Error fetching author from store: ', error)
      }
    }
    fetchAuthor().catch(error => { console.error('Error fetching author: ', error) })
  }, [authorId])

  return author
}

export default useGetAuthorById
