import { type FilterValue } from '../../types'
import { Filters } from '../Filters/Filters'
import './header.css'

interface Props {
  filterSelected: FilterValue
  handleFilterChange: (filter: FilterValue) => void
}

export const Header: React.FC<Props> = ({
  filterSelected,
  handleFilterChange
}) => {
  return (
    <header className='header'>
      <Filters
        filterSelected={filterSelected}
        onFilterChange={handleFilterChange}
      />
    </header>
  )
}
