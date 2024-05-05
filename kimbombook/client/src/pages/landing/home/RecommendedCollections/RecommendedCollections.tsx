import './recommendedCollections.css'
import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'
import { BsArrowReturnRight } from 'react-icons/bs'
import useBookFilterByCategory from '../../../../hooks/books/useBookFilterByCategory'
import useGetAuthorsNames from '../../../../hooks/author/useGetAuthorsNames'
import MainButton from '../../UI/mainButton/MainButton'

const RecommendedCollections: React.FC = () => {
  const { filteredBooks, idCategory, setIdCategory } = useBookFilterByCategory('6606d5ae23ffd43602854313')
  const authorsName = useGetAuthorsNames(filteredBooks)

  return (
    <section>
      <div className='container'>
        <TitleTypeOne
          titleTop={'Narrativas enmarcadas en su época'}
          title={'Colecciones Recomendadas'}
          className={'recommended-collections__title'}
        />

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
                    <h5>{authorsName[author]}</h5>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MainButton link='/libraria'>
            Ver catálogo <BsArrowReturnRight />
          </MainButton>
        </div>
      </div>
    </section>
  )
}
export default RecommendedCollections
