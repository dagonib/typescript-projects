import type { ECategory } from '../enums'

export interface FilterState {
  category: ECategory
}

export interface FilterContextProps {
  filterState: FilterState
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
}
