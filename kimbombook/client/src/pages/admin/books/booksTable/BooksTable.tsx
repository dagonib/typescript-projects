import { useEffect, useState } from 'react'
import './booksTable.css'
import { type Book, type ListOfBooks } from '../../../../types'
import { getAuthorById } from '../../../../api/author'
// import { getAuthorById } from '../../../../api/author'

interface Props {
  data: ListOfBooks
}

const Header = ({ columns }: { columns: string[] }): JSX.Element => {
  return (
    <thead>
      <tr>
        {columns.map((column: string) => (
          <th key={column} className='books-table-cell'>{column}</th>
        ))}
      </tr>
    </thead>
  )
}
// column === 'available' ? ((entry[column as keyof Book] === false) ? 'Yes' : 'No') : entry[column as keyof Book]
const Content = ({ entries, columns }: { entries: ListOfBooks, columns: string[] }): JSX.Element => {
  const [authors, setAuthors] = useState<Record<string, string>>({})

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchAuthors = async () => {
      const authorNames: Record<string, string> = {}
      await Promise.all(
        entries.map(async (entry: Book) => {
          try {
            const author = await getAuthorById(entry.author)
            authorNames[entry.author] = author.name
          } catch (error) {
            console.error('Error getting author by id:', error)
            authorNames[entry.author] = 'Unknown'
          }
        })
      )
      setAuthors(authorNames)
    }

    void fetchAuthors() // Added 'await' keyword here
  }, [entries])

  return (
    <tbody>
      {entries.map((entry: Book) => (
        <tr key={entry._id}>
          {columns.map((column: string) => (
            <td key={column} className='books-table-cell'>
              {
                column === 'available'
                  ? ((entry[column as keyof Book] === false) ? 'Yes' : 'No')
                  : column === 'author'
                    ? authors[entry.author]
                    : entry[column as keyof Book]
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const BooksTable: React.FC<Props> = ({ data }) => {
  const [books, setBooks] = useState<ListOfBooks>([])
  const columns = ['title', 'author', 'available']

  useEffect(() => {
    setBooks([...data])
  }, [data])

  return (
    <div>
      <p>SEARCH BARCH</p>
      <table className='books-table'>
        <Header columns={columns}/>
        <Content entries={books} columns={columns} />
      </table>
    </div>
  )
}

export default BooksTable
