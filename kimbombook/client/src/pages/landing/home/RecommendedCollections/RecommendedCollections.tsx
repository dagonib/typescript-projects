import './recommendedCollections.css'

import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'
import { ECategory } from '../../../../enums'
import { useContext, useEffect } from 'react'
import { FilterContext } from '../../../../context/filterContext/FilterContex'
import useFilters from '../../../../hooks/useFilters'
import useFetchBooksFromStore from '../../../../hooks/useFetchBooksFromStore'
import { type ListOfBooks } from '../../../../types'
import { Link } from 'react-router-dom'
import { BsArrowReturnRight } from 'react-icons/bs'

const RecommendedCollections: React.FC = () => {
  const books: ListOfBooks = useFetchBooksFromStore()
  const { filterState, setFilterState } = useContext(FilterContext)
  const { setFilters, filterBooks } = useFilters()

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleFilterChange = (category: ECategory) => {
    const selectedCategory = category as ECategory
    setFilterState({ ...filterState, category: selectedCategory })
  }

  useEffect(() => {
    setFilters(filterState)
  }, [filterState, setFilters])

  useEffect(() => {
    setFilters({ ...filterState, category: ECategory.Historica })
  }, [])

  const filteredBooks = filterBooks(books)

  return (
    <section className='recommended-collections'>
      <div className='container recommended-collections__container'>
        <TitleTypeOne titleTop={'Some quality items'} title={'Colecciones Recomendadas'} className={'recommended-collections__title'} />

        {/* Filter Tabs Buttons */}
        <div className="recommended-collections__filter-buttons">
          <button
            className={filterState.category === ECategory.Historica ? 'active' : ''}
            onClick={ () => { handleFilterChange(ECategory.Historica) } }
          >
            Novela Histórica
          </button>
          <button
            className={filterState.category === ECategory.Tremendismo ? 'active' : ''}
            onClick={ () => { handleFilterChange(ECategory.Tremendismo) } }
          >
            Tremendismo y Existencialismo
          </button>
          <button
            className={filterState.category === ECategory.Sesenta ? 'active' : ''}
            onClick={ () => { handleFilterChange(ECategory.Sesenta) } }
          >
            Novela Años Sesenta
          </button>
          <button
            className={filterState.category === ECategory.GeneraciónX ? 'active' : ''}
            onClick={ () => { handleFilterChange(ECategory.GeneraciónX) } }
          >
            Generación X
          </button>
        </div>

        {/* Filter Books Content */}
        <div className="recommended-collections__gallery">
          {
            filteredBooks.map(({ title, author, imageLink }, _id) => {
              return (
                <div className="recommended-collections__gallery-item" key={_id}>
                  <div className="recommended-collections__gallery-item__image">
                    <img src={imageLink} alt="" />
                  </div>
                  <div className="recommended-collections__gallery-item__info">
                    <h4>{title}</h4>
                    <div><small>{author}</small></div>
                  </div>
                </div>
              )
            })
          }
        </div>

      <Link to='/libraria' className='btn btn-border feature-btn'>
        Ver catálogo <BsArrowReturnRight />
      </Link>
      </div>
    </section>
  )
}
export default RecommendedCollections
