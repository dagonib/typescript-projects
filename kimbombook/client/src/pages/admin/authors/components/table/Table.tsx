import { useEffect, useState } from 'react'
import { type Author, type ListOfAuthors } from '../../../../../types'
import styles from './table.module.css'
import { useAuthorStore } from '../../../../../store/author.store'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdDelete, MdEditSquare } from 'react-icons/md'
import { deleteAuthor } from '../../../../../api/author'

interface Sorting {
  column: string
  order: 'asc' | 'desc'
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type HeaderCellProps = {
  column: string
  sorting: Sorting
  sortTable: any
}

const HeaderCell: React.FC<HeaderCellProps> = ({ column, sorting, sortTable }: { column: string, sorting: Sorting, sortTable: any }): JSX.Element => {
  const isDescSorting = sorting.column === column && sorting.order.includes('desc')
  const isAscSorting = sorting.column === column && sorting.order.includes('asc')
  const futureSortingOrder = isDescSorting ? 'asc' : 'desc'

  return (
    <th
      key={column}
      className={styles.headerCell}
      onClick={ () => sortTable({ column, order: futureSortingOrder })}
    >
      <span>{column === 'imgLink' ? 'image' : column }</span>
      { isDescSorting && <BiSolidDownArrow /> }
      { isAscSorting && <BiSolidUpArrow /> }
    </th>
  )
}

const Header = ({ columns, sorting, sortTable }: { columns: string[], sorting: Sorting, sortTable: any }): JSX.Element => {
  return (
    <thead>
      <tr>
        {columns.map((column: string) => (
          <HeaderCell
            key={column}
            column={column}
            sorting={sorting}
            sortTable={sortTable}
          />
        ))}
      </tr>
    </thead>
  )
}

const SearchBar = ({ searchTable }: { searchTable: any }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('')

  const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    searchTable(searchValue)
  }

  return (
    <div className={styles.searchBar}>
      <form onSubmit={submitForm}>
        <input
          type='text'
          placeholder='Search...'
          value={searchValue}
          onChange={(event) => { setSearchValue(event.target.value) }}
        />
        <button type='submit'>
          <FaSearch />
        </button>
      </form>
    </div>

  )
}

const Content = ({ entries, columns }: { entries: ListOfAuthors, columns: string[] }): JSX.Element => {
  const handleDelete = async (id: string): Promise<void> => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this author?')
      if (confirmDelete) {
        await deleteAuthor(id)
      }
    } catch (error) {
      console.error('Error deleting author: ', error)
    }
  }

  return (
    <tbody>
      {entries.map((entry: Author) => (
        <tr key={entry._id}>
          {columns.map((column: string) => (
            <td
              key={column} className={styles.bodyCell}>
              {
                column === 'imgLink'
                  ? <img
                      src={entry.imageLink}
                      alt={entry.name} />
                  : column === 'actions'
                    ? <>
                        <Link to={`/admin/edit-author/${entry._id}`}><MdEditSquare /></Link>
                        <a
                          href='#'
                          onClick={ () => { void handleDelete(entry._id) } }
                        >
                          <MdDelete />
                        </a>
                      </>
                    : entry[column as keyof Author]
              }
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const Table: React.FC = () => {
  const columns = ['imgLink', 'name', 'actions']
  const [sorting, setSorting] = useState<Sorting>({ column: 'name', order: 'asc' })
  const [searchValue, setSearchValue] = useState<string>('')
  const fetchAuthorsStore = useAuthorStore(state => state.fetchAuthorsStore)
  const authors = useAuthorStore(state => state.authors)

  useEffect(() => {
    async function fetchAuthorsFromStore (): Promise<void> {
      try {
        await fetchAuthorsStore(sorting.column, sorting.order, searchValue)
      } catch (error) {
        console.error('Error fetching authors from store: ', error)
      }
    }
    fetchAuthorsFromStore().catch(error => { console.error('Error fetching authors: ', error) })
  }, [fetchAuthorsStore, authors])

  const sortTable = (newSorting: Sorting): void => {
    setSorting(newSorting)
  }

  const searchTable = (newSearchValue: string): void => {
    setSearchValue(newSearchValue)
  }

  return (
    <div>
      <div className={styles.actions}>
        <SearchBar searchTable={searchTable} />
        <Link to='/admin/create-author' className='btn'>Add New Author</Link>
      </div>
      <table className={styles.table}>
        <Header
          columns={columns}
          sorting={sorting}
          sortTable={sortTable}
        />
        <Content
          entries={authors}
          columns={columns}
        />
      </table>
    </div>
  )
}

export default Table
