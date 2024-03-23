import { useContext, useId } from 'react'
import { ECategory } from '../../../../enums'
import './filters.css'
import { FilterContext } from '../../../../context/filterContext/FilterContex'

const Filters: React.FC = () => {
  const categoryFilterId = useId()
  const { filterState, setFilterState } = useContext(FilterContext)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value as ECategory
    setFilterState({ ...filterState, category: selectedCategory })
  }

  return (
    <section className='filters'>
        <div className='form__content--right'>
            {/* Category */}
            <div className='form__input'>
              <label htmlFor={categoryFilterId}>Categoría</label>
              <select
                id={categoryFilterId}
                onChange={handleChangeCategory}
              >
                <option value="">Selecciona un categoría</option>
                {Object.keys(ECategory).map((key) => (
                  <option key={key} value={ECategory[key as keyof typeof ECategory]}>
                    {ECategory[key as keyof typeof ECategory]}
                  </option>
                ))}
              </select>
            </div>
        </div>
    </section>
  )
}

export default Filters
