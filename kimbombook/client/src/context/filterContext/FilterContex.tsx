import { createContext } from 'react'
import type { FilterState } from '../../interfaces/interfaces'
import { ECategory } from '../../enums'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type FilterContextProps = {
  filterState: FilterState
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const FilterContext = createContext<FilterContextProps>({
  filterState: { category: ECategory.All },
  setFilterState: () => {}
} as FilterContextProps)
