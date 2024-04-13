import './recommendedCollections.css'
import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'
import { Link } from 'react-router-dom'
import { BsArrowReturnRight } from 'react-icons/bs'
import useBookFilterByCategory from '../../../../hooks/books/useBookFilterByCategory'
import useGetAuthorsNames from '../../../../hooks/author/useGetAuthorsNames'

const RecommendedCollections: React.FC = () => {
  const { filteredBooks, idCategory, setIdCategory } = useBookFilterByCategory('6606d5ae23ffd43602854313')
  const authorsName = useGetAuthorsNames(filteredBooks)

  return (
    <section className='recommended-collections'>
      <div className='container recommended-collections__container'>
        <TitleTypeOne titleTop={'Some quality items'} title={'Colecciones Recomendadas'} className={'recommended-collections__title'} />

        {/* Filter Tabs Buttons */}
        <div className="recommended-collections__filter-buttons">
          <button
            className={idCategory === '6606d5ae23ffd43602854313' ? 'active' : ''}
            onClick={ () => { setIdCategory('6606d5ae23ffd43602854313') } }
          >
            Generación Perdida
          </button>
          <button
            className={idCategory === '65f579d99582d8f00c629b16' ? 'active' : ''}
            onClick={ () => { setIdCategory('65f579d99582d8f00c629b16') } }
          >
            Tremendismo y Existencialismo
          </button>
        </div>

        {/* Filter Books Content */}
        <div className="recommended-collections__gallery">
          {
            filteredBooks.slice(0, 4).map(({ title, author, imageLink }, _id) => {
              return (
                <div className="recommended-collections__gallery-item" key={_id}>
                  <div className="recommended-collections__gallery-item__image">
                    <img src={imageLink} alt="" />
                  </div>
                  <div className="recommended-collections__gallery-item__info">
                    <h4>{title}</h4>
                    <div><small>{authorsName[author]}</small></div>
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
