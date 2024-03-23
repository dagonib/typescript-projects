import './categoriesButtons.css'

import { useContext, useId } from 'react'
import { ECategory } from '../../../../enums'
import { FilterContext } from '../../../../context/filterContext/FilterContex'

const CategoriesButtons: React.FC = () => {
  const categoryFilterId = useId()
  const { filterState, setFilterState } = useContext(FilterContext)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleSelectCategory = (selectedCategory: ECategory) => {
    setFilterState({ ...filterState, category: selectedCategory })
  }

  return (
    <section className='categories-buttons'>
        <div className='categories-buttons__content-right'>
            {/* Category */}
            <div className='categories-buttons__form-input'>
              <label htmlFor={categoryFilterId}>Categoría</label>
                {Object.keys(ECategory).map((key) => (
                  <button
                  key={key}
                  onClick={() => { handleSelectCategory(ECategory[key as keyof typeof ECategory]) }}
                  className={filterState.category === ECategory[key as keyof typeof ECategory] ? 'btn btn-border selected' : 'btn btn-border'}
                >
                  {ECategory[key as keyof typeof ECategory]}
                </button>
                ))}
            </div>
        </div>
    </section>
  )
}

export default CategoriesButtons
