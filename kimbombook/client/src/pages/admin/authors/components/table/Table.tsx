import { type Category, type ListOfCategories } from '../../../../../types'
import './table.css'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type TableProps = {
  columns: string[]
  entries: ListOfCategories
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type HeaderCellProps = {
  column: string
}

const HeaderCell: React.FC<HeaderCellProps> = ({ column }): JSX.Element => {
  return (
    <th key={column} className='table-header-cell'>
      <span>{column}</span>
    </th>
  )
}

const Header = ({ columns }: { columns: string[] }): JSX.Element => {
  return (
    <thead>
      <tr>
        {columns.map((column: string) => (
          <HeaderCell key={column} column={column} />
        ))}
      </tr>
    </thead>
  )
}

const Content = ({ entries, columns }: { entries: ListOfCategories, columns: string[] }): JSX.Element => {
  return (
    <tbody>
      {entries.map((entry: Category) => (
        <tr key={entry._id}>
          {columns.map((column: string) => (
            <td key={column}>{entry[column as keyof Category]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}

const Table: React.FC<TableProps> = ({ columns, entries }) => {
  return (
    <div className='table'>
      <table className='table'>
        <Header
          columns={columns}
        />
        <Content
          entries={entries}
          columns={columns}
        />
      </table>
    </div>
  )
}

export default Table
