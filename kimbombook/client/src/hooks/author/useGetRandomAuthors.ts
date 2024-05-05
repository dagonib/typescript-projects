import { useEffect, useState } from 'react'
import { type Author } from '../../types'
import useFetchAuthors from './useFetchAuthors'

const useGetRandomAuthors = (): { randomAuthors: Author[] } => {
  const [randomAuthors, setRandomAuthors] = useState<Author[]>([])
  const authors = useFetchAuthors('name', 'desc', null)

  useEffect(() => {
    if (authors.length > 0) {
      const selectedAuthors: Author[] = []
      while (selectedAuthors.length <= 8) {
        const randomIndex = Math.floor(Math.random() * authors.length)
        if (!selectedAuthors.includes(authors[randomIndex])) {
          selectedAuthors.push(authors[randomIndex])
        }
      }
      setRandomAuthors(selectedAuthors)
    }
  }, [authors])

  return { randomAuthors }
}

export default useGetRandomAuthors
