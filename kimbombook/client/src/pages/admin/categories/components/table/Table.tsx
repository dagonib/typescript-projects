import { useEffect, useState } from 'react'
import { useCategoryStore } from '../../../../../store/category.store'
import { type Category, type ListOfCategories } from '../../../../../types'
import './table.css'
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'
import { MdEditSquare, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'

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
      className='table-header-cell'
      onClick={ () => sortTable({ column, order: futureSortingOrder })}
    >
      <span>{column}</span>
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
          <HeaderCell key={column} column={column} sorting={sorting} sortTable={sortTable}/>
        ))}
      </tr>
    </thead>
  )
}

const Content = ({ entries, columns }: { entries: ListOfCategories, columns: string[] }): JSX.Element => {
  const deleteCategoryStore = useCategoryStore(state => state.deleteCategoryStore)

  const handleDelete = async (categoryId: string): Promise<void> => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this category?')
      if (confirmDelete) {
        // eslint-disable-next-line @typescript-eslint/await-thenable, @typescript-eslint/no-confusing-void-expression
        await deleteCategoryStore(categoryId)
      } else {
        console.log('Delete cancelled')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  return (
    <tbody>
      {entries.map((entry: Category) => (
        <tr key={entry._id}>
          {columns.map((column: string) => (
            <td key={column} className='table-body-cell'>
              {
                column === 'actions'
                  ? <>
                      <Link to={`/admin/edit-category/${entry._id}`}><MdEditSquare /></Link>
                      <a href='#' onClick={ () => { void handleDelete(entry._id) } }><MdDelete /></a>
                    </>
                  : entry[column as keyof Category]
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

  const submitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    searchTable(searchValue)
  }

  return (
    <div className='search-bar'>
      <form onSubmit={submitForm}>
        <input
          type='text'
          placeholder='Search...'
          value={searchValue}
          onChange={ (event) => { setSearchValue(event.target.value) } }
        />
        <button type='submit'><FaSearch /></button>
      </form>
    </div>
  )
}

const Table: React.FC = () => {
  const [sorting, setSorting] = useState({ column: 'name', order: 'asc' })
  const [searchValue, setSearchValue] = useState('')
  const columns = ['name', 'description', 'actions']

  const fetchCategoriesStore = useCategoryStore(state => state.fetchCategoriesStore)
  const categories = useCategoryStore(state => state.categories)

  useEffect(() => {
    async function fetchCategoriesFromStore (): Promise<void> {
      try {
        await fetchCategoriesStore(sorting.column, sorting.order, searchValue)
      } catch (error) {
        console.error('Error fetching categories from store: ', error)
      }
    }
    fetchCategoriesFromStore().catch(error => { console.error('Error fetching categories: ', error) })
  }, [sorting, fetchCategoriesStore, categories, searchValue])

  const sortTable = (newSorting: Sorting): void => {
    setSorting(newSorting)
  }

  const searchTable = (newSearchValue: string): void => {
    setSearchValue(newSearchValue)
  }

  return (
    <div>
      <div className='actions'>
        <SearchBar searchTable={searchTable} />
        <Link to='/admin/create-category' className='btn'>Add new Category</Link>
      </div>
      <table className='table'>
        <Header
          columns={columns}
          sorting={sorting as Sorting}
          sortTable={sortTable}
        />
        <Content
          entries={categories}
          columns={columns}
        />
      </table>
      <div>Pagination</div>
    </div>
  )
}

export default Table
