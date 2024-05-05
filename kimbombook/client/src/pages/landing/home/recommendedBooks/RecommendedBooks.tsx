import './recommendedBooks.css'

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

// React Arrow Icons
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import useGetRandomBooks from '../../../../hooks/books/useGetRandomBooks'
import MainButton from '../../UI/mainButton/MainButton'
import BuyButton from '../../UI/buyButton/BuyButton'

const RecommendedBooks: React.FC = () => {
  const { randomBooks, authorNames } = useGetRandomBooks()

  return (
    <section>
        <div className="recommended-books__container container">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Pagination]}
            pagination = {{ el: '.swiper-Pagination', clickable: true }}
            navigation = {
              {
                prevEl: '.button-prev-slide',
                nextEl: '.button-next-slide'
              }
            }
          >
            {
              randomBooks.map(({
                title,
                author,
                description,
                imageLink,
                link
              }, _id) => {
                return (
                  <SwiperSlide key={_id}>
                    <div className='recommended-books__wrapper'>
                      {/* Header Left */}
                      <div className="recommended-books__left">
                        <h1>{title}</h1>
                        <h3>{authorNames[author]}</h3>
                        <p dangerouslySetInnerHTML={ { __html: description } }></p>
                        <div>
                          <MainButton link={link}>Comprar</MainButton>
                          <BuyButton />
                        </div>
                      </div>

                      {/* HeaderRight */}
                      <div className="recommended-books__right">
                        <img src={imageLink} alt={title} />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }

            <div className="slider-button">
              <div className="button-prev-slide slidebutton">
                <GoArrowLeft />
              </div>
              <div className="button-next-slide slidebutton">
                <GoArrowRight />
              </div>
            </div>
          </Swiper>
        </div>
    </section>
  )
}

export default RecommendedBooks
