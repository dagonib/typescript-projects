import './DataTable.css'
// import { Link } from 'react-router-dom'
// import { FaEdit } from 'react-icons/fa'
// import { MdDelete } from 'react-icons/md'
import { type ListOfBooks } from '../../../../types'
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import DebouncedInput from '../debouncedInput/DebouncedInput'
import { FaSearch } from 'react-icons/fa'

interface Props {
  _id: any
  title: string
  author: string
  data: ListOfBooks
}

const DataTable: React.FC<Props> = ({ data }) => {
  const columnHelper = createColumnHelper()
  console.log(data)
  const columns = [
    columnHelper.accessor('', {
      id: 'Id',
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: 'ID',
      size: 10
    }),
    columnHelper.accessor('imageLink', {
      cell: (info) => <img src={info.getValue()} alt='book' />,
      header: 'Image',
      size: 10
    }),
    columnHelper.accessor('title', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Title',
      size: 40
    }),
    columnHelper.accessor('author', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Author',
      size: 40
    }),
    columnHelper.accessor('category', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Category',
      size: 40
    }),
    columnHelper.accessor('available', {
      cell: (info) => <span>{info.getValue()}</span>,
      header: 'Available',
      size: 40
    })

  ]

  const [books, setBooks] = useState<ListOfBooks>([])
  useEffect(() => {
    setBooks([...data])
  }, [data])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    defaultColumn: {
      size: 10,
      minSize: 10,
      maxSize: 400
    },
    data: books,
    columns,
    state: {
      globalFilter
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <div className='data-table'>
      <div className='data-table__download-btn'>
        <FaSearch />
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={(value) => { setGlobalFilter(value) }}
          className='data-table__debounced-input'
          placeholder='Search all columns...'
        />
      </div>

      <table className='data-table__table'>
        <thead>
          {
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {
                  headerGroup.headers.map((header) => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))
                }
              </tr>
            ))
          }
       </thead>

       <tbody>
        { table.getRowModel().rows.length !== 0
          ? (table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={`${i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
                {
                  row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  )
                  )}
              </tr>
            ))
            )
          : (
              <tr>
                <td>
                  No data
                </td>
              </tr>
            )
        }
       </tbody>
      </table>

      {/* pagination */}
      <div className='data-table__pagination'>
        <button
          onClick={() => {
            table.previousPage()
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          onClick={() => {
            table.nextPage()
          }}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>

        <span>
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of {' '} {table.getPageCount()}
          </strong>
        </span>

        <span>
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = (e.target.value.length > 0) ? Number(e.target.value) - 1 : 0
              table.setPageIndex(page)
            }}
          />
        </span>

        <select
          name=""
          id=""
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default DataTable
