import { useEffect, useState } from 'react'
import './booksTable.css'
import {
  type Book,
  type ListOfBooks
} from '../../../../types'
import { getAuthorById } from '../../../../api/author'
import { getCategoryById } from '../../../../api/category'
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { useBookStore } from '../../../../store/booksStore'

interface Sorting {
  column: string
  order: 'asc' | 'desc'
}

interface HeaderCellProps {
  column: string
  sorting: Sorting
  sortTable: any
}

const HeaderCell: React.FC<HeaderCellProps> = ({ column, sorting, sortTable }: { column: string, sorting: Sorting, sortTable: any }): JSX.Element => {
  const isDescSorting = sorting.column === column && sorting.order.includes('desc')
  const isAscSorting = sorting.column === column && sorting.order.includes('asc')
  const futureSortingOrder = isDescSorting ? 'asc' : 'desc'

  return (
    <th key={column} className='books-table-cell' onClick={ () => sortTable({ column, order: futureSortingOrder }) }>
      {column}
      { isDescSorting && <span><BiSolidDownArrow /></span> }
      { isAscSorting && <span><BiSolidUpArrow /></span> }
    </th>
  )
}

const Header = ({ columns, sorting, sortTable }: { columns: string[], sorting: Sorting, sortTable: any }): JSX.Element => {
  return (
    <thead>
      <tr>
        {columns.map((column: string) => (
          <HeaderCell key={column} column={column} sorting={sorting} sortTable={sortTable} />
        ))}
      </tr>
    </thead>
  )
}

const Content = ({ entries, columns }: { entries: ListOfBooks, columns: string[] }): JSX.Element => {
  const [authors, setAuthors] = useState<Record<string, string>>({})
  const [categories, setCategories] = useState<Record<string, string>>({})

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
            authorNames[entry.author] = 'Unknown'
          }
        })
      )
      setAuthors(authorNames)
    }

    void fetchAuthors() // Added 'await' keyword here
  }, [entries])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const fetchCategories = async () => {
      const categoryNames: Record<string, string> = {}
      await Promise.all(
        entries.map(async (entry: Book) => {
          try {
            const categoriesListIds = entry.categories
            if (Array.isArray(entry.categories)) {
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
                    : column === 'categories'
                      ? entry.categories?.map((category: string) => (
                        <p key={category}>{ categories[category] }</p>
                      ))
                      : column === 'imageLink'
                        ? <img src={entry.imageLink} alt={entry.title} />
                        : entry[column as keyof Book]
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const SearchBar = ({ searchTable }: { searchTable: any }): JSX.Element => {
  const [searchValue, setSearchValue] = useState('')

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    searchTable(searchValue)
  }

  return (
    <div className='search-bar'>
      <form onSubmit={submitForm}>
        <input
          type='text'
          placeholder='Search...'
          value={searchValue}
          onChange={ (e) => { setSearchValue(e.target.value) } } />
      </form>
    </div>
  )
}

const BooksTable: React.FC = () => {
  const [sorting, setSorting] = useState({ column: 'title', order: 'asc' })
  const columns = ['imageLink', 'title', 'author', 'available', 'categories']
  const [searchValue, setSearchValue] = useState('')

  const fetchBooksStore = useBookStore(state => state.fetchBooksStore)
  const books = useBookStore(state => state.books)

  useEffect(() => {
    async function fetchBooksFromStore (): Promise<void> {
      try {
        await fetchBooksStore(sorting.column, sorting.order, searchValue)
      } catch (error) {
        console.error('Error fetching books from store: ', error)
      }
    }
    fetchBooksFromStore().catch(error => { console.error('Error fetching books: ', error) })
  }, [sorting, searchValue, fetchBooksStore])

  const sortTable = (newSorting: Sorting): void => {
    setSorting(newSorting)
  }

  const searchTable = (newSearchValue: string): void => {
    setSearchValue(newSearchValue)
  }

  return (
    <div>
      <SearchBar searchTable={searchTable}/>
      <table className='books-table'>
        <Header columns={columns} sorting={sorting as Sorting} sortTable={sortTable} />
        <Content entries={books} columns={columns} />
      </table>
    </div>
  )
}

export default BooksTable
