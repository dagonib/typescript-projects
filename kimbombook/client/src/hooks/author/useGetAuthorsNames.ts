import { useEffect, useState } from 'react'
import { getAuthorById } from '../../api/author'
import { type Book, type ListOfBooks } from '../../types'

const useGetAuthorsNames = (books: ListOfBooks): Record<string, string> => {
  const [authorsName, setAuthorsName] = useState<Record<string, string>>({})

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchtAuhtorsName = async () => {
      const authorsName: Record<string, string> = {}
      await Promise.all(
        books.map(async (book: Book) => {
          try {
            const author = await getAuthorById(book.author)
            authorsName[book.author] = author.name
          } catch (error) {
            authorsName[book.author] = 'Unknown'
          }
        })
      )
      setAuthorsName(authorsName)
    }

    void fetchtAuhtorsName()
  }, [books])

  return authorsName
}

export default useGetAuthorsNames
