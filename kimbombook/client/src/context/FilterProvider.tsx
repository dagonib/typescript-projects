import { useState } from 'react'
import { ECategory } from '../enums'
import type { FilterState } from '../interfaces/interfaces'
import { FilterContext } from './FilterContex'

interface FilterProviderProps {
  children: JSX.Element | JSX.Element[]
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [filterState, setFilterState] = useState<FilterState>({ category: ECategory.All })

  return (
    <FilterContext.Provider value={{
      filterState,
      setFilterState
    }}>
      { children }
    </FilterContext.Provider>
  )
}
