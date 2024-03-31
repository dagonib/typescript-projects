import { useState } from 'react'
import './booksTable.css'
import {
  type Book,
  type ListOfBooks
} from '../../../../../types'
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi'
import { FaSearch } from 'react-icons/fa'
import { MdEditSquare, MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Tooltip from '../../../components/tooltip/Tooltip'
import { deleteBook } from '../../../../../api/book'
import useFetchBooks from '../../../../../hooks/books/useFetchBooks'
import useGetAuthorsNames from '../../../../../hooks/author/useGetAuthorsNames'
import useGetCategoriesNames from '../../../../../hooks/categories/useGetCategoriesNames'

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
    <th
      key={column}
      className='books-table-header-cell'
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
          <HeaderCell key={column} column={column} sorting={sorting} sortTable={sortTable} />
        ))}
      </tr>
    </thead>
  )
}

const Content = ({ entries, columns }: { entries: ListOfBooks, columns: string[] }): JSX.Element => {
  const [showFullText, setShowFullText] = useState(false)
  const [popoverText, setPopoverText] = useState('')
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  const authorsName = useGetAuthorsNames(entries)
  const categoriesName = useGetCategoriesNames(entries)

  // Mostrar descripción completa en tooltip
  const handleMouseEnter = (text: string, event: React.MouseEvent<HTMLElement>): void => {
    setShowFullText(true)
    setPopoverText(text)
    // Calcular la posición relativa del texto dentro de la ventana
    const rect = (event.target as HTMLElement)?.getBoundingClientRect()
    setTooltipPosition({ x: rect?.right + 10, y: rect?.top })
  }

  const handleMouseLeave = (): void => {
    setShowFullText(false)
  }

  const handleDeleteBook = async (bookId: string): Promise<void> => {
    try {
      const confirmed = window.confirm('Are you sure?')
      if (confirmed) {
        await deleteBook(bookId)
      } else {
        console.log('Delete cancelled by user')
      }
    } catch (error) {
      console.log('Error deleting book: ', error)
    }
  }

  return (
    <tbody>
      {entries.map((entry: Book) => (
        <tr key={entry._id}>
          {columns.map((column: string) => (
            <td key={column} className='books-table-body-cell'>
              {
                column === 'available'
                  ? ((entry[column as keyof Book] === false) ? 'Yes' : 'No')
                  : column === 'author'
                    ? authorsName[entry.author]
                    : column === 'categories'
                      ? entry.categories?.map((category: string) => (
                        <li key={category}>{ categoriesName[category] }</li>
                      ))
                      : column === 'imageLink'
                        ? <img src={entry.imageLink} alt={entry.title} />
                        : column === 'actions'
                          ? <>
                              <Link to={`/admin/edit-book/${entry._id}`}><MdEditSquare /></Link>
                              <a href='#' onClick={ () => { void handleDeleteBook(entry._id) }}><MdDelete /></a>
                            </>
                          : column === 'link'
                            ? <a href={entry.link}>Link</a>
                            : column === 'description'
                              ? <div className='books-table-body-cell__description'>
                                  <span
                                      className='books-table-body-cell__description__short'
                                      onMouseEnter={ (e: React.MouseEvent<HTMLElement>) => { handleMouseEnter(entry.description, e) }}
                                      onMouseLeave={handleMouseLeave}
                                    >
                                      {entry.description}
                                    </span>
                                </div>
                              : entry[column as keyof Book]
              }
            </td>
          ))}
        </tr>
      ))}
      {showFullText && <Tooltip text={popoverText} position={tooltipPosition}/>}
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
          onChange={ (e) => { setSearchValue(e.target.value) } }
        />
        <button type='submit'><FaSearch /></button>
      </form>
    </div>
  )
}

const BooksTable: React.FC = () => {
  const [sorting, setSorting] = useState({ column: 'title', order: 'asc' })
  const columns = ['imageLink', 'title', 'author', 'description', 'available', 'categories', 'link', 'actions']
  const [searchValue, setSearchValue] = useState('')

  const books = useFetchBooks(sorting.column, sorting.order, searchValue)
  console.log('Books:', books)

  const sortTable = (newSorting: Sorting): void => {
    setSorting(newSorting)
  }

  const searchTable = (newSearchValue: string): void => {
    setSearchValue(newSearchValue)
  }

  return (
    <div>
      <div className='books-actions'>
        <SearchBar searchTable={searchTable}/>
        <Link className='btn' to='/admin/create-book'>Add new book</Link>
      </div>

      <table className='books-table'>
        <Header
          columns={columns}
          sorting={sorting as Sorting}
          sortTable={sortTable}
        />
        <Content
          entries={books}
          columns={columns}
        />
      </table>
      <div>Pagination</div>
    </div>
  )
}

export default BooksTable
